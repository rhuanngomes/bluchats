import React, { useState } from 'react';
import { Search, X, Edit2 } from 'lucide-react';
import { Tag } from '../../types';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: (tag: Tag) => void;
}

const TagModal: React.FC<TagModalProps> = ({ isOpen, onClose, onAddTag }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tags: Tag[] = [
    { id: '1', name: 'parceiro wl', color: '#FFDAD7' },
    { id: '2', name: 'Promotor', color: '#E3F2FD' },
    { id: '3', name: '2 números', color: '#FFDAD7' },
    { id: '4', name: 'Sem Bot', color: '#F3E5F5' },
    { id: '5', name: 'Bot Multinivel', color: '#FCE4EC' },
    { id: '6', name: 'forms - motivo', color: '#FFDAD7' },
    { id: '7', name: 'Bot Simples', color: '#F3E5F5' },
    { id: '8', name: '6 números', color: '#F3E5F5' },
    { id: '9', name: 'grupos', color: '#FFDAD7' },
    { id: '10', name: 'Em processo de api oficial', color: '#E3F2FD' },
    { id: '11', name: 'Onboarding', color: '#E3F2FD' },
    { id: '12', name: 'Produto e Design', color: '#E3F2FD' },
    { id: '13', name: 'App', color: '#E0F2F1' },
    { id: '14', name: 'yduqspremium', color: '#FFF3E0' },
    { id: '15', name: 'Bot Saudação', color: '#F3E5F5' },
    { id: '16', name: 'Semestral', color: '#FFF3E0' },
    { id: '17', name: 'Aplicativo', color: '#E3F2FD' },
  ];

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Tag global</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredTags.map(tag => (
              <button
                key={tag.id}
                onClick={() => {
                  onAddTag(tag);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="px-3 py-1 rounded-md text-sm"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                </div>
                <Edit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
              </button>
            ))}
            
            <button className="w-full mt-2 p-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg">
              Criar uma nova tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagModal;