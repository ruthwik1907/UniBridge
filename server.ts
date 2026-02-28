import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("unibridge.db");
const JWT_SECRET = process.env.JWT_SECRET || "unibridge_secret_key_2024";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    avatar TEXT,
    university TEXT,
    major TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    senderId TEXT,
    receiverId TEXT,
    text TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    userId1 TEXT,
    userId2 TEXT,
    UNIQUE(userId1, userId2)
  );

  CREATE TABLE IF NOT EXISTS saved_universities (
    userId TEXT,
    universityId TEXT,
    PRIMARY KEY(userId, universityId)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/signup", async (req, res) => {
    const { email, password, name, university, major } = req.body;
    const id = Math.random().toString(36).substring(7);
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = `https://picsum.photos/seed/${id}/200/200`;

    try {
      db.prepare("INSERT INTO users (id, email, password, name, avatar, university, major) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(id, email, hashedPassword, name, avatar, university, major);
      
      const token = jwt.sign({ id, email }, JWT_SECRET);
      res.json({ token, user: { id, email, name, avatar, university, major } });
    } catch (error) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    const { email, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  });

  // Messaging Routes
  app.get("/api/messages/:otherUserId", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    
    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const myId = decoded.id;
    const { otherUserId } = req.params;

    const messages = db.prepare(`
      SELECT * FROM messages 
      WHERE (senderId = ? AND receiverId = ?) 
      OR (senderId = ? AND receiverId = ?)
      ORDER BY timestamp ASC
    `).all(myId, otherUserId, otherUserId, myId);

    res.json(messages);
  });

  app.post("/api/messages", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const myId = decoded.id;
    const { receiverId, text } = req.body;
    const id = Math.random().toString(36).substring(7);

    db.prepare("INSERT INTO messages (id, senderId, receiverId, text) VALUES (?, ?, ?, ?)")
      .run(id, myId, receiverId, text);

    res.json({ id, senderId: myId, receiverId, text, timestamp: new Date().toISOString() });
  });

  // Saved Universities Routes
  app.get("/api/saved-universities", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const myId = decoded.id;

    const saved = db.prepare("SELECT universityId FROM saved_universities WHERE userId = ?").all(myId);
    res.json(saved.map((s: any) => s.universityId));
  });

  app.post("/api/saved-universities", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const myId = decoded.id;
    const { universityId } = req.body;

    try {
      db.prepare("INSERT INTO saved_universities (userId, universityId) VALUES (?, ?)").run(myId, universityId);
      res.json({ status: "saved" });
    } catch (error) {
      res.status(400).json({ error: "Already saved" });
    }
  });

  app.delete("/api/saved-universities/:universityId", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const myId = decoded.id;
    const { universityId } = req.params;

    db.prepare("DELETE FROM saved_universities WHERE userId = ? AND universityId = ?").run(myId, universityId);
    res.json({ status: "unsaved" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
