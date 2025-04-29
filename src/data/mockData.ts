import { User, Conversation, Message, Tag, ConversationGroup } from '../types';
import { subDays, subHours, subMinutes } from '../utils/dateUtils';

export const tags: Tag[] = [
  { id: '1', name: 'W22', color: '#25D366' },
  { id: '2', name: 'COM', color: '#34B7F1' },
  { id: '3', name: 'CAL', color: '#FF69B4' },
  { id: '4', name: 'CRO', color: '#FF9500' },
];

export const currentUser: User = {
  id: 'current-user',
  name: 'Me',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  isOnline: true,
};

export const users: User[] = [
  {
    id: '1',
    name: 'Pricila Gugik',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '+55 4699123231',
    isOnline: true,
    status: 'online',
  },
  {
    id: '2',
    name: 'Rhuann Gomes',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isOnline: false,
    status: 'offline',
    lastSeen: subHours(new Date(), 3),
  },
  {
    id: '3',
    name: 'Kauê',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isOnline: true,
    status: 'busy',
  },
  {
    id: '4',
    name: 'Leonardo Rosa',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isOnline: false,
    lastSeen: subDays(new Date(), 1),
  },
  {
    id: '5',
    name: 'Romulo Despacito',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isOnline: false,
    lastSeen: subHours(new Date(), 5),
  },
  {
    id: '6',
    name: 'Thamii',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isOnline: true,
  },
  {
    id: '7',
    name: 'Duda Telles',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '+55 112345678',
    isOnline: false,
  },
];

// First, declare mockConversations without the messages
export const mockConversations: Conversation[] = [
  {
    id: '2',
    participants: [users[1]],
    unread: 0,
    pinned: false,
    tags: [tags[0]],
    createdAt: subDays(new Date(), 11),
    updatedAt: subDays(new Date(), 11),
    type: 'individual',
    isFavorite: true,
    messages: [],
    status: 'inbox',
    channel: 'instagram',
    lastMessage: {
      id: 'last-2',
      senderId: users[1].id,
      content: 'Rhuann Gomes: teste',
      timestamp: subDays(new Date(), 11),
      status: 'read',
      type: 'text',
    },
  },
  {
    id: '1',
    participants: [users[0]],
    unread: 3,
    pinned: false,
    tags: [tags[2]],
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'individual',
    isFavorite: true,
    messages: [],
    status: 'inbox',
    channel: 'whatsapp',
    lastMessage: {
      id: 'last-1',
      senderId: users[0].id,
      content: 'Tabelionato de Notas e Protesto de Amambai',
      timestamp: subMinutes(new Date(), 15),
      status: 'read',
      type: 'text',
    },
  },
  {
    id: '4',
    participants: [users[4]],
    unread: 0,
    pinned: false,
    tags: [tags[2]],
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
    type: 'internal',
    messages: [],
    status: 'inbox',
    lastMessage: {
      id: 'last-4',
      senderId: users[4].id,
      content: 'emanuellemo: maluco',
      timestamp: subDays(new Date(), 1),
      status: 'read',
      type: 'text',
    },
  },
  {
    id: '5',
    participants: [users[5]],
    unread: 0,
    pinned: false,
    tags: [tags[2]],
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
    type: 'internal',
    messages: [],
    status: 'inbox',
    lastMessage: {
      id: 'last-5',
      senderId: users[5].id,
      content: 'emanuellemo: boia',
      timestamp: subDays(new Date(), 1),
      status: 'read',
      type: 'text',
    },
  },
  {
    id: '6',
    participants: [users[6]],
    unread: 0,
    pinned: false,
    tags: [tags[2]],
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
    type: 'individual',
    messages: [],
    status: 'inbox',
    lastMessage: {
      id: 'last-6',
      senderId: users[6].id,
      content: 'kaue: sim',
      timestamp: subDays(new Date(), 1),
      status: 'read',
      type: 'text',
    },
  },
  {
    id: '3',
    participants: [users[3]],
    unread: 0,
    pinned: false,
    tags: [tags[2]],
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
    type: 'individual',
    messages: [],
    status: 'inbox',
    lastMessage: {
      id: 'last-3',
      senderId: users[3].id,
      content: 'kaue: [](https://web.pinkapp.com)',
      timestamp: subDays(new Date(), 1),
      status: 'read',
      type: 'text',
    },
  },
  {
    id: '7',
    participants: [users[2]],
    unread: 2,
    pinned: false,
    tags: [tags[1]],
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'group',
    isFavorite: false,
    messages: [],
    status: 'active',
    channel: 'whatsapp',
    lastMessage: {
      id: 'last-7',
      senderId: users[2].id,
      content: 'Nova mensagem do grupo',
      timestamp: new Date(),
      status: 'delivered',
      type: 'text',
    },
  },
  {
    id: '8',
    participants: [users[3]],
    unread: 5,
    pinned: true,
    tags: [tags[3]],
    createdAt: subHours(new Date(), 12),
    updatedAt: subHours(new Date(), 12),
    type: 'individual',
    isFavorite: true,
    messages: [],
    status: 'active',
    channel: 'messenger',
    lastMessage: {
      id: 'last-8',
      senderId: users[3].id,
      content: 'Mensagem importante',
      timestamp: subHours(new Date(), 12),
      status: 'read',
      type: 'text',
    },
  },
];

// Then create the messages function that can safely reference mockConversations
const createMockMessages = (conversationId: string, count = 5): Message[] => {
  const messages: Message[] = [];
  const participants = mockConversations.find(c => c.id === conversationId)?.participants || [];
  
  for (let i = 0; i < count; i++) {
    const isCurrentUser = i % 2 === 0;
    const senderId = isCurrentUser ? currentUser.id : participants[0]?.id || '';
    
    messages.push({
      id: `msg-${conversationId}-${i}`,
      senderId,
      content: `This is message #${i + 1} in conversation ${conversationId}`,
      timestamp: subMinutes(new Date(), (count - i) * 5),
      status: isCurrentUser ? 'read' : 'delivered',
      type: 'text',
    });
  }
  
  return messages;
};

// Now populate the messages for each conversation
mockConversations.forEach(conversation => {
  conversation.messages = createMockMessages(conversation.id, 10);
});

export const conversationGroups: ConversationGroup[] = [
  {
    id: 'inbox',
    name: 'Caixa de entrada',
    count: mockConversations.filter(c => !c.archived).length,
    conversations: mockConversations.filter(c => !c.archived),
  },
  {
    id: 'unread',
    name: 'Não lidas',
    count: mockConversations.filter(c => c.unread > 0).length,
    conversations: mockConversations.filter(c => c.unread > 0),
  },
  {
    id: 'favorites',
    name: 'Favoritas',
    count: mockConversations.filter(c => c.isFavorite).length,
    conversations: mockConversations.filter(c => c.isFavorite),
  },
  {
    id: 'all',
    name: 'Conversas',
    count: mockConversations.filter(c => c.type === 'individual').length,
    conversations: mockConversations.filter(c => c.type === 'individual'),
  },
  {
    id: 'groups',
    name: 'Grupos',
    count: mockConversations.filter(c => c.type === 'group').length,
    conversations: mockConversations.filter(c => c.type === 'group'),
  },
  {
    id: 'internal',
    name: 'Internas',
    count: mockConversations.filter(c => c.type === 'internal').length,
    conversations: mockConversations.filter(c => c.type === 'internal'),
  },
];

export const activeConversation = mockConversations[0];