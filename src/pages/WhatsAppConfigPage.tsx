import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import SettingsLayout from '../components/settings/SettingsLayout';
import { useNavigate } from 'react-router-dom';

const WhatsAppConfigPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Adicione o nº de WhatsApp',
      isActive: currentStep === 1,
      isCompleted: currentStep > 1,
      subtitle: 'Insira o número que você deseja conectar'
    },
    {
      number: 2,
      title: 'Crie um nome e uma descrição',
      isActive: currentStep === 2,
      isCompleted: currentStep > 2,
      subtitle: 'Identifique seu canal de WhatsApp'
    },
    {
      number: 3,
      title: 'Insira o código no celular',
      isActive: currentStep === 3,
      isCompleted: currentStep > 3,
      subtitle: 'Complete a verificação no seu dispositivo'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <SettingsLayout onBack={() => navigate('/app/integrations')}>
      <div className="max-w-4xl mx-auto px-8 py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="flex items-center space-x-3 text-sm mb-16">
          <div className="flex items-center space-x-3">
            <span 
              onClick={() => navigate('/app/integrations')}
              className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
            >
              Minhas integrações de canal
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span 
              onClick={() => navigate('/app/integrations')}
              className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
            >
              Adicionar integração de canal
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-blue-600 font-medium">Configuração WhatsApp Web</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex items-center relative">
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-medium shadow-lg ${
                step.isActive
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-4 ring-blue-100'
                  : step.isCompleted
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white ring-4 ring-green-100'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400'
              }`}>
                {step.number}
              </div>
              <div className="ml-4 flex-1 relative">
                <span className={`text-sm ${
                  step.isActive ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                <p className="text-xs text-gray-500 mt-1">{step.subtitle}</p>
                {step.isActive && (
                  <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-0.5 mx-6 ${
                  step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                } rounded-full transition-colors`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg space-y-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Conecte seu WhatsApp
          </h2>
          
          <div className="space-y-4">
            <label className="text-gray-700 text-base font-medium">
              Escolha o país e digite o número desejado
            </label>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center space-x-3 px-6 py-4 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50/50 hover:bg-gray-100 transition-colors">
                  <img
                    src="https://flagcdn.com/w40/br.png"
                    alt="Brazil"
                    className="w-8 h-5 object-cover rounded shadow-sm"
                  />
                  <span className="text-gray-900 font-medium">+55</span>
                </button>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="00 00000-0000"
                className="flex-1 px-6 py-4 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 text-gray-900 placeholder-gray-400 text-lg tracking-wide"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Este número será usado para receber e enviar mensagens através da API do WhatsApp
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => navigate('/app/integrations')}
            className="px-8 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-2 group"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-lg"
          >
            Próximo
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default WhatsAppConfigPage;