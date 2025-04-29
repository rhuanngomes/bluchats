import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bird, Settings, CreditCard, Users, Bell, Shield, LogOut, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const WorkspaceSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [companyInitial, setCompanyInitial] = useState('');

  React.useEffect(() => {
    getCompanyName();
  }, []);

  const getCompanyName = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_name')
          .eq('id', user.id)
          .single();
        
        if (profile?.company_name) {
          setCompanyInitial(profile.company_name[0].toUpperCase());
        }
      }
    } catch (error) {
      console.error('Error fetching company name:', error);
    }
  };

  const handleSettingsClick = (path: string) => {
    setShowSettingsMenu(false);
    navigate(path);
  };

  return (
    <div className="w-20 bg-gray-900 flex flex-col items-center py-4 border-r border-gray-800">
      <div className="mb-6">
        <Bird className="w-8 h-8 text-blue-600" />
      </div>

      <div className="flex-grow space-y-4 w-full px-3">
        <button
          className="w-full aspect-square rounded-xl flex items-center justify-center text-xl bg-gray-800 text-white font-semibold"
        >
          {companyInitial || 'W'}
        </button>
      </div>

      <div className="mt-auto space-y-4 w-full px-3">
        <div className="relative">
          <button 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all"
          >
            <Settings className="w-6 h-6" />
          </button>

          {showSettingsMenu && (
            <div className="absolute bottom-full left-full mb-2 ml-2 w-64 bg-white rounded-xl shadow-lg py-2">
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