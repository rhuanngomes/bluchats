import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, BookOpen, PlayCircle, Newspaper, Rocket, ArrowRight, Search } from 'lucide-react';

const ResourcesPage: React.FC = () => {
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
              Central de Recursos
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Tudo que você precisa para aproveitar ao máximo a plataforma Blue Chat.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Documentação</h2>
              <p className="text-gray-600 mb-6">
                Guias detalhados, referências de API e exemplos práticos para implementar todas as funcionalidades.
              </p>
              <Link
                to="/recursos/documentacao"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                Explorar documentação
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <PlayCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tutoriais</h2>
              <p className="text-gray-600 mb-6">
                Vídeos e guias passo a passo para você aprender na prática como usar cada recurso.
              </p>
              <Link
                to="/recursos/tutoriais"
                className="inline-flex items-center text-purple-600 hover:text-purple-700"
              >
                Ver tutoriais
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Newspaper className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog</h2>
              <p className="text-gray-600 mb-6">
                Artigos, novidades e melhores práticas para melhorar seu atendimento ao cliente.
              </p>
              <Link
                to="/recursos/blog"
                className="inline-flex items-center text-green-600 hover:text-green-700"
              >
                Ler artigos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cases de Sucesso</h2>
              <p className="text-gray-600 mb-6">
                Histórias reais de empresas que transformaram seu atendimento com o Blue Chat.
              </p>
              <Link
                to="/recursos/cases"
                className="inline-flex items-center text-orange-600 hover:text-orange-700"
              >
                Ver cases
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Fique por dentro das novidades
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Receba dicas, tutoriais e atualizações diretamente no seu email.
            </p>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;