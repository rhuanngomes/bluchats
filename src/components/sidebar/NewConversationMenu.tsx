import React from 'react';
import { MessageSquare, Users, Send, Podcast as Broadcast } from 'lucide-react';

interface NewConversationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat?: () => void;
  onNewGroup: () => void;
  onBulkMessage?: () => void;
  onBroadcastList?: () => void;
}

const NewConversationMenu: React.FC<NewConversationMenuProps> = ({
  isOpen,
  onClose,
  onNewChat,
  onNewGroup,
  onBulkMessage,
  onBroadcastList,
}) => {
  if (!isOpen) return null;

  const handleClick = (callback?: () => void) => {
    if (!callback) return;
    onClose();
    callback();
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 w-64">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
      >
        <div className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <span className="font-medium">Novo atendimento</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">Em breve</span>
            </div>
            <span className="text-xs text-gray-400 text-left">Iniciar uma nova conversa</span>
          </div>
        </div>
      </button>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
      >
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <span className="font-medium">Novo grupo</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">Em breve</span>
            </div>
            <span className="text-xs text-gray-400 text-left">Criar um grupo de conversas</span>
          </div>
        </div>
      </button>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
      >
        <div className="flex items-center">
          <Send className="w-4 h-4 mr-2" />
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <span className="font-medium">Disparo em massa</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">Em breve</span>
            </div>
            <span className="text-xs text-gray-400 text-left">Enviar mensagem para múltiplos contatos</span>
          </div>
        </div>
      </button>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
      >
        <div className="flex items-center w-full">
          <Broadcast className="w-4 h-4 mr-2" />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-medium">Lista de transmissão</span>
              <span className="text-xs px-2.5 py-0.5 bg-blue-100 text-blue-600 rounded-full whitespace-nowrap">Em breve</span>
            </div>
            <span className="text-xs text-gray-400 text-left">Criar lista para envios em massa</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default NewConversationMenu