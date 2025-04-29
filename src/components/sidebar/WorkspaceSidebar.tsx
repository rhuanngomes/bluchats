import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bird, Plus, Settings, CreditCard, Users, Bell, Shield, LogOut, User } from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  icon: string;
  unreadCount?: number;
}

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Omnichannel Chats',
    icon: '💬',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'Marketing',
    icon: '📢',
  },
  {
    id: '3',
    name: 'Jurídico',
    icon: '⚖️',
  },
  {
    id: '4',
    name: 'Atendimento',
    icon: '🎯',
  },
  {
    id: '5',
    name: 'Comercial',
    icon: '💼',
  },
];

const WorkspaceSidebar: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState(mockWorkspaces[0].id);
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = (path: string) => {
    setShowSettingsMenu(false);
    navigate(path);
  };


  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showSettingsMenu) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSettingsMenu]);

  return (
    <div className="w-20 bg-gray-900 flex flex-col items-center py-4 border-r border-gray-800">
      <div className="mb-6">
        <Bird className="w-8 h-8 text-blue-500" />
      </div>

      <div className="flex-grow space-y-4 w-full px-3">
        {mockWorkspaces.map((workspace) => (
          <button
            key={workspace.id}
            onClick={() => setActiveWorkspace(workspace.id)}
            className={`relative w-full aspect-square rounded-xl flex items-center justify-center text-xl transition-all ${
              activeWorkspace === workspace.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
          >
            {workspace.icon}
            {workspace.unreadCount && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {workspace.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto space-y-4 w-full px-3">
        <button
          onClick={() => setShowNewWorkspaceModal(true)}
          className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowSettingsMenu(!showSettingsMenu);
            }}
            className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all"
          >
            <Settings className="w-6 h-6" />
          </button>
          
        {showSettingsMenu && (
          <div 
            className="fixed bottom-20 left-20 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-[100]"
            onClick={(e) => e.stopPropagation()}
          >
              <button
                onClick={() => handleSettingsClick('/app/my-account')}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">Minha Conta</div>
                  <div className="text-xs text-gray-500">Gerencie seu perfil</div>
                </div>
              </button>
              {[
                { 
                  icon: CreditCard, 
                  label: 'Plano e Faturamento',
                  description: 'Gerencie sua assinatura',
                  path: '/app/billing'
                },
                { 
                  icon: Users,
                  label: 'Usuários',
                  description: 'Gerencie sua equipe',
                  path: '/app/users'
                },
                { 
                  icon: Bell,
                  label: 'Notificações',
                  description: 'Configure alertas',
                  path: '/app/notifications'
                },
                { 
                  icon: Shield,
                  label: 'Segurança',
                  description: 'Controle de acesso',
                  path: '/app/security'
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSettingsClick(item.path)}
                  className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <item.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </button>
              ))}
              <div className="border-t border-gray-100 my-2" />
              <button
                onClick={() => handleSettingsClick('/logout')}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-red-600">Sair</div>
                  <div className="text-xs text-red-500">Encerrar sessão</div>
                </div>
              </button>
            </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;