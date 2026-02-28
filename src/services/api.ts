const API_URL = '/api';

export const api = {
  async signup(data: any) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async signin(data: any) {
    const res = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getMessages(otherUserId: string, token: string) {
    const res = await fetch(`${API_URL}/messages/${otherUserId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async sendMessage(receiverId: string, text: string, token: string) {
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ receiverId, text }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getSavedUniversities(token: string) {
    const res = await fetch(`${API_URL}/saved-universities`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async saveUniversity(universityId: string, token: string) {
    const res = await fetch(`${API_URL}/saved-universities`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ universityId }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async unsaveUniversity(universityId: string, token: string) {
    const res = await fetch(`${API_URL}/saved-universities/${universityId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};
