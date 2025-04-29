import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, Settings2, Trash2, Mail, Shield, Clock, ArrowUpRight, Tag, Globe2, Settings, Users, Inbox, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserStatusMenu from '../UserStatusMenu';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Conversation, ConversationGroup as ConversationGroupType } from '../../types';
import ConversationGroup from './ConversationGroup';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';
import { currentUser, mockConversations } from '../../data/mockData';
import NewConversationMenu from './NewConversationMenu';
import NewConversationModal from '../modals/NewConversationModal';
import UserSelectionModal from '../modals/UserSelectionModal';

interface SidebarProps {
  conversationGroups: ConversationGroupType[];
  activeConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversationGroups,
  activeConversationId,
  onSelectConversation,
  onSettingsClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [selectedInbox, setSelectedInbox] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [conversations, setConversations] = useState(conversationGroups);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);
  const [userStatus, setUserStatus] = useState<'online' | 'busy' | 'offline'>('online');
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const navigate = useNavigate();

  const mockUsers = [
    {
      id: '1',
      name: 'Sandra Adams',
      role: 'UX Copywriter',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      id: '2', 
      name: 'Peter Carlsson',
      role: 'Interactive Designer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: '3',
      name: 'Ali Connors',
      role: 'CTO, Team Lead',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      id: '4',
      name: 'Anna Hempway',
      role: 'React Developer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      id: '5',
      name: 'David Park',
      role: 'Web Designer',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
    }
  ];

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleStatusChange = (status: 'online' | 'busy' | 'offline') => {
    setUserStatus(status);
    // Here you would typically update the status in your backend
  };

  const handleLogout = async () => {
    // Implement logout logic here
    navigate('/login');
  };

  const handleNewChat = () => {
    setShowNewMenu(false);
    setShowNewConversationModal(true);
  };

  const handleCreateConversation = (data: any) => {
    console.log('Creating new conversation with data:', data);
    // Implement conversation creation logic here
  };

  const handleNewGroup = () => {
    // Implement new group creation logic
    console.log('Creating new group');
  };

  const handleHideConversation = (conversationId: string) => {
    setConversations(prevConversations => 
      prevConversations.filter(conv => conv.id !== conversationId)
    );
  };

  const handleMarkUnread = (conversationId: string) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unread: conv.unread + 1 }
          : conv
      )
    );
  };

  const handleLeaveConversation = (conversationId: string) => {
    setConversations(prevConversations => 
      prevConversations.filter(conv => conv.id !== conversationId)
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleSettingsClick = () => {
    navigate('/app/metrics');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const conversationId = active.id as string;
      const targetGroupId = over.id as string;
      const sourceGroup = conversationGroups.find(g => 
        g.conversations.some(c => c.id === conversationId)
      );
      const targetGroup = conversationGroups.find(g => g.id === targetGroupId);
      
      if (sourceGroup && targetGroup) {
        setConversations(prevConversations => {
          const conversation = prevConversations.find(c => c.id === conversationId);
          if (!conversation) return prevConversations;

          const updatedConversations = prevConversations.filter(c => c.id !== conversationId);
          const updatedConversation = {
            ...conversation,
            status: targetGroupId === 'inbox' ? 'inbox' : 'active',
            unread: targetGroupId === 'unread' ? conversation.unread : 0,
          };

          return [...updatedConversations, updatedConversation];
        });
      }
    }
  };
  const filteredGroups = conversationGroups.map(group => {
    // Filter conversations based on priority sections
    const filteredConversations = conversations.filter(conversation => {
      // Check if conversation is already shown in a higher priority section
      const isInInbox = conversation.status === 'inbox';
      const isUnread = conversation.unread > 0;
      const isFavorite = conversation.isFavorite;
      
      // Determine which section should show this conversation
      if (group.id === 'inbox' && isInInbox) return true;
      if (group.id === 'unread' && isUnread && !isInInbox) return true;
      if (group.id === 'favorites' && isFavorite && !isInInbox && !isUnread) return true;
      if (group.id === 'all' && conversation.type === 'individual' && !isInInbox && !isUnread && !isFavorite) return true;
      if (group.id === 'groups' && conversation.type === 'group') return true;
      if (group.id === 'internal' && conversation.type === 'internal') return true;
      
      return false;
    }).filter(conversation => {
      // Apply filters
      if (selectedAgent !== 'all') {
        const hasMatchingAgent = conversation.participants.some(p => {
          switch (selectedAgent) {
            case 'online': return p.isOnline;
            case 'offline': return !p.isOnline;
            case 'busy': return p.status === 'busy';
            default: return true;
          }
        });
        if (!hasMatchingAgent) return false;
      }

      // Apply inbox filter
      if (selectedInbox !== 'all' && conversation.channel !== selectedInbox) {
        return false;
      }

      // Apply tag filter
      if (selectedTag !== 'all') {
        const hasMatchingTag = conversation.tags?.some(tag => tag.name === selectedTag);
        if (!hasMatchingTag) return false;
      }

      // Apply period filter
      const conversationDate = new Date(conversation.createdAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (selectedPeriod) {
        case 'today':
          if (conversationDate < today) return false;
          break;
        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          if (conversationDate < yesterday || conversationDate >= today) return false;
          break;
        case 'week':
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          if (conversationDate < lastWeek) return false;
          break;
        case 'month':
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          if (conversationDate < lastMonth) return false;
          break;
      }
      return true;
    }).filter(conversation => { 
      const mainParticipant = conversation.participants[0];
      return mainParticipant.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    
    return {
      ...group,
      conversations: filteredConversations,
      count: filteredConversations.length,
    };
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar 
            onClick={() => setShowStatusMenu(prev => !prev)}
            src={currentUser.avatar} 
            alt={currentUser.name} 
            isOnline={currentUser.isOnline} 
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <UserStatusMenu
            isOpen={showStatusMenu}
            onClose={() => setShowStatusMenu(false)}
            onStatusChange={handleStatusChange}
            onSettingsClick={() => navigate('/app/profile')}
            onLogout={handleLogout}
            currentStatus={userStatus}
          />
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowNewMenu(!showNewMenu)} 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative z-50"
          >
            <Plus className="w-5 h-5" />
            <div className="relative">
              <NewConversationMenu
                isOpen={showNewMenu}
                onClose={() => setShowNewMenu(false)}
                onNewChat={handleNewChat}
                onNewGroup={handleNewGroup}
              />
            </div>
          </button>
          <button
            onClick={() => navigate('/directory')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative group"
          >
            <Globe2 className="w-5 h-5" />
            <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
              Em breve
            </div>
          </button>
          <button
            onClick={handleSettingsClick}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <NewConversationModal
        isOpen={showNewConversationModal}
        onClose={() => setShowNewConversationModal(false)}
        onSubmit={handleCreateConversation}
      />
      
      <div className="px-4 pb-3 space-y-2">
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <button
            onClick={() => setShowUserSelection(true)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm cursor-pointer hover:border-gray-300 transition-colors text-left flex items-center justify-between"
          >
            <span>
              {selectedUsers.length > 0 
                ? `${selectedUsers.length} agente${selectedUsers.length > 1 ? 's' : ''} selecionado${selectedUsers.length > 1 ? 's' : ''}`
                : 'Todos os agentes'
              }
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <UserSelectionModal
            isOpen={showUserSelection}
            onClose={() => setShowUserSelection(false)}
            users={mockUsers}
            selectedUsers={selectedUsers}
            onSelectUser={handleUserSelect}
          />
        </div>

        <div className="relative">
          <Inbox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedInbox}
            onChange={(e) => setSelectedInbox(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="all">Todas as caixas</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="messenger">Messenger</option>
          </select>
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="all">Todas as tags</option>
            <option value="W22">W22</option>
            <option value="COM">COM</option>
            <option value="CAL">CAL</option>
            <option value="CRO">CRO</option>
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="today">Hoje</option>
            <option value="yesterday">Ontem</option>
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
          </select>
        </div>

        <button
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          Mais filtros
        </button>
      </div>

      <div className="px-4 pb-3">
        <Input
          value={searchQuery}
          onRightIconClick={handleClearSearch}
          onChange={handleSearch}
          placeholder="Pesquisar conversas"
          leftIcon={<Search className="w-5 h-5" />}
          rightIcon={searchQuery ? <button className="text-gray-400 hover:text-gray-600">×</button> : undefined}
        />
      </div>
      
      <div className="flex-grow overflow-y-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredGroups.map(g => g.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredGroups.map(group => (
              <ConversationGroup
                key={group.id}
                group={group}
                activeConversationId={activeConversationId}
                onSelectConversation={onSelectConversation}
                onHide={handleHideConversation}
                onMarkUnread={handleMarkUnread}
                onLeave={handleLeaveConversation}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Sidebar;