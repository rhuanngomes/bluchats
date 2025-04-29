import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bird, ArrowRight, ChevronDown, Globe } from 'lucide-react';
import { products } from '../stripe-config';
import { createCheckoutSession } from '../lib/stripe';

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (productId: keyof typeof products) => {
    setLoading(true);
    try {
      navigate('/checkout');
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Escolha o plano ideal para seu negócio
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Todos os planos incluem 14 dias de teste grátis
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-lg ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-2 rounded-lg ${
                  billingPeriod === 'annual'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Anual
                <span className="ml-2 text-sm text-green-600">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: 'bluMonthly',
                title: products.bluMonthly.name,
                description: products.bluMonthly.description,
                price: products.bluMonthly.price,
              },
              {
                id: 'bluAnnual',
                title: products.bluAnnual.name,
                description: products.bluAnnual.description,
                price: products.bluAnnual.price,
              },
            ].map((plan) => (
              <div key={plan.title} className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-gray-600 mb-8">{plan.description}</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">{plan.price} BRL</span>
                  <span className="text-gray-600">/por usuário/mês</span>
                </div>
                <button 
                  onClick={() => handleSubscribe(plan.id as keyof typeof products)}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Teste grátis
                </button>
                <button className="w-full text-gray-600 underline mt-4">
                  Qual é o valor total?
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-8">
            {[
              {
                question: 'Posso trocar de plano depois?',
                answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações serão refletidas na sua próxima fatura.'
              },
              {
                question: 'Como funciona o período de teste?',
                answer: 'Você tem 14 dias para testar todos os recursos do plano escolhido. Não é necessário cartão de crédito durante o teste.'
              },
              {
                question: 'Preciso me comprometer por quanto tempo?',
                answer: 'Não há compromisso de permanência. Você pode cancelar sua assinatura a qualquer momento sem multas.'
              },
              {
                question: 'Quais formas de pagamento são aceitas?',
                answer: 'Aceitamos cartões de crédito, boleto bancário e PIX. Para planos empresariais, também oferecemos faturamento.'
              }
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Falar com consultor
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;