import React from 'react';
import { X, MessageCircle, Instagram, Mail, MessageSquare, DiscIcon as BrandDiscord, Slack as BrandSlack, Linkedin as BrandLinkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (channel: string) => void;
}

const channels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Web',
    icon: MessageCircle,
    description: 'Conecte sua conta do WhatsApp Web rapidamente.',
    color: 'bg-[#25D366]',
    status: 'available'
  },
  {
    id: 'instagram',
    name: 'Direct Instagram',
    icon: Instagram,
    description: 'Conecte seu perfil do Instagram para gerenciar suas mensagens diretas.',
    color: 'bg-[#E4405F]',
    status: 'coming-soon'
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    description: 'Integre suas caixas de entrada de email para um atendimento unificado.',
    color: 'bg-blue-500',
    status: 'available'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: MessageSquare,
    description: 'Conecte seu bot do Telegram para atendimento automatizado.',
    color: 'bg-[#0088cc]',
    status: 'coming-soon'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: BrandDiscord,
    description: 'Integre seus canais do Discord para suporte à comunidade.',
    color: 'bg-[#5865F2]',
    status: 'coming-soon'
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: BrandSlack,
    description: 'Conecte seus workspaces do Slack para comunicação interna.',
    color: 'bg-[#4A154B]',
    status: 'coming-soon'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: BrandLinkedin,
    description: 'Gerencie mensagens do LinkedIn diretamente na plataforma.',
    color: 'bg-[#0A66C2]',
    status: 'coming-soon'
  }
];

const AddChannelModal: React.FC<AddChannelModalProps> = ({ isOpen, onClose, onSelect }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChannelSelect = (channelId: string) => {
    onSelect(channelId);
    if (channelId === 'whatsapp') {
      navigate('/app/integrations/whatsapp');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Adicionar integração de canal</h2>
              <p className="text-gray-600 mt-1">Selecione o canal que você deseja integrar</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => channel.status === 'available' && handleChannelSelect(channel.id)}
                className={`relative group rounded-xl border border-gray-100 p-6 hover:border-blue-200 transition-all ${
                  channel.status === 'available' 
                    ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' 
                    : 'opacity-80 cursor-not-allowed'
                }`}
              >
                {channel.status === 'coming-soon' && (
                  <span className="absolute top-4 right-4 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Em breve
                  </span>
                )}
                
                <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center mb-4`}>
                  <channel.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">{channel.name}</h3>
                <p className="text-sm text-gray-600">{channel.description}</p>
                
                {channel.status === 'available' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Conectar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;