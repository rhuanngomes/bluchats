import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Plus, X, Filter, ChevronDown, Trash2, MoreVertical, ChevronLeft, ChevronRight, Mail, EyeOff, LogOut, Globe2 } from 'lucide-react';

interface FilterGroup {
  id: string;
  filters: {
    field: string;
    operator: string;
    value: string;
  }[];
}

interface FilterOption {
  label: string;
  value: string;
  operators: string[];
}

const filterOptions: FilterOption[] = [
  { label: 'Usuário', value: 'user', operators: ['é igual', 'contém', 'não contém'] },
  { label: 'Status de conversa', value: 'status', operators: ['é igual', 'não é igual'] },
  { label: 'Tag', value: 'tag', operators: ['contém', 'não contém'] },
  { label: 'Caixa de entrada', value: 'inbox', operators: ['é igual', 'não é igual'] },
];

const tabs = [
  'Todas as conversas',
  'Em Triagem',
  'Sem Resposta',
  'Minhas conversas',
  'Não lidas',
  'Favoritas',
  'Privadas',
  'Diretas',
  'Escondidas'
];

const mockConversations = [
  {
    id: '1',
    name: 'Willian Valle',
    sender: { type: 'W1', label: 'WhatsApp' },
    recipient: '+55 21 96769-9743',
    inbox: 'PIN',
    status: 'Em Andamento',
    users: ['U'],
    createdAt: '24/04/2025',
    lastMessage: '12:26',
    tags: []
  },
  {
    id: '2',
    name: 'Ricardo Corrêa',
    sender: { type: 'W1', label: 'WhatsApp' },
    recipient: '+55 11 99906-8275',
    inbox: 'TRI',
    status: 'Em Andamento',
    users: ['U', 'U'],
    createdAt: '18/04/2025',
    lastMessage: '11:51',
    tags: []
  }
];

interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkUnread: () => void;
  onHide: () => void;
  onLeave: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ isOpen, onClose, onMarkUnread, onHide, onLeave }) => {
  if (!isOpen) return null;

  // Handle click outside to close menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div 
      className="fixed w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50"
      style={{ top: '100%', right: '0' }}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onMarkUnread(); onClose(); }}
        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Mail className="w-4 h-4 mr-3 text-gray-500" />
        Marcar como não lida
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onHide(); onClose(); }}
        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <EyeOff className="w-4 h-4 mr-3 text-gray-500" />
        Esconder conversa
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onLeave(); onClose(); }}
        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <LogOut className="w-4 h-4 mr-3 text-gray-500" />
        Sair da conversa
      </button>
    </div>
  );
};

const DirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(true);

  if (showComingSoon) {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/50 flex items-center justify-center z-50">
          <div className="max-w-md text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Globe2 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Diretório em desenvolvimento
            </h2>
            <p className="text-gray-600 mb-6">
              Estamos trabalhando para trazer uma experiência incrível de gerenciamento de conversas. Em breve você poderá acessar todas as suas conversas em um só lugar.
            </p>
            <button
              onClick={() => navigate('/app')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Voltar para o app
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('Todas as conversas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: '1',
      filters: [
        { field: 'user', operator: 'é igual', value: 'Kauê' },
        { field: 'status', operator: 'é igual', value: 'Aberta' },
        { field: 'tag', operator: 'contém', value: 'Urgente' },
      ]
    },
    {
      id: '2',
      filters: [
        { field: 'status', operator: 'é igual', value: 'Aberta' },
        { field: 'inbox', operator: 'é igual', value: 'Comercial' },
      ]
    }
  ]);

  const addFilterGroup = () => {
    setFilterGroups([...filterGroups, { id: Date.now().toString(), filters: [] }]);
  };

  const addFilter = (groupId: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          filters: [...group.filters, { field: 'user', operator: 'é igual', value: '' }]
        };
      }
      return group;
    }));
  };

  const updateFilter = (groupId: string, filterIndex: number, field: string, value: string) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        const newFilters = [...group.filters];
        newFilters[filterIndex] = { ...newFilters[filterIndex], [field]: value };
        return { ...group, filters: newFilters };
      }
      return group;
    }));
  };

  const removeFilter = (groupId: string, filterIndex: number) => {
    setFilterGroups(filterGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          filters: group.filters.filter((_, index) => index !== filterIndex)
        };
      }
      return group;
    }));
  };

  const removeFilterGroup = (groupId: string) => {
    setFilterGroups(filterGroups.filter(group => group.id !== groupId));
  };

  const clearAllFilters = () => {
    setFilterGroups([]);
  };
  
  const handleMarkUnread = (conversationId: string) => {
    // Implementation for marking conversation as unread
    console.log('Mark as unread:', conversationId);
  };

  const handleHideConversation = (conversationId: string) => {
    // Implementation for hiding conversation
    console.log('Hide conversation:', conversationId);
  };

  const handleLeaveConversation = (conversationId: string) => {
    // Implementation for leaving conversation
    console.log('Leave conversation:', conversationId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/app')}
            className="flex items-center text-gray-500 hover:text-gray-700 group px-3 py-2 rounded-lg hover:bg-white transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Voltar para o app</span>
          </button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Diretório
          </h1>
          <p className="text-gray-600 text-xl font-light">
            Acesse e gerencie todas as conversas em um único lugar.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 mb-12">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Filter className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Filtro</h2>
                  <p className="text-sm text-gray-500 mt-1">Filtre suas conversas por diferentes critérios</p>
                </div>
              </div>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Apagar tudo
              </button>
            </div>

            <div className="space-y-4">
              {filterGroups.map((group, groupIndex) => (
                <div key={group.id} className="space-y-4">
                  {groupIndex > 0 && (
                    <div className="flex items-center my-8">
                      <div className="flex-1 border-t-2 border-gray-100"></div>
                      <span className="px-6 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-full mx-4">Ou</span>
                      <div className="flex-1 border-t-2 border-gray-100"></div>
                    </div>
                  )}
                  
                  {group.filters.map((filter, filterIndex) => (
                    <div key={filterIndex} className="flex items-center space-x-2">
                      <select
                        value={filter.field}
                        onChange={(e) => updateFilter(group.id, filterIndex, 'field', e.target.value)}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      >
                        {filterOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(group.id, filterIndex, 'operator', e.target.value)}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      >
                        {filterOptions
                          .find(opt => opt.value === filter.field)
                          ?.operators.map(op => (
                            <option key={op} value={op}>{op}</option>
                          ))}
                      </select>

                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => updateFilter(group.id, filterIndex, 'value', e.target.value)}
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Valor"
                      />

                      <button
                        onClick={() => removeFilter(group.id, filterIndex)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => addFilter(group.id)}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Adicionar filtro
                    </button>
                    {filterGroups.length > 1 && (
                      <button
                        onClick={() => removeFilterGroup(group.id)}
                        className="text-gray-500 hover:text-gray-700 text-sm hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                      >
                        Remover grupo
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addFilterGroup}
              className="mt-8 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar filtro agrupado
            </button>

            <div className="flex justify-end mt-8 space-x-4">
              <button className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancelar
              </button>
              <button className="px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                Aplicar filtro
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl border border-gray-100 border-b-0 mb-0 px-6">
          <div className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 relative ${
                  activeTab === tab
                    ? 'text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                } px-4 rounded-lg transition-colors min-w-fit whitespace-nowrap text-sm`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white border-x border-gray-100 px-6 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar Conversas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-2xl border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Remetente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Destinatário</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Caixa de entrada</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Usuários</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data criação</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Última mensagem</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tags</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockConversations.map((conv) => (
                  <tr key={conv.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{conv.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {conv.sender.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{conv.recipient}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        conv.inbox === 'PIN' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {conv.inbox}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {conv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex -space-x-2">
                        {conv.users.map((user, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                          >
                            <span className="text-xs font-medium text-gray-600">{user}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{conv.createdAt}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{conv.lastMessage}</td>
                    <td className="py-3 px-4">
                      {conv.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === conv.id ? null : conv.id);
                        }}
                      >
                        <div className="relative">
                          <MoreVertical className="w-5 h-5" />
                        </div>
                        <ActionMenu
                          isOpen={activeMenu === conv.id}
                          onClose={() => setActiveMenu(null)}
                          onMarkUnread={() => handleMarkUnread(conv.id)}
                          onHide={() => handleHideConversation(conv.id)}
                          onLeave={() => handleLeaveConversation(conv.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando resultados 1 - {mockConversations.length} de {mockConversations.length}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryPage;