import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    from: string;
    to: string;
    inbox: string;
    name?: string;
    description?: string;
  }) => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    inbox: '',
    name: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Criar atendimento</h2>
            <p className="text-sm text-gray-500 mt-1">Inicie uma nova conversa com um cliente</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">De</label>
              <div className="relative">
                <select
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none hover:border-gray-300 transition-colors"
                >
                  <option value="">Selecione um agente</option>
                  <option value="1">João Silva</option>
                  <option value="2">Maria Santos</option>
                  <option value="3">Pedro Oliveira</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">A</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Para</label>
              <div className="flex">
                <div className="flex items-center space-x-2 px-4 py-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">BR</span>
                  </div>
                  <span className="text-sm text-gray-600">+55</span>
                </div>
                <input
                  type="tel"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  placeholder="Digite o número do WhatsApp"
                  className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Canal</label>
              <div className="relative">
                <select
                  value={formData.inbox}
                  onChange={(e) => setFormData({ ...formData, inbox: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none hover:border-gray-300 transition-colors"
                >
                  <option value="">Selecione um canal</option>
                  <option value="whatsapp">WhatsApp Principal</option>
                  <option value="whatsapp2">WhatsApp Vendas</option>
                  <option value="instagram">Instagram</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">W</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Nome da conversa</label>
                <span className="text-xs text-gray-400">Opcional</span>
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Atendimento João Silva"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Descrição interna</label>
                <span className="text-xs text-gray-400">Opcional</span>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Adicione notas ou observações sobre esta conversa"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors text-sm"
            >
              Criar conversa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConversationModal;