import React, { useState } from 'react';
import { Smile, Paperclip, Send, Reply, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  replyingTo?: MessageType | null;
  onCancelReply?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  replyingTo,
  onCancelReply 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-adjust height
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">
      {replyingTo && (
        <div className="mb-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Reply className="w-4 h-4 mr-2" />
              <span>Respondendo mensagem</span>
            </div>
            <button 
              onClick={onCancelReply}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="mt-2 pl-6 text-sm text-gray-500 line-clamp-2">
            {replyingTo.content}
          </div>
        </div>
      )}
      <div className="flex items-end gap-2">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Smile className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress}
          placeholder="Digite uma mensagem"
          rows={1}
          className="flex-1 py-2.5 px-4 bg-gray-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500 min-h-[40px] max-h-[120px] leading-relaxed"
        />
        
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`p-2.5 rounded-full transition-colors ${
            message.trim()
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;