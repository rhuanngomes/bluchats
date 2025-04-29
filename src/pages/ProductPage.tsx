import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, MessageCircle, Bot, BarChart2, Headphones, ArrowRight } from 'lucide-react';

const ProductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Bird className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-2xl font-medium text-blue-600">bluchats</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Plataforma completa para atendimento omnichannel
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Unifique todos os seus canais de comunicação em uma única plataforma e ofereça uma experiência excepcional aos seus clientes.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Começar agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Omnichannel</h2>
              <p className="text-gray-600 mb-6">
                Integre WhatsApp, Instagram, Facebook e outros canais em uma única interface. Gerencie todas as conversas de forma centralizada e eficiente.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  Unificação de canais
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  Histórico centralizado
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  Respostas rápidas
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Chatbots Inteligentes</h2>
              <p className="text-gray-600 mb-6">
                Automatize o atendimento com chatbots alimentados por IA. Ofereça respostas instantâneas e direcione clientes para o atendimento humano quando necessário.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                  Fluxos personalizáveis
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                  Integração com IA
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                  Transferência inteligente
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Avançado</h2>
              <p className="text-gray-600 mb-6">
                Monitore o desempenho do seu atendimento em tempo real. Obtenha insights valiosos para melhorar a experiência do cliente.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                  Dashboards personalizados
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                  Relatórios detalhados
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                  Métricas em tempo real
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Atendimento Humanizado</h2>
              <p className="text-gray-600 mb-6">
                Ferramentas completas para sua equipe oferecer o melhor atendimento. Organize, priorize e resolva demandas com eficiência.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                  Filas inteligentes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                  Gestão de equipes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                  Avaliação de satisfação
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para transformar seu atendimento?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece agora mesmo com 14 dias grátis. Sem compromisso.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Começar gratuitamente
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;