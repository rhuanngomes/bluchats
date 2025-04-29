import React, { useEffect, useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EmptyState: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (profile?.full_name) {
          setUserName(profile.full_name.split(' ')[0]);
        }
      }
    };

    getProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500">
      <div className="flex flex-col items-center max-w-md text-center p-6">
        <div className="bg-blue-100 p-4 rounded-full mb-6">
          <MessageSquare className="w-12 h-12 text-blue-600" />
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-900">
            {userName ? `Bem-vindo de volta, ${userName}!` : 'Bem-vindo de volta!'}
          </h3>
        </div>
        <p className="text-gray-600">
          Selecione uma conversa ao lado para começar a enviar mensagens ou criar uma nova conversa.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;