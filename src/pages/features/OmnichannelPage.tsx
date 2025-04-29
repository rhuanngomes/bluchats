import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, MessageCircle, Instagram, Mail, MessageSquare, ArrowRight, Check } from 'lucide-react';

const OmnichannelPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Bird className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-2xl font-medium text-blue-600">bluchats</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Unifique todos seus canais de comunicação
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Gerencie WhatsApp, Instagram, Email e outros canais em uma única plataforma poderosa e intuitiva.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Começar agora
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
                Todos os canais em um só lugar
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: MessageCircle,
                    title: 'WhatsApp Business API',
                    description: 'Conecte-se com seus clientes através do canal mais popular do Brasil'
                  },
                  {
                    icon: Instagram,
                    title: 'Instagram Direct',
                    description: 'Gerencie mensagens do Instagram sem sair da plataforma'
                  },
                  {
                    icon: Mail,
                    title: 'Email integrado',
                    description: 'Unifique suas caixas de entrada de email no mesmo lugar'
                  },
                  {
                    icon: MessageSquare,
                    title: 'Chat ao vivo',
                    description: 'Adicione chat em seu site para atendimento em tempo real'
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
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-8">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
                  alt="Platform Interface"
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
              Benefícios do atendimento omnichannel
            </h2>
            <p className="text-xl text-gray-600">
              Descubra como nossa solução pode transformar seu atendimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Aumente a produtividade',
                description: 'Atenda mais clientes em menos tempo com uma interface unificada'
              },
              {
                title: 'Melhore a experiência',
                description: 'Ofereça um atendimento consistente em todos os canais'
              },
              {
                title: 'Tome decisões melhores',
                description: 'Analise dados consolidados de todas as interações'
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
            Pronto para unificar seu atendimento?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Começar gratuitamente
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OmnichannelPage;