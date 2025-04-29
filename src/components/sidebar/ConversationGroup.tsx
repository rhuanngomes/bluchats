import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ConversationGroup as ConversationGroupType } from '../../types';
import ConversationItem from './ConversationItem';

interface ConversationGroupProps {
  group: ConversationGroupType;
  onSelectConversation: (conversationId: string) => void;
  activeConversationId?: string;
}

const ConversationGroup: React.FC<ConversationGroupProps> = ({
  group,
  onSelectConversation,
  activeConversationId,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { setNodeRef, isOver } = useDroppable({
    id: group.id,
    data: { type: 'group', id: group.id },
  });

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`mb-2 ${isOver ? 'bg-gray-100' : ''}`}>
      <button
        onClick={toggleExpand}
        className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2" />
        )}
        <span className="flex items-center">
          {group.name}
          <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
            {group.count}
          </span>
        </span>
      </button>
      
      {isExpanded && (
        <div ref={setNodeRef} className="mt-1">
          <SortableContext
            items={group.conversations.map(c => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {group.conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                onClick={() => onSelectConversation(conversation.id)}
              />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
};

export default ConversationGroup;