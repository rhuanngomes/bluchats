import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from './sidebar/Sidebar';
import WorkspaceSidebar from './sidebar/WorkspaceSidebar';
import ChatView from './chat/ChatView';
import EmptyState from './EmptyState';
import { conversationGroups } from '../data/mockData';

const Layout: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);
  const [conversations, setConversations] = useState(conversationGroups);
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

  const handleJoinConversation = (conversationId: string) => {
    setConversations(prevGroups => 
      prevGroups.map(group => {
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
  );
};

export default Layout;