import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  status?: string;
}

interface UserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (userId: string) => void;
  users: User[];
  selectedUsers?: string[];
  multiple?: boolean;
}

const UserSelectionModal: React.FC<UserSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  users,
  selectedUsers = [],
  multiple = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredUsers = users.filter(user => {
    // Filter by search query
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus = selectedStatus === 'all' 
      || (selectedStatus === 'online' && user.isOnline)
      || (selectedStatus === 'offline' && !user.isOnline)
      || (selectedStatus === 'busy' && user.status === 'busy');

    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Select Users</h2>
        </div>

        <div className="p-4 space-y-4">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="all">All users</option>
              <option value="online">Online users</option>
              <option value="busy">Busy users</option>
              <option value="offline">Offline users</option>
            </select>
          </div>

          <Input
            value={searchQuery}
            onChange={handleSearch}
            onRightIconClick={handleClearSearch}
            placeholder="Search users"
            leftIcon={<Search className="w-5 h-5" />}
            rightIcon={searchQuery ? <button className="text-gray-400 hover:text-gray-600">×</button> : undefined}
          />

          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                onClick={() => onSelectUser(user.id)}
                className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg ${
                  selectedUsers.includes(user.id) ? 'bg-blue-50' : ''
                }`}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  isOnline={user.isOnline}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    {user.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            {multiple ? 'Add Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionModal;