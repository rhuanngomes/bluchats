import React from 'react';
import { Check, CheckCheck, MessageCircle, Reply, Forward, Pin, Copy, Smile, MoreVertical } from 'lucide-react';
import { Message as MessageType, User } from '../../types';
import ImageModal from '../ui/ImageModal';
import { formatTime } from '../../utils/dateUtils';
import ForwardMessageModal from './ForwardMessageModal';
import { mockConversations } from '../../data/mockData';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
  sender?: User;
  onReply: (message: MessageType) => void;
  onForward: (message: MessageType, conversationIds: string[]) => void;
  onPin: (message: MessageType) => void;
  onReact: (message: MessageType, reaction: string) => void;
}

interface MessageActionsProps {
  message: MessageType;
  isVisible: boolean;
  onReply: () => void;
  onForward: () => void;
  onPin: () => void;
  onCopy: () => void;
  onReact: () => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  isVisible,
  onReply,
  onForward,
  onPin,
  onCopy,
  onReact
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-white rounded-lg shadow-lg p-1 z-50">
      <button
        onClick={onReply}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
        title="Responder"
      >
        <Reply className="w-4 h-4" />
      </button>
      <button
        onClick={onForward}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
        title="Encaminhar"
      >
        <Forward className="w-4 h-4" />
      </button>
      <button
        onClick={onPin}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
        title="Fixar"
      >
        <Pin className="w-4 h-4" />
      </button>
      <button
        onClick={onCopy}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
        title="Copiar"
      >
        <Copy className="w-4 h-4" />
      </button>
      <button
        onClick={onReact}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
        title="Reagir"
      >
        <Smile className="w-4 h-4" />
      </button>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({
  message,
  isCurrentUser,
  sender,
  onReply,
  onForward,
  onPin,
  onReact,
}) => {
  const [showActions, setShowActions] = React.useState(false); 
  const actionsTimeoutRef = React.useRef<NodeJS.Timeout>();
  const [showReactions, setShowReactions] = React.useState(false);
  const [showReactionPicker, setShowReactionPicker] = React.useState(false);
  const messageRef = React.useRef<HTMLDivElement>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);
  const [showForwardModal, setShowForwardModal] = React.useState(false);
  const [showAvatarModal, setShowAvatarModal] = React.useState(false);

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="w-3.5 h-3.5 text-gray-500" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-gray-500" />;
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const handleReact = () => {
    setShowReactionPicker(true);
  };

  const handleSelectReaction = (reaction: string) => {
    onReact(message, reaction);
    setShowReactionPicker(false);
  };

  const handleMouseEnter = () => {
    if (actionsTimeoutRef.current) {
      clearTimeout(actionsTimeoutRef.current);
    }
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    actionsTimeoutRef.current = setTimeout(() => {
      if (!messageRef.current?.matches(':hover') && !actionsRef.current?.matches(':hover')) {
        setShowActions(false);
      }
    }, 300);
  };

  const handleForwardToConversations = (conversationIds: string[]) => {
    onForward(message, conversationIds);
    setShowForwardModal(false);
  };

  return (
    <div
      className={`flex mb-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isCurrentUser && sender && (
        <div className="mr-2 flex-shrink-0 mb-auto">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setShowAvatarModal(true);
            }}
            className="cursor-pointer"
          >
            <img
              src={sender.avatar}
              alt={sender.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>
      )}
      <div
        className={`max-w-[70%] px-4 py-3 rounded-lg ${
          isCurrentUser
            ? 'bg-green-100 text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
        } relative group hover:cursor-pointer`}
        ref={messageRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={actionsRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showReactionPicker && (
            <div className="absolute -top-16 left-0 flex items-center space-x-1 bg-white rounded-full shadow-lg p-2 z-50">
              {reactions.map((reaction) => (
                <button
                  key={reaction}
                  onClick={() => handleSelectReaction(reaction)}
                  className="p-1.5 hover:bg-gray-100 rounded-full text-xl transition-transform hover:scale-125"
                >
                  {reaction}
                </button>
              ))}
            </div>
          )}
          <MessageActions
            message={message}
            isVisible={showActions}
            onReply={() => onReply(message)}
            onForward={() => setShowForwardModal(true)}
            onPin={() => onPin(message)}
            onCopy={handleCopy}
            onReact={handleReact}
          />
        </div>

        {!isCurrentUser && sender && (
          <div className="flex items-center mb-1">
            <span className="text-sm font-medium text-gray-900">{sender.name}</span>
          </div>
        )}
        
        <div className="text-sm text-gray-700">{message.content}</div>
        
        {message.replyTo && (
          <div className="mt-1 pl-2 border-l-2 border-gray-300 text-xs text-gray-500">
            Em resposta a: {message.replyTo.content}
          </div>
        )}

        <div className="flex items-center justify-end mt-1 space-x-1 text-gray-500">
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex -space-x-1 mr-2">
              {message.reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="px-1.5 py-0.5 bg-white rounded-full shadow-sm text-xs"
                >
                  {reaction}
                </div>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
          {isCurrentUser && (
            <div className="flex items-center">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
      <ImageModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        imageUrl={sender?.avatar}
        alt={sender?.name || ''}
      />
      <ForwardMessageModal
        isOpen={showForwardModal}
        onClose={() => setShowForwardModal(false)}
        onForward={handleForwardToConversations}
        conversations={mockConversations}
      />
    </div>
  );
};

export default Message;