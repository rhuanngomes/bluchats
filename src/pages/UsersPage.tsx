import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, Settings2, Trash2, Mail, Shield, Clock, ArrowUpRight } from 'lucide-react';
import SettingsLayout from '../components/settings/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import AddUserModal from '../components/modals/AddUserModal';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  accessLevel: 'Básico' | 'Admin' | 'Gerente';
  status: 'Ativo' | 'Desativado';
  lastAccess?: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'abraao.pinkapp',
    username: 'abraao.pinkapp',
    email: 'pink.abraao.pinkapp@pinkapp.com',
    accessLevel: 'Básico',
    status: 'Desativado',
    lastAccess: '2 dias atrás'
  },
  {
    id: '2',
    name: 'Adir',
    username: 'adir.pinkapp',
    email: 'adir@gmail.com',
    accessLevel: 'Básico',
    status: 'Desativado',
    lastAccess: '5 dias atrás'
  },
  {
    id: '3',
    name: 'Administrator',
    username: 'pink.pinkapp',
    email: 'rc_admin@heypink.com',
    accessLevel: 'Admin',
    status: 'Ativo',
    lastAccess: '12 minutos atrás'
  },
  {
    id: '4',
    name: 'Adonai',
    username: 'adonai.pinkapp',
    email: 'adonai.costa@gmail.com',
    accessLevel: 'Básico',
    status: 'Desativado',
    lastAccess: '1 semana atrás'
  },
  {
    id: '5',
    name: 'Agatha',
    username: 'onboarding.pinkapp',
    email: 'onboarding@pinkapp.com',
    accessLevel: 'Admin',
    status: 'Ativo',
    lastAccess: '27 minutos atrás'
  }
];

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'basic' | 'manager'>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = Object.values(user).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesStatus = selectedStatus === 'all' 
      ? true 
      : selectedStatus === 'active' 
        ? user.status === 'Ativo'
        : user.status === 'Desativado';

    const matchesRole = selectedRole === 'all'
      ? true
      : selectedRole === 'admin'
        ? user.accessLevel === 'Admin'
        : selectedRole === 'basic'
          ? user.accessLevel === 'Básico'
          : user.accessLevel === 'Gerente';

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <SettingsLayout onBack={() => navigate('/app')}>
      <div className="max-w-[1800px] mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
            <p className="text-gray-600 mt-1">
              Gerencie todos os usuários da sua organização
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar usuário
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total de usuários', value: '156', icon: Mail, color: 'bg-blue-500' },
            { label: 'Usuários ativos', value: '124', icon: Shield, color: 'bg-green-500' },
            { label: 'Último acesso', value: '2 min atrás', icon: Clock, color: 'bg-purple-500' },
            { label: 'Taxa de atividade', value: '94%', icon: ArrowUpRight, color: 'bg-orange-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-6">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar usuários"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"
                >
                  <option value="all">Todos os status</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as typeof selectedRole)}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"
                >
                  <option value="all">Todas as funções</option>
                  <option value="admin">Administradores</option>
                  <option value="basic">Usuários básicos</option>
                  <option value="manager">Gerentes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Nome de usuário</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Último acesso</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Nível de acesso</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {user.name[0].toUpperCase()}
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastAccess}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium
                        ${user.accessLevel === 'Admin' ? 'bg-purple-100 text-purple-800' :
                          user.accessLevel === 'Gerente' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {user.accessLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Settings2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Mostrando {filteredUsers.length} usuários</span>
              <div className="flex items-center space-x-2">
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
                  <option>10 por página</option>
                  <option>25 por página</option>
                  <option>50 por página</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(userData) => {
          console.log('New user:', userData);
          setShowAddModal(false);
        }}
      />
    </SettingsLayout>
  );
};

export default UsersPage;