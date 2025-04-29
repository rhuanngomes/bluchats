import React, { useState } from 'react';
import { Search, Plus, MessageCircle, ArrowRight, MoreVertical, AlertCircle } from 'lucide-react';
import SettingsLayout from '../components/settings/SettingsLayout';
import AddChannelModal from '../components/modals/AddChannelModal';
import { useNavigate } from 'react-router-dom';

interface Channel {
  id: string;
  name: string;
  number: string;
  description?: string;
  status: 'Ativo' | 'Desativado';
  connectionStatus: 'Conectado' | 'Desconectado';
  createdAt: string;
  type: 'whatsapp' | 'instagram' | 'messenger';
}

const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Teste',
    number: '+55 11 95319-8095',
    description: 'Teste',
    status: 'Ativo',
    connectionStatus: 'Conectado',
    createdAt: '18/04/2025',
    type: 'whatsapp'
  },
  {
    id: '2',
    name: '552140428328',
    number: '+55 21 4042-8328',
    status: 'Desativado',
    connectionStatus: 'Desconectado',
    createdAt: '18/04/2025',
    type: 'whatsapp'
  },
  {
    id: '3',
    name: '552197691547',
    number: '+55 21 97691-4547',
    status: 'Desativado',
    connectionStatus: 'Desconectado',
    createdAt: '06/07/2023',
    type: 'whatsapp'
  }
];

const ChannelIntegrationsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const handleAddChannel = (channelType: string) => {
    console.log('Adding channel:', channelType);
    setShowAddModal(false);
  };

  const filteredChannels = mockChannels.filter(channel => {
    const matchesSearch = Object.values(channel).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesStatus = selectedStatus === 'all' 
      ? true 
      : selectedStatus === 'active' 
        ? channel.status === 'Ativo'
        : channel.status === 'Desativado';

    return matchesSearch && matchesStatus;
  });

  return (
    <SettingsLayout onBack={() => navigate('/app')}>
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrações de canais</h1>
            <p className="text-gray-600">
              Gerencie todos os seus canais de comunicação em um só lugar
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 flex items-center transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar canal
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total de canais', value: '36', status: 'neutral' },
            { label: 'Canais ativos', value: '28', status: 'success' },
            { label: 'Canais desconectados', value: '8', status: 'warning' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  stat.status === 'success' ? 'bg-green-100 text-green-600' :
                  stat.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {stat.status === 'success' ? (
                    <MessageCircle className="w-4 h-4" />
                  ) : stat.status === 'warning' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <MessageCircle className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar canais"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors min-w-[180px]"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredChannels.map((channel) => (
              <div key={channel.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{channel.name}</h3>
                      <p className="text-sm text-gray-500">{channel.number}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        channel.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className={`text-sm ${
                        channel.status === 'Ativo' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {channel.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        channel.connectionStatus === 'Conectado' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className={`text-sm ${
                        channel.connectionStatus === 'Conectado' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {channel.connectionStatus}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500">
                      {channel.createdAt}
                    </div>

                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Mostrando {filteredChannels.length} canais
              </span>
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                Ver todos os canais
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddChannelModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSelect={handleAddChannel}
      />
    </SettingsLayout>
  );
};

export default ChannelIntegrationsPage;