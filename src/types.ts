import { LucideIcon } from 'lucide-react';

export interface Connection {
  id: string;
  name: string;
  avatar: string;
  university: string;
  major: string;
  rating: number;
  reviews: number;
  price: number;
  tags: string[];
  location?: string;
  lastMessage?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  courses: string;
  mentors: string;
  tags: string[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  universities: string;
  mentors?: string;
  tuition?: string;
  flag: string;
  description?: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    university: string;
    isVerified: boolean;
  };
  time: string;
  category: string;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
}
