@@ .. @@
   const [showActions, setShowActions] = React.useState(false);
   const mainParticipant = conversation.participants[0];
  const menuRef = React.useRef<HTMLDivElement>(null);
   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
     id: conversation.id,
     data: conversation,
   });

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

   const style = {
     transform: CSS.Transform.toString(transform || ''),
     transition: transition || '',
     opacity: isDragging ? 0.5 : undefined
   };
   
   const getChannelIcon = () => {
     switch (conversation.channel) {
       case 'whatsapp':
         return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
       case 'instagram':
         return <Instagram className="w-4 h-4 text-[#E4405F]" />;
       default:
         return <MessageSquare className="w-4 h-4 text-gray-400" />;
     }
   };

+  const handleActionClick = (e: React.MouseEvent) => {
+    e.stopPropagation();
+    setShowActions(!showActions);
+  };

   return (
     <div
       ref={setNodeRef}
       style={style}
       onClick={onClick}
       className={`group relative flex items-center px-4 py-3 cursor-pointer transition-colors ${
         isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
       } ${transform ? 'opacity-50' : ''}`}
     >
-      <DragHandle attributes={attributes} listeners={listeners} />
-      <button
-        onClick={(e) => { e.stopPropagation(); setShowActions(!showActions); }}
-        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 z-20"
-      >
-        <MoreVertical className="w-5 h-5" />
-      </button>
+      <div className="flex-1 min-w-0">
+        <div className="flex justify-between items-start">
+          <div className="font-medium text-gray-900 truncate">
+            <div className="flex items-center space-x-2">
+              <span>{mainParticipant?.name}</span>
+              {mainParticipant?.status === 'busy' && (
+                <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
+                  Ocupado
+                </span>
+              )}
+            </div>
+            {conversation.tags && conversation.tags.length > 0 && (
+              <div className="flex mt-1 space-x-1">
+                {conversation.tags.map(tag => (
+                  <Badge key={tag.id} color={tag.color} size="sm" variant="outline">
+                    {tag.name}
+                  </Badge>
+                ))}
+              </div>
+            )}
+          </div>
+          <div className="flex items-center space-x-2">
+            <div className="flex items-center space-x-1 text-xs text-gray-500 whitespace-nowrap">
+              {getChannelIcon()}
+              <span className="text-[11px]">{conversation.lastMessage && formatDate(conversation.lastMessage.timestamp)}</span>
+            </div>
+            <div className="relative">
+              <button
+                onClick={handleActionClick}
+                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
+              >
+                <MoreVertical className="w-4 h-4" />
+              </button>
+              <ActionMenu
+                isOpen={showActions}
+                onClose={() => setShowActions(false)}
+                onMarkUnread={onMarkUnread}
+                onHide={onHide}
+                onLeave={onLeave}
+              />
+            </div>
+          </div>
+        </div>
+        
+        <div className="flex justify-between items-center mt-1">
+          <div className="text-sm text-gray-600 truncate max-w-[70%]">
+            {conversation.lastMessage?.content || 'No messages yet'}
+          </div>
+          
+          <div className="flex items-center space-x-1">
+            {conversation.unread > 0 && (
+              <Badge color="#25D366" size="sm">
+                <span className="px-1">{conversation.unread}</span>
+              </Badge>
+            )}
+          </div>
+        </div>
+      </div>
+      <DragHandle attributes={attributes} listeners={listeners} />
       <ActionMenu
         isVisible={showActions}
         onHide={onHide}
         onMarkUnread={onMarkUnread}
         onLeave={onLeave}
       />
     </div>
   );
 });

 ConversationItem.displayName = 'ConversationItem';
 export default ConversationItem;