import React from 'react';
import { Phone, Video, MoreVertical, Plus, Book, Search, ChevronRight } from 'lucide-react';
import { User, Tag } from '../../types';
import Avatar from '../ui/Avatar';
import ImageModal from '../ui/ImageModal';
import Badge from '../ui/Badge';
import TagModal from './TagModal';
import ConversationMenu from './ConversationMenu';
import KnowledgeBase from './KnowledgeBase';

interface ChatHeaderProps {
  participant: User;
  tags?: Tag[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ participant, tags = [] }) => {
  const [isTagModalOpen, setIsTagModalOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = React.useState(false);
  const [showAvatarModal, setShowAvatarModal] = React.useState(false);

  const handleAddTag = (tag: Tag) => {
    // Here you would typically update the conversation's tags through your state management
    console.log('Adding tag:', tag);
  };

  return (
    <>
    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <div onClick={() => setShowAvatarModal(true)} className="cursor-pointer">
          <Avatar
            src={participant.avatar}
            alt={participant.name}
            isOnline={participant.isOnline}
          />
        </div>
        <div className="ml-3 flex flex-col">
          <div className="font-medium flex items-center">
            {participant.name}
          </div>
          
          {participant.isOnline && (
            <span className="text-xs text-green-600">online</span>
          )}
          
          <div className="flex items-center mt-1 space-x-1">
            {tags.length > 0 && tags
              .filter(tag => tag.name !== 'W22')
              .map(tag => (
                <Badge key={tag.id} color={tag.color} size="sm" variant="outline">
                  {tag.name}
                </Badge>
              ))}
            <button
              onClick={() => setIsTagModalOpen(true)}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar tag
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => setIsKnowledgeBaseOpen(true)} 
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <Book className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <Phone className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <Video className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
    <TagModal
      isOpen={isTagModalOpen}
      onClose={() => setIsTagModalOpen(false)}
      onAddTag={handleAddTag}
    />
    <ConversationMenu
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
    />
    <KnowledgeBase
      isOpen={isKnowledgeBaseOpen}
      onClose={() => setIsKnowledgeBaseOpen(false)}
    />
    <ImageModal
      isOpen={showAvatarModal}
      onClose={() => setShowAvatarModal(false)}
      imageUrl={participant.avatar}
      alt={participant.name}
    />
    </>
  );
};

export default ChatHeader;