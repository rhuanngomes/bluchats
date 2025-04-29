import React, { useState } from 'react';
import { Search, Plus, Trash2, Settings2, Filter, ChevronDown, Users, MessageSquare, Bell, ArrowUpRight } from 'lucide-react';
import SettingsLayout from '../components/settings/SettingsLayout';
import { useNavigate } from 'react-router-dom';

interface Inbox {
  id: string;
  tag: string;
  tagColor: string;
  name: string;
  description?: string;
  agents: number;
  status: 'active' | 'inactive';
  type: 'whatsapp' | 'instagram' | 'messenger';
  unreadCount: number;
  averageResponseTime: string;
}

const mockInboxes: Inbox[] = [
  {
    id: '1',
    tag: 'ADA',
    tagColor: '#3B82F6',
    name: 'ADAPTAÇÃO',
    agents: 7,
    status: 'active',
    type: 'whatsapp',
    unreadCount: 12,
    averageResponseTime: '2m'
  },
  {
    id: '2',
    tag: 'API',
    tagColor: '#06B6D4',
    name: 'API OFICIAL',
    agents: 3,
    status: 'active',
    type: 'whatsapp',
    unreadCount: 5,
    averageResponseTime: '5m'
  },
  {
    id: '3',
    tag: 'BLO',
    tagColor: '#F97316',
    name: 'BLOQUEADOS',
    agents: 1,
    status: 'active',
    type: 'instagram',
    unreadCount: 0,
    averageResponseTime: '1m'
  }
];

const InboxSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<'all' | 'whatsapp' | 'instagram' | 'messenger'>('all');

  const filteredInboxes = mockInboxes.filter(inbox => 
    (selectedType === 'all' || inbox.type === selectedType) &&
    Object.values(inbox).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <SettingsLayout onBack={() => navigate('/app')}>
      <div className="max-w-[1800px] mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Caixas de Entrada</h1>
            <p className="text-gray-600 mt-1">
              Gerencie todas as suas caixas de entrada em um só lugar
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center shadow-sm">
              <Plus className="w-5 h-5 mr-2" />
              Nova caixa
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total de caixas', value: '12', icon: MessageSquare, color: 'bg-blue-500' },
            { label: 'Agentes ativos', value: '45', icon: Users, color: 'bg-green-500' },
            { label: 'Tempo médio de resposta', value: '2m 30s', icon: Bell, color: 'bg-purple-500' },
            { label: 'Taxa de resolução', value: '94%', icon: ArrowUpRight, color: 'bg-orange-500' }
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
                  placeholder="Pesquisar caixa de entrada"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedType === 'all'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedType('whatsapp')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedType === 'whatsapp'
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setSelectedType('instagram')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedType === 'instagram'
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Instagram
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inboxes Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredInboxes.map((inbox) => (
            <div key={inbox.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200 transition-colors">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: inbox.tagColor }}
                    >
                      {inbox.tag}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{inbox.name}</h3>
                      <p className="text-sm text-gray-500">{inbox.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Agentes</div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        {Array(Math.min(inbox.agents, 3)).fill(0).map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                          >
                            <span className="text-xs font-medium text-gray-600">U</span>
                          </div>
                        ))}
                      </div>
                      {inbox.agents > 3 && (
                        <span className="text-sm text-gray-500">+{inbox.agents - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Não lidas</div>
                    <div className="text-xl font-bold text-gray-900">{inbox.unreadCount}</div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${
                    inbox.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  } mr-2`} />
                  <span className="text-sm text-gray-600">
                    {inbox.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Resposta média: {inbox.averageResponseTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
};

export default InboxSettingsPage;