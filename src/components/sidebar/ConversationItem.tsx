import React, { forwardRef } from 'react';
import { DraggableAttributes } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Conversation } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { MessageSquare, MoreVertical, EyeOff, Mail, LogOut, Instagram, MessageCircle } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  onHide?: () => void;
  onMarkUnread?: () => void;
  onLeave?: () => void;
}

interface ActionMenuProps {
  isVisible: boolean;
  onHide: () => void;
  onMarkUnread: () => void;
  onLeave: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ isVisible, onHide, onMarkUnread, onLeave }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
      <button
        onClick={(e) => { e.stopPropagation(); onHide(); }}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <EyeOff className="w-4 h-4 mr-2" />
        Esconder conversa
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onMarkUnread(); }}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Mail className="w-4 h-4 mr-2" />
        Marcar como não lida
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onLeave(); }}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair da conversa
      </button>
    </div>
  );
};

interface DragHandleProps {
  attributes: DraggableAttributes;
  listeners: Record<string, Function>;
}

const DragHandle: React.FC<DragHandleProps> = ({ attributes, listeners }) => (
  <div
    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-grab opacity-0 group-hover:opacity-100"
    {...attributes}
    {...listeners}
  >
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
      <circle cx="4" cy="8" r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

const ConversationItem = forwardRef<HTMLDivElement, ConversationItemProps>(({
  conversation,
  isActive,
  onClick, 
  onHide = () => {},
  onMarkUnread = () => {},
  onLeave = () => {},
}, ref) => {
  const [showActions, setShowActions] = React.useState(false);
  const mainParticipant = conversation.participants[0];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: conversation.id,
    data: conversation,
  });

  const style = {
    transform: CSS.Transform.toString(transform || ''),
    transition: transition || '',
    opacity: isDragging ? 0.5 : undefined
  };
  
  const getChannelIcon = () => {
    switch (conversation.channel) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#E4405F]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`group relative flex items-center px-4 py-3 cursor-pointer transition-colors ${
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
      } ${transform ? 'opacity-50' : ''}`}
    >
      <DragHandle attributes={attributes} listeners={listeners} />
      <button
        onClick={(e) => { e.stopPropagation(); setShowActions(!showActions); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 z-20"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      <ActionMenu
        isVisible={showActions}
        onHide={onHide}
        onMarkUnread={onMarkUnread}
        onLeave={onLeave}
      />
      <Avatar
        src={mainParticipant?.avatar}
        alt={mainParticipant?.name || 'Unknown'}
        isOnline={mainParticipant?.isOnline}
      />
      
      <div className="ml-3 flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <div className="font-medium text-gray-900 truncate">
            <div className="flex items-center space-x-2">
              <span>{mainParticipant?.name}</span>
              {mainParticipant?.status === 'busy' && (
                <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
                  Ocupado
                </span>
              )}
            </div>
            {conversation.tags && conversation.tags.length > 0 && (
              <div className="flex mt-1 space-x-1">
                {conversation.tags.map(tag => (
                  <Badge key={tag.id} color={tag.color} size="sm" variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500 whitespace-nowrap ml-1">
            {getChannelIcon()}
            <span className="text-[11px]">{conversation.lastMessage && formatDate(conversation.lastMessage.timestamp)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="text-sm text-gray-600 truncate max-w-[70%]">
            {conversation.lastMessage?.content || 'No messages yet'}
          </div>
          
          <div className="flex items-center space-x-1">
            {conversation.unread > 0 && (
              <Badge color="#25D366" size="sm">
                <span className="px-1">{conversation.unread}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ConversationItem.displayName = 'ConversationItem';
export default ConversationItem;