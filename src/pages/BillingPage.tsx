import React from 'react';
import { CreditCard, Receipt, Building2, Zap, Shield, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BillingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto p-8">
        <button
          onClick={() => navigate('/app')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Voltar para o app</span>
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Faturamento
              </h1>
              <p className="text-gray-600">
                Gerencie seu plano, assinatura e métodos de pagamento
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">PRÓXIMA FATURA ESTIMADA</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">2 de Maio, 2025</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                R$ 238,00
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Preço não inclui impostos
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {/* Current Plan Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Seu plano atual</h2>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Gerenciar assinatura
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Plano Avançado</h3>
                  <div className="flex items-center">
                    <span className="text-blue-100">7 agentes em uso</span>
                    <span className="mx-2">•</span>
                    <span className="text-blue-100">R$ 34 por agente</span>
                    <button className="ml-3 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors">
                      Gerenciar agentes
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-1">R$ 238</div>
                  <div className="text-blue-100">Por empresa/mês</div>
                </div>
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Complementos disponíveis</h2>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    title: 'Chatbot Multinível',
                    description: 'Automatize respostas complexas',
                    price: '100',
                    icon: Zap,
                    trial: 14
                  },
                  {
                    title: 'Tags Personalizadas',
                    description: 'Organize suas conversas',
                    price: '100',
                    icon: Shield,
                    trial: 14
                  },
                  {
                    title: 'Disparo em Massa',
                    description: 'Envie mensagens segmentadas',
                    price: '100',
                    icon: Mail,
                    trial: 14
                  },
                  {
                    title: 'Lista de Transmissão',
                    description: 'Gerencie envios em massa',
                    price: '100',
                    icon: Building2,
                    trial: 14
                  }
                ].map((addon, index) => (
                  <div key={index} className="group relative bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-colors cursor-pointer">
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {addon.trial} dias grátis
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <addon.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.title}</h3>
                    <p className="text-gray-600 mb-4">{addon.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">R$ {addon.price}/mês</span>
                      <button className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrações</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Instagram', 'Telegram', 'Email', 'Discord'].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{integration}</span>
                      <button className="px-3 py-1.5 text-sm bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        + R$ 100/mês
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Método de Pagamento</h2>
                <button className="text-blue-600 hover:text-blue-700">Editar</button>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">•••• 3432</div>
                  <div className="text-sm text-gray-500">Expira em 03/28</div>
                </div>
              </div>
            </div>

            {/* Billing Contact */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Contato de Faturamento</h2>
                <button className="text-blue-600 hover:text-blue-700">Editar</button>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="font-medium text-gray-900 mb-1">CONSULTORIO P C LTDA</div>
                <div className="text-gray-600">financeiro@heypink.com</div>
              </div>
            </div>

            {/* Invoice History */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4">Histórico de Faturas</h2>
              <div className="space-y-3">
                {[
                  { id: '5592150', date: '2 de Abril, 2025', amount: '238' },
                  { id: '5592149', date: '2 de Março, 2025', amount: '238' },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500">#{invoice.id}</div>
                      <div className="font-medium text-gray-900">{invoice.date}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">R$ {invoice.amount}</span>
                      <Receipt className="w-5 h-5 text-blue-600 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;