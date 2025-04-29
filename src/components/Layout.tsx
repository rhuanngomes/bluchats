import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from './sidebar/Sidebar';
import WorkspaceSidebar from './sidebar/WorkspaceSidebar';
import ChatView from './chat/ChatView';
import EmptyState from './EmptyState';
import SettingsLayout from './settings/SettingsLayout';
import MetricsPage from './settings/MetricsPage';
import { conversationGroups } from '../data/mockData';

const Layout: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);
  const [showSettings, setShowSettings] = useState(false);
  const [conversations, setConversations] = useState(conversationGroups);
  const [userStatus, setUserStatus] = useState<'online' | 'busy' | 'offline'>('online');
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const getSubscription = async () => {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (!error && data) {
        setSubscription(data);
      }
    };

    getSubscription();
  }, []);
  
  const findActiveConversation = () => {
    for (const group of conversations) {
      const conversation = group.conversations.find(conv => conv.id === activeConversationId);
      if (conversation) return conversation;
    }
    return undefined;
  };
  
  const activeConversation = findActiveConversation();
  
  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleStatusChange = async (status: 'online' | 'busy' | 'offline') => {
    setUserStatus(status);
    // Here you would typically update the status in your backend
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleJoinConversation = (conversationId: string) => {
    setConversations(prevGroups => 
      prevGroups.map(group => {
        // Find the conversation in the inbox group
        const conversationToMove = prevGroups
          .find(g => g.id === 'inbox')
          ?.conversations.find(conv => conv.id === conversationId);

        if (!conversationToMove) return group;

        return {
          ...group,
          conversations: group.id === 'inbox'
            ? group.conversations.filter(conv => conv.id !== conversationId)
            : group.id === 'all'
              ? [...group.conversations, { ...conversationToMove, status: 'active' }]
              : group.conversations,
          count: group.id === 'inbox'
            ? group.conversations.filter(conv => conv.id !== conversationId).length
            : group.id === 'all'
              ? group.conversations.length + 1
              : group.conversations.length
        };
      })
    );
    setActiveConversationId(conversationId);
  };
  
  return (
    showSettings ? (
      <SettingsLayout onBack={() => setShowSettings(false)}>
        <MetricsPage />
      </SettingsLayout>
    ) : (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <WorkspaceSidebar />
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r bg-white">
        {subscription && subscription.subscription_status && (
          <div className="px-4 py-2 bg-blue-50 text-blue-700 text-sm">
            Plano atual: {subscription.subscription_status === 'trialing' ? 'Período de teste' : 'Plano Blu'}
          </div>
        )}
        <Sidebar 
          conversationGroups={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onSettingsClick={handleToggleSettings}
        />
      </div>
      
      <div className="flex-grow bg-white">
        {activeConversation ? (
          <ChatView 
            conversation={activeConversation}
            onJoinConversation={handleJoinConversation}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
    )
  );
};

export default Layout;