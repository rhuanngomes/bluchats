import React from 'react';
import SettingsLayout from '../components/settings/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Users, Clock, MessageSquare } from 'lucide-react';

const MetricsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SettingsLayout onBack={() => navigate('/app')}>
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <BarChart2 className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Métricas</h1>
            <p className="text-gray-600">
              Acompanhe a comunicação do seu negócio de forma simples e direta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total de conversas', value: '156', icon: MessageSquare, color: 'blue' },
            { label: 'Agentes ativos', value: '45', icon: Users, color: 'green' },
            { label: 'Tempo médio de resposta', value: '2m 30s', icon: Clock, color: 'purple' },
            { label: 'Taxa de resolução', value: '94%', icon: BarChart2, color: 'orange' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Visão geral do período</h2>
          <p className="text-gray-600">
            Mais métricas e gráficos serão adicionados em breve.
          </p>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default MetricsPage;