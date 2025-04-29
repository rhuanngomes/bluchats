import React from 'react';
import { Check, ChevronRight, Settings, User, LogOut } from 'lucide-react';

interface UserStatusMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: 'online' | 'busy' | 'offline') => void;
  onSettingsClick: () => void;
  onLogout: () => void;
  currentStatus: 'online' | 'busy' | 'offline';
}

const UserStatusMenu = React.memo<UserStatusMenuProps>(({
  isOpen,
  onClose,
  onStatusChange,
  onSettingsClick,
  onLogout,
  currentStatus
}) => {
  if (!isOpen) return null;

  const statusOptions = [
    { value: 'online', label: 'Disponível', color: 'bg-green-500' },
    { value: 'busy', label: 'Ocupado', color: 'bg-red-500' },
    { value: 'offline', label: 'Ausente', color: 'bg-gray-500' }
  ];

  return (
    <div className="status-menu absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
      {/* Status Options */}
      <div className="px-3 py-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Seu status
        </h3>
        {statusOptions.map((status) => (
          <button
            key={status.value}
            onClick={() => {
              onStatusChange(status.value as 'online' | 'busy' | 'offline');
              onClose();
            }}
            className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${status.color} mr-3`} />
            <span className="flex-grow text-sm text-gray-700">{status.label}</span>
            {currentStatus === status.value && (
              <Check className="w-4 h-4 text-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-100 my-2" />

      {/* Settings & Logout */}
      <div className="px-2">
        <button
          onClick={() => {
            onSettingsClick();
            onClose();
          }}
          className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
        >
          <Settings className="w-4 h-4 mr-3 text-gray-400" />
          Configurações
          <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
        </button>
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-red-600"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
});

UserStatusMenu.displayName = 'UserStatusMenu';

export default UserStatusMenu;