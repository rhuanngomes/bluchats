export interface User {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  status?: 'online' | 'offline' | 'busy';
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'link' | 'meeting';
  replyTo?: Message;
  reactions?: string[];
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unread: number;
  pinned: boolean;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  type: 'individual' | 'group' | 'internal';
  isFavorite?: boolean;
  archived?: boolean;
  status: 'inbox' | 'active' | 'archived';
  channel?: 'whatsapp' | 'instagram' | 'messenger';
}

export interface ConversationGroup {
  id: string;
  name: string;
  count: number;
  conversations: Conversation[];
}