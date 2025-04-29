import React from 'react';
import { HelpCircle, TrendingUp, Users, Clock, MessageSquare, ArrowDown, ArrowUp, Calendar, Download, BarChart2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { useState, useEffect } from 'react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

interface MetricsData {
  totalConversations: number;
  waiting: number;
  inProgress: number;
  abandoned: number;
  finished: number;
  resolutionRate: number;
  newVisits: number;
  returningVisits: number;
  busiestDay: string;
  avgTriageTime: string;
  avgReturnTime: string;
  avgConversationTime: string;
  avgFirstResponseTime: string;
}

interface DateRange {
  start: Date;
  end: Date;
}

const MetricsPage = () => {
  const [dateFilter, setDateFilter] = useState<'today' | 'yesterday' | 'week' | 'month' | 'custom'>('today');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date()
  });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [metrics, setMetrics] = useState<MetricsData>({
    totalConversations: 68326,
    waiting: 5613,
    inProgress: 3205,
    abandoned: 3127,
    finished: 0,
    resolutionRate: 70,
    newVisits: 0,
    returningVisits: 0,
    busiestDay: 'Segunda-feira',
    avgTriageTime: '00:00:00',
    avgReturnTime: '00:00:00',
    avgConversationTime: '00:00:00',
    avgFirstResponseTime: '00:00:00'
  });

  useEffect(() => {
    // Simulate API call to fetch metrics based on date filter
    const fetchMetrics = () => {
      let newMetrics = { ...metrics };
      
      switch (dateFilter) {
        case 'today':
          newMetrics = {
            ...metrics,
            totalConversations: 1250,
            waiting: 125,
            inProgress: 85,
            abandoned: 45,
            finished: 995,
            resolutionRate: 85
          };
          break;
        case 'yesterday':
          newMetrics = {
            ...metrics,
            totalConversations: 2150,
            waiting: 215,
            inProgress: 145,
            abandoned: 75,
            finished: 1715,
            resolutionRate: 82
          };
          break;
        case 'week':
          newMetrics = {
            ...metrics,
            totalConversations: 15250,
            waiting: 1525,
            inProgress: 850,
            abandoned: 450,
            finished: 12425,
            resolutionRate: 78
          };
          break;
        case 'month':
          newMetrics = {
            ...metrics,
            totalConversations: 68326,
            waiting: 5613,
            inProgress: 3205,
            abandoned: 3127,
            finished: 56381,
            resolutionRate: 70
          };
          break;
        case 'custom':
          // Calculate metrics based on custom date range
          const diffDays = Math.ceil((customDateRange.end.getTime() - customDateRange.start.getTime()) / (1000 * 60 * 60 * 24));
          newMetrics = {
            ...metrics,
            totalConversations: Math.round(2150 * diffDays),
            waiting: Math.round(215 * diffDays),
            inProgress: Math.round(145 * diffDays),
            abandoned: Math.round(75 * diffDays),
            finished: Math.round(1715 * diffDays),
            resolutionRate: 80
          };
          break;
      }

      setMetrics(newMetrics);
    };

    fetchMetrics();
  }, [dateFilter, customDateRange]);

  const handleDateFilterChange = (filter: typeof dateFilter) => {
    setDateFilter(filter);
    if (filter === 'custom') {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-6">
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
        <button className="ml-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Exportar relatório</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-10">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select 
            value={dateFilter}
            onChange={(e) => handleDateFilterChange(e.target.value as typeof dateFilter)}
            className="bg-white border border-gray-200 rounded-xl pl-10 pr-8 py-3 text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors min-w-[180px]"
          >
            <option value="today">Hoje</option>
            <option value="yesterday">Ontem</option>
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        
        {showCustomDatePicker && (
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={customDateRange.start.toISOString().split('T')[0]}
              onChange={(e) => setCustomDateRange(prev => ({
                ...prev,
                start: new Date(e.target.value)
              }))}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm"
            />
            <span className="text-gray-500">até</span>
            <input
              type="date"
              value={customDateRange.end.toISOString().split('T')[0]}
              onChange={(e) => setCustomDateRange(prev => ({
                ...prev,
                end: new Date(e.target.value)
              }))}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm"
            />
          </div>
        )}

        <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm hover:border-gray-300 transition-colors min-w-[160px]">
          Todos os canais
        </button>
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm hover:border-gray-300 transition-colors min-w-[160px]">
          Todas as equipes
        </button>
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm hover:border-gray-300 transition-colors min-w-[160px]">
          Todos os agentes
        </button>
      </div>

      <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Stats */}
          <div className="col-span-5">
            <h2 className="text-2xl font-semibold mb-6">Visão geral do período</h2>
            <div>
              <div className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                {metrics.totalConversations.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-500 mb-1">Em espera</div>
                  <div className="text-2xl font-bold text-gray-900">{metrics.waiting.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-500 mb-1">Em andamento</div>
                  <div className="text-2xl font-bold text-gray-900">{metrics.inProgress.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-500 mb-1">Abandonadas</div>
                  <div className="text-2xl font-bold text-gray-900">{metrics.abandoned.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="text-sm text-gray-500 mb-1">Finalizadas</div>
                  <div className="text-2xl font-bold text-gray-900">{metrics.finished.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="col-span-7 flex items-start space-x-8">
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Taxa de resolução</h3>
                    <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
                  </div>
                </div>
                <div className="h-[200px]">
                  <Line
                    data={{
                      labels: Array.from({ length: 30 }, (_, i) => i + 1),
                      datasets: [{
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * (90 - 70) + 70)),
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { 
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: '#FFFFFF',
                          titleColor: '#1F2937',
                          bodyColor: '#1F2937',
                          borderColor: '#E5E7EB',
                          borderWidth: 1,
                          padding: 12,
                          displayColors: false,
                          titleFont: { size: 14, weight: '600' },
                          bodyFont: { size: 13 },
                          callbacks: {
                            label: (context) => `${context.parsed.y}% taxa de resolução`
                          }
                        }
                      },
                      scales: {
                        x: { 
                          display: true,
                          grid: { display: false },
                          ticks: {
                            font: { size: 11 },
                            color: '#6B7280'
                          }
                        },
                        y: {
                          display: true,
                          min: 60,
                          max: 100,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.03)',
                            drawBorder: false
                          },
                          ticks: {
                            callback: value => `${value}%`,
                            font: { size: 11 },
                            color: '#6B7280'
                          }
                        }
                      },
                      interaction: {
                        intersect: false,
                        mode: 'index'
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Variação da taxa</h3>
                    <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="h-48">
                  <Line
                    data={{
                      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                      datasets: [{
                        data: [75, 82, 78, 85, 80, 83, 85],
                        borderColor: 'rgba(37, 99, 235, 0.8)',
                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointBackgroundColor: '#FFFFFF',
                        pointBorderColor: '#2563EB',
                        pointBorderWidth: 1.5,
                        pointHoverBackgroundColor: '#2563EB',
                        pointHoverBorderColor: '#FFFFFF',
                        pointHoverBorderWidth: 2,
                        pointHoverRadius: 6,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: '#FFFFFF',
                          titleColor: '#1F2937',
                          bodyColor: '#1F2937',
                          borderColor: '#E5E7EB',
                          borderWidth: 1,
                          padding: 12,
                          displayColors: false,
                          titleFont: { size: 14, weight: '600' },
                          bodyFont: { size: 13 },
                          callbacks: {
                            label: (context) => `${context.parsed.y}% taxa de resolução`
                          }
                        }
                      },
                      scales: {
                        y: {
                          min: 0,
                          max: 100,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.03)',
                            drawBorder: false,
                          },
                          ticks: {
                            callback: value => `${value}%`,
                            font: { size: 11 },
                            padding: 8,
                          }
                        },
                        x: {
                          grid: { display: false },
                          ticks: {
                            font: { size: 11 },
                            padding: 8,
                          }
                        }
                      },
                      interaction: {
                        intersect: false,
                        mode: 'index'
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 my-12">
          {['Novas visitas', 'Visitas que retornaram', 'Dia mais movimentado'].map((title, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {metrics.newVisits}
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {metrics.returningVisits}
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {metrics.busiestDay}
                </span>
                <div className="text-right">
                  <div className={`flex items-center text-sm ${metrics.newVisits > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metrics.newVisits > 0 ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    25%
                  </div>
                  <div className={`flex items-center text-sm ${metrics.returningVisits > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metrics.returningVisits > 0 ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    25%
                  </div>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    25%
                  </div>
                  <div className="text-xs text-gray-500">vs. última 6ª feira</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8">
          {[
            { title: 'Tempo médio em triagem', icon: Clock },
            { title: 'Tempo de visitas que retornam', icon: Users },
            { title: 'Tempo médio em conversa', icon: MessageSquare },
            { title: 'Tempo médio da resposta inicial', icon: TrendingUp }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center mr-3">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                </div>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {metrics.avgTriageTime}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Análise detalhada</h2>
              <p className="text-gray-500 mt-1">Análise individual do desempenho da equipe</p>
            </div>
            <div className="flex items-center space-x-2">
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm">
                <option>Últimas 24 horas</option>
                <option>Última semana</option>
                <option>Último mês</option>
              </select>
              <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                name: 'Adir',
                email: 'adir@gmail.com',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                stats: {
                  conversations: 156,
                  avgResponseTime: '1m 30s',
                  satisfaction: 98,
                  resolution: 92
                },
                activity: [65, 45, 75, 50, 85, 70, 90]
              },
              {
                name: 'Administrator',
                email: 'rc_admin@heypink.com',
                avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
                stats: {
                  conversations: 243,
                  avgResponseTime: '45s',
                  satisfaction: 96,
                  resolution: 95
                },
                activity: [85, 90, 75, 85, 90, 95, 88]
              },
              {
                name: 'Adonai',
                email: 'adonai.costa@gmail.com',
                avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
                stats: {
                  conversations: 198,
                  avgResponseTime: '2m 15s',
                  satisfaction: 94,
                  resolution: 89
                },
                activity: [75, 80, 85, 75, 70, 85, 90]
              },
            ].map((user, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Conversas</div>
                      <div className="text-2xl font-bold text-gray-900">{user.stats.conversations}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Tempo médio</div>
                      <div className="text-2xl font-bold text-gray-900">{user.stats.avgResponseTime}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Satisfação</div>
                      <div className="text-2xl font-bold text-green-600">{user.stats.satisfaction}%</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Resolução</div>
                      <div className="text-2xl font-bold text-blue-600">{user.stats.resolution}%</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-700">Atividade recente</h4>
                      <div className="text-xs text-gray-500">Últimos 7 dias</div>
                    </div>
                    <div className="h-[100px]">
                      <Line
                        data={{
                          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                          datasets: [{
                            data: user.activity,
                            borderColor: '#3B82F6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 2,
                            pointRadius: 0,
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          scales: {
                            x: { display: false },
                            y: { display: false }
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver relatório completo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;