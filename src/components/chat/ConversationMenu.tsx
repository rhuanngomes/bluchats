import React from 'react';
import { X, Info, Users, Paperclip, Star, AtSign, MessageSquare, Bell, ChevronRight } from 'lucide-react';

interface ConversationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Info, label: 'Informações da conversa', color: '#3B82F6' },
  { icon: Users, label: 'Participantes', color: '#EC4899' },
  { icon: Paperclip, label: 'Arquivos', color: '#6366F1' },
  { icon: Star, label: 'Mensagens Fixadas', color: '#EC4899' },
  { icon: AtSign, label: 'Menções', color: '#3B82F6' },
  { icon: MessageSquare, label: 'Minhas mensagens favoritas', color: '#F59E0B' },
  { icon: MessageSquare, label: 'Fofocas', color: '#F97316' },
  { icon: Bell, label: 'Preferências de Notificação', color: '#3B82F6' },
];

const ConversationMenu: React.FC<ConversationMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl z-50 animate-slide-left">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-base font-medium tracking-wide">MENU</h2>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div 
                className="w-8 h-8 flex items-center justify-center"
              >
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
              </div>
              <span className="ml-3 text-sm text-gray-700">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationMenu;