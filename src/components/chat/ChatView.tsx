import React, { useState } from 'react';
import { Conversation, Message as MessageType } from '../../types';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { currentUser, mockConversations } from '../../data/mockData';
import Button from '../ui/Button';

interface ChatViewProps {
  conversation: Conversation;
  onJoinConversation?: (conversationId: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ conversation, onJoinConversation }) => {
  const [messages, setMessages] = useState<MessageType[]>(conversation.messages);
  const [hasJoined, setHasJoined] = useState(conversation.status !== 'inbox');
  const [replyingTo, setReplyingTo] = useState<MessageType | null>(null);
  const [viewers] = useState(['John', 'Sarah', 'Mike']); // This would come from your backend in a real app
  const mainParticipant = conversation.participants[0];
  const [forwardedMessage, setForwardedMessage] = useState<MessageType | null>(null);
  const isPreview = conversation.status === 'inbox';
  const [isJoining, setIsJoining] = useState(false);

  const handleReplyMessage = (message: MessageType) => {
    setReplyingTo(message);
  };

  const handleForwardMessage = (message: MessageType) => {
    setForwardedMessage(message);
  };

  const handlePinMessage = (message: MessageType) => {
    // In a real app, this would update the message's pinned status in the database
    console.log('Pin message:', message);
  };

  const handleReactMessage = (message: MessageType, reaction: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id
          ? {
              ...msg,
              reactions: [...(msg.reactions || []), reaction]
            }
          : msg
      )
    );
  };

  const handleJoinConversation = () => {
    if (!onJoinConversation) return;
    
    setIsJoining(true);
    // Simulate API call delay
    setTimeout(() => {
      onJoinConversation(conversation.id);
      setHasJoined(true);
      setIsJoining(false);
    }, 500);
  };

  const handleSendMessage = (content: string) => {
    // Create new message with reply reference if replying
    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      status: 'sent',
      type: 'text',
      replyTo: replyingTo
    };
    
    setMessages([...messages, newMessage]);
    setReplyingTo(null); // Clear reply state
    
    // Simulate message being delivered after a short delay
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
    }, 1000);
    
    // Simulate message being read after a longer delay
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' } 
            : msg
        )
      );
    }, 2000);
  };

  const handleForwardToConversations = (conversationIds: string[]) => {
    if (!forwardedMessage) return;
    
    // Create new message for each selected conversation
    conversationIds.forEach(conversationId => {
      const newMessage: MessageType = {
        id: `msg-${Date.now()}-${conversationId}`,
        senderId: currentUser.id,
        content: forwardedMessage.content,
        timestamp: new Date(),
        status: 'sent',
        type: 'text',
        metadata: {
          forwarded: true,
          originalMessage: {
            id: forwardedMessage.id,
            senderId: forwardedMessage.senderId,
            timestamp: forwardedMessage.timestamp
          }
        }
      };
      
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // Simulate message being delivered
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' } 
              : msg
          )
        );
      }, 1000);
      
      // Simulate message being read
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'read' } 
              : msg
          )
        );
      }, 2000);
    });
    
    setForwardedMessage(null);
  };
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader participant={mainParticipant} tags={conversation.tags} />
      
      <MessageList
        messages={messages}
        participants={conversation.participants}
        onReply={handleReplyMessage}
        onForward={handleForwardMessage}
        onPin={handlePinMessage}
        onReact={handleReactMessage}
        isPreview={!hasJoined}
      />
      
      {!hasJoined ? (
        <div className="border-t border-gray-200 bg-white">
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {viewers.map((viewer, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center"
                    title={viewer}
                  >
                    <span className="text-sm font-medium text-indigo-600">
                      {viewer[0].toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="ml-3">
                <span className="text-sm text-gray-600">
                  {viewers.length} pessoas visualizando
                </span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <Button
              variant="primary"
              onClick={handleJoinConversation}
              disabled={isJoining}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-green-500/20 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center">
                {isJoining ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </>
                ) : (
                  'Entrar na conversa'
                )}
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <MessageInput 
          onSendMessage={handleSendMessage}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
        />
      )}
    </div>
  );
};

export default ChatView;