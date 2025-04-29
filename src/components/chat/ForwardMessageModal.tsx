import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { Conversation } from '../../types';
import Avatar from '../ui/Avatar';

interface ForwardMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForward: (conversationIds: string[]) => void;
  conversations: Conversation[];
}

const ForwardMessageModal: React.FC<ForwardMessageModalProps> = ({
  isOpen,
  onClose,
  onForward,
  conversations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredConversations = conversations.filter(conv => {
    const participant = conv.participants[0];
    return participant?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleConversation = (conversationId: string) => {
    setSelectedConversations(prev => 
      prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const handleForward = () => {
    onForward(selectedConversations);
    setSelectedConversations([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:w-[480px] sm:rounded-2xl max-h-[85vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Encaminhar mensagem
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar conversa"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => {
            const participant = conversation.participants[0];
            const isSelected = selectedConversations.includes(conversation.id);

            return (
              <button
                key={conversation.id}
                onClick={() => toggleConversation(conversation.id)}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Avatar
                  src={participant?.avatar}
                  alt={participant?.name || ''}
                  size="sm"
                />
                <span className="ml-3 flex-1 text-left font-medium text-gray-900">
                  {participant?.name}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleForward}
            disabled={selectedConversations.length === 0}
            className="w-full py-3 bg-green-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
          >
            Encaminhar para {selectedConversations.length} conversa{selectedConversations.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForwardMessageModal;