import React, { useEffect, useRef } from 'react';
import { Message as MessageType, User } from '../../types';
import Message from './Message';
import { currentUser } from '../../data/mockData';

interface MessageListProps {
  messages: MessageType[];
  participants: User[];
  onReply: (message: MessageType) => void;
  onForward: (message: MessageType) => void;
  onPin: (message: MessageType) => void;
  onReact: (message: MessageType, reaction: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  participants,
  onReply,
  onForward,
  onPin,
  onReact
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSender = (senderId: string): User | undefined => {
    if (senderId === currentUser.id) return currentUser;
    return participants.find(p => p.id === senderId);
  };

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      {messages.map(message => (
        <Message
          key={message.id}
          message={message}
          isCurrentUser={message.senderId === currentUser.id}
          sender={getSender(message.senderId)}
          onReply={onReply}
          onForward={onForward}
          onPin={onPin}
          onReact={onReact}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;