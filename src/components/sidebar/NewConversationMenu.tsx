import React from 'react';
import { MessageSquare, Users, Send, Podcast as Broadcast } from 'lucide-react';

interface NewConversationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
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

  const handleClick = (callback: () => void) => {
    onClose();
    callback();
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 w-64">
      <button
        onClick={() => handleClick(onNewChat)}
        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Novo atendimento</span>
          <span className="text-xs text-gray-500 text-left">Iniciar uma nova conversa</span>
        </div>
      </button>
      <button
        onClick={() => handleClick(onNewGroup)}
        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Users className="w-4 h-4 mr-2" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Novo grupo</span>
          <span className="text-xs text-gray-500 text-left">Criar um grupo de conversas</span>
        </div>
      </button>
      <button
        onClick={() => handleClick(onBulkMessage || (() => {}))}
        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Send className="w-4 h-4 mr-2" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Disparo em massa</span>
          <span className="text-xs text-gray-500 text-left">Enviar mensagem para múltiplos contatos</span>
        </div>
      </button>
      <button
        onClick={() => handleClick(onBroadcastList || (() => {}))}
        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Broadcast className="w-4 h-4 mr-2" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Lista de transmissão</span>
          <span className="text-xs text-gray-500 text-left">Criar lista para envios em massa</span>
        </div>
      </button>
    </div>
  );
};

export default NewConversationMenu