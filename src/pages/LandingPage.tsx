import React from 'react';
import { Bird, Globe, ChevronDown, MessageCircle, Shield, Zap, Users, Bot, Headphones, BarChart2, BookOpen, FileText, Newspaper, PlayCircle, Rocket, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../stripe-config';

interface NavDropdownProps {
  isOpen: boolean;
  items: {
    icon: React.FC<{ className?: string }>;
    title: string;
    description: string;
    path: string;
  }[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, items }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-lg rounded-xl border border-gray-100 py-6">
      <div className="px-6">
        <div className="grid grid-cols-2 gap-8">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                }
              }}
              className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <p className="text-base font-medium text-gray-900">{item.title}</p>
                  <span className="ml-2 px-1.5 py-0.5 text-[11px] font-medium bg-blue-100 text-blue-600 rounded-full whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = React.useState<'product' | 'resources' | null>(null);

  const productItems = [
    {
      icon: MessageCircle,
      title: 'Omnichannel',
      description: 'Unifique todos seus canais de comunicação',
      path: '/produto/omnichannel',
      badge: 'Em breve'
    },
    {
      icon: Bot,
      title: 'Chatbots',
      description: 'Automatize seu atendimento com IA',
      path: '/produto/chatbots',
      badge: 'Em breve',
      disabled: true
    },
    {
      icon: BarChart2,
      title: 'Analytics',
      description: 'Métricas e insights em tempo real',
      path: '/produto/analytics',
      badge: 'Em breve',
      disabled: true
    },
    {
      icon: Headphones,
      title: 'Atendimento',
      description: 'Ferramentas para suporte ao cliente',
      path: '/produto/atendimento'
    }
  ];

  const resourceItems = [
    {
      icon: BookOpen,
      title: 'Documentação',
      description: 'Guias e referências técnicas',
      path: '/recursos/documentacao',
      badge: 'Em breve',
      disabled: true
    },
    {
      icon: PlayCircle,
      title: 'Tutoriais',
      description: 'Vídeos e guias passo a passo',
      path: '/recursos/tutoriais',
      badge: 'Em breve',
      disabled: true
    },
    {
      icon: Newspaper,
      title: 'Blog',
      description: 'Artigos e novidades',
      path: '/recursos/blog',
      badge: 'Em breve',
      disabled: true
    },
    {
      icon: Rocket,
      title: 'Cases de Sucesso',
      description: 'Histórias de clientes',
      path: '/recursos/cases',
      badge: 'Em breve',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Bird className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-2xl font-medium text-blue-600">bluchats</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-600 hover:text-gray-900"
                  onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
                >
                  Produto
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <NavDropdown isOpen={activeDropdown === 'product'} items={productItems} />
              </div>
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-600 hover:text-gray-900"
                  onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                >
                  Recursos
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <NavDropdown isOpen={activeDropdown === 'resources'} items={resourceItems} />
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

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            CRM baseado em mensagens
          </h1>
          <h2 className="text-6xl font-bold text-blue-600 mb-8">
            Todas as formas de gerenciar seus clientes em um só app
          </h2>
          <Link
            to="/checkout"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Teste grátis por 14 dias
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Mais conversas trazem mais vendas
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Consiga mais clientes conectando os apps que eles amam. Sua nova{' '}
                <span className="text-blue-600">caixa de entrada</span> ajuda sua equipe a estar nos canais mais populares com facilidade.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-green-500">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  WhatsApp
                </div>
                <div className="flex items-center text-pink-500">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Instagram
                </div> 
                <div className="flex items-center text-indigo-900">
                  <Globe className="w-6 h-6 mr-2" />
                  Todos os canais
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-yellow-100 rounded-3xl p-8">
                <img 
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Dashboard"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Grid Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos que impulsionam seu negócio
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para gerenciar sua comunicação em um só lugar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Segurança Avançada',
                description: 'Proteção de dados e criptografia de ponta a ponta em todas as conversas',
              },
              {
                icon: Bot,
                title: 'Automação Inteligente',
                description: 'Bots personalizáveis para automatizar tarefas repetitivas e atendimento 24/7',
              },
              {
                icon: Users,
                title: 'Colaboração em Equipe',
                description: 'Trabalhe em conjunto com sua equipe de forma eficiente e organizada',
              },
              {
                icon: Zap,
                title: 'Respostas Rápidas',
                description: 'Templates e atalhos para responder clientes com agilidade',
              },
              {
                icon: Globe,
                title: 'Multi-canal',
                description: 'Integração com WhatsApp, Instagram, Facebook e outros canais populares',
              },
              {
                icon: MessageCircle,
                title: 'Chat Unificado',
                description: 'Todas as conversas em uma única interface intuitiva',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Histórias de sucesso de quem já transformou sua comunicação
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Silva',
                role: 'CEO, TechStart',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
                quote: 'O Blue Chat revolucionou a forma como nos comunicamos com nossos clientes. A produtividade aumentou em 300%.',
              },
              {
                name: 'João Santos',
                role: 'Gerente de Vendas, MegaStore',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                quote: 'A automação inteligente nos permite atender mais clientes com a mesma equipe. Simplesmente fantástico!',
              },
              {
                name: 'Ana Costa',
                role: 'Diretora de Marketing, InnovaCorp',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                quote: 'A integração multi-canal nos ajudou a estar presentes onde nossos clientes estão. Resultado: vendas duplicadas.',
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos e preços
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: products.bluMonthly.name,
                description: products.bluMonthly.description,
                price: products.bluMonthly.price,
              },
              {
                title: products.bluAnnual.name,
                description: products.bluAnnual.description,
                price: products.bluAnnual.price,
              },
            ].map((plan) => (
              <div key={plan.title} className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                  <span className="text-gray-600">/por usuário/mês</span>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Teste grátis
                </Link>
                <button className="w-full text-gray-600 underline mt-4">
                  Qual é o valor total?
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar sua comunicação?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece agora mesmo com 14 dias grátis. Sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-medium hover:bg-blue-50 transition-colors">
              Começar gratuitamente
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
              Falar com vendas
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Recursos</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Integrações</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Preços</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">API</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Sobre nós</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Blog</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Carreiras</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Contato</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Documentação</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Tutoriais</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Guias</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Webinars</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Privacidade</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Termos</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Segurança</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="hover:text-white">Cookies</a>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">Em breve</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <Bird className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-2xl font-medium text-blue-600">bluchats</span>
            </div>
            <p className="mt-4 md:mt-0">
              © {new Date().getFullYear()} bluchats. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;