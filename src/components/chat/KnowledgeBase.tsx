import React, { useState } from 'react';
import { Search, ChevronLeft, Plus, Clock, Star, Copy, Sparkles } from 'lucide-react';

interface QuickResponse {
  id: string;
  title: string;
  content: string;
  category?: 'greeting' | 'sales' | 'support';
  usageCount?: number;
  isFavorite?: boolean;
}

interface KnowledgeBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockResponses: QuickResponse[] = [
  {
    id: '1',
    title: 'dia',
    content: 'Bom dia! Tudo bem? Sou o Rhuann aqui da Pink, como posso ajudar?',
    category: 'greeting',
    usageCount: 150,
    isFavorite: true
  },
  {
    id: '2',
    title: 'tarde',
    content: 'Boa tarde! Tudo bem? Sou o Rhuann aqui da Pink, como posso ajudar?',
    category: 'greeting',
    usageCount: 120
  },
  {
    id: '3',
    title: 'plano',
    content: 'Pra 1 número de WhatsApp e até 10 pessoas usando, o valor é R$238/mês',
    category: 'sales',
    usageCount: 89,
    isFavorite: true
  },
  {
    id: '4',
    title: 'Fechamento',
    content: 'Para continuarmos, só preciso alinhar com você alguns detalhes',
    category: 'sales',
    usageCount: 45
  },
  {
    id: '5',
    title: 'asaas',
    content: 'Pink com 1 número + 10 usuários (R$238/mês)',
    category: 'sales',
    usageCount: 34
  },
  {
    id: '6',
    title: 'noite',
    content: 'Boa noite! Tudo bem? Sou o Rhuann aqui da Pink, como posso ajudar?',
    category: 'greeting',
    usageCount: 78
  }
];

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [responses, setResponses] = useState<QuickResponse[]>(mockResponses);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'greeting', label: 'Saudações' },
    { id: 'sales', label: 'Vendas' },
    { id: 'support', label: 'Suporte' }
  ];

  const filteredResponses = responses
    .filter(response => 
      (activeCategory === 'all' || response.category === activeCategory) &&
      (response.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       response.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));

  const handleCopy = (response: QuickResponse) => {
    navigator.clipboard.writeText(response.content);
    setCopiedId(response.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    setResponses(prev => 
      prev.map(response => 
        response.id === id 
          ? { ...response, isFavorite: !response.isFavorite }
          : response
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-900 shadow-xl z-50 flex flex-col animate-slide-left">
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium ml-2 text-gray-100">Respostas Rápidas</h2>
        </div>
        <button className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-800">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar respostas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredResponses.map((response) => (
          <div 
            key={response.id}
            className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors group"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFavorite(response.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      response.isFavorite 
                        ? 'text-yellow-400 bg-yellow-400/10' 
                        : 'text-gray-500 hover:text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={response.isFavorite ? "currentColor" : "none"} />
                  </button>
                  <h3 className="font-medium text-gray-200">{response.title}</h3>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{response.usageCount}x</span>
                </div>
              </div>
              
              <div 
                onClick={() => handleCopy(response)}
                className="relative p-3 bg-gray-800 rounded-lg cursor-pointer group"
              >
                <div className="text-gray-300 text-sm">
                  {response.content}
                </div>
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-900/80 transition-opacity rounded-lg ${
                  copiedId === response.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Copy className="w-5 h-5" />
                    <span className="font-medium">
                      {copiedId === response.id ? 'Copiado!' : 'Copiar'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>Nova resposta rápida</span>
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBase;