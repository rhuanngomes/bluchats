import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, Headphones, Users, Clock, MessageCircle, Shield, ArrowRight, Check, ChevronDown, Globe } from 'lucide-react';

const CustomerSupportPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Bird className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-2xl font-medium text-blue-600">bluchats</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <Link to="/produto" className="flex items-center text-gray-600 hover:text-gray-900">
                  Produto
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="relative">
                <Link to="/recursos" className="flex items-center text-gray-600 hover:text-gray-900">
                  Recursos
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <Link to="/precos" className="text-gray-600 hover:text-gray-900">
                Preços
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Globe className="w-5 h-5 mr-2" />
                PT
              </button>
              <button className="text-gray-900 hover:text-gray-700 px-4 py-2">
                Agendar demo
              </button>
              <Link
                to="/login"
                className="text-gray-900 hover:text-gray-700 px-4 py-2 border border-gray-200 rounded-full"
              >
                Iniciar sessão
              </Link> 
              <Link 
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Registre-se
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Ferramentas completas para atendimento ao cliente
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ofereça um suporte excepcional com recursos avançados de gerenciamento de equipe e atendimento.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors" 
            > 
              Fale com o nosso time
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Recursos essenciais para seu time
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: 'Gestão de equipe',
                    description: 'Organize sua equipe em departamentos e defina permissões específicas'
                  },
                  {
                    icon: Clock,
                    title: 'Horários de atendimento',
                    description: 'Configure horários e escalas de trabalho para cada agente'
                  },
                  {
                    icon: MessageCircle,
                    title: 'Filas inteligentes',
                    description: 'Distribua conversas automaticamente com base em regras personalizadas'
                  },
                  {
                    icon: Shield,
                    title: 'Monitoramento de qualidade',
                    description: 'Avalie o desempenho dos atendimentos e identifique pontos de melhoria'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Support Team"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefícios do nosso sistema de atendimento
            </h2>
            <p className="text-xl text-gray-600">
              Transforme a experiência dos seus clientes e equipe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Aumente a satisfação',
                description: 'Melhore o NPS com atendimento rápido e eficiente'
              },
              {
                title: 'Reduza custos',
                description: 'Otimize recursos com automação e gestão inteligente'
              },
              {
                title: 'Escale operações',
                description: 'Cresça sem perder qualidade no atendimento'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Pronto para melhorar seu atendimento?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Fale com o nosso time
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;