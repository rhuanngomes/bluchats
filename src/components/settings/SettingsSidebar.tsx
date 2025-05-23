import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart2,
  InboxIcon,
  Users,
  Clock,
  Share2,
  Bot,
  Briefcase,
  User
} from 'lucide-react';

interface SettingsSidebarProps {
  onBack: () => void;
}

const menuItems = [
  { icon: BarChart2, label: 'Métricas', path: '/app/metrics', id: 'metrics' },
  { icon: InboxIcon, label: 'Caixas de entrada', path: '/app/inboxes', id: 'inboxes' },
  { icon: Users, label: 'Edição de usuários', path: '/app/users', id: 'users' },
  { icon: Clock, label: 'Horário de atendimento', comingSoon: true },
  { icon: Share2, label: 'Integração de canal', path: '/app/integrations', id: 'integrations' },
  { icon: Bot, label: 'Configurações de bot', comingSoon: true },
  { icon: Briefcase, label: 'Workspaces', comingSoon: true },
  { icon: User, label: 'Contatos', comingSoon: true },
];

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate('/app');
  };

  return (
    <div className="w-80 bg-gray-100 border-r border-gray-200 p-4">
      <button
        onClick={handleBack}
        className="w-full flex items-center text-gray-600 hover:text-gray-900 mb-6 p-2 rounded-lg hover:bg-gray-200 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Voltar ao app</span>
      </button>
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => item.path ? navigate(item.path) : undefined}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left mb-1 ${
            location.pathname === item.path
              ? 'bg-white shadow-sm text-gray-900'
              : 'text-gray-600 hover:bg-gray-200 transition-colors'
          }`}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          {item.comingSoon && (
            <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full whitespace-nowrap">
              Em breve
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SettingsSidebar;