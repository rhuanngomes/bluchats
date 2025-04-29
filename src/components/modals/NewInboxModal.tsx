import React, { useState } from 'react';
import { X, Camera, Users, Tag, Eye, EyeOff, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NewInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const NewInboxModal: React.FC<NewInboxModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    avatar: '',
    tag: '',
    tagColor: '#3B82F6',
    managers: [] as User[],
    members: [] as User[],
    isHidden: false,
  });

  const users = [
    {
      id: '1',
      name: 'João Silva',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      role: 'Admin'
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      role: 'Manager'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      role: 'Agent'
    },
    {
      id: '4',
      name: 'Ana Costa',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      role: 'Agent'
    }
  ];

  const toggleManager = (user: User) => {
    setFormData(prev => ({
      ...prev,
      managers: prev.managers.find(m => m.id === user.id)
        ? prev.managers.filter(m => m.id !== user.id)
        : [...prev.managers, user]
    }));
  };

  const toggleMember = (user: User) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.find(m => m.id === user.id)
        ? prev.members.filter(m => m.id !== user.id)
        : [...prev.members, user]
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.name || !formData.tag || formData.managers.length === 0) {
        throw new Error('Por favor, preencha todos os campos obrigatórios');
      }

      // Upload avatar if provided
      let avatarUrl = null;
      if (formData.avatar) {
        const file = await (await fetch(formData.avatar)).blob();
        const fileExt = 'jpg';
        const fileName = `${Math.random()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatarUrl = publicUrl;
      }

      // Create inbox
      const { data: inbox, error: inboxError } = await supabase
        .from('inboxes')
        .insert({
          name: formData.name,
          description: formData.description,
          tag: formData.tag.toUpperCase(),
          tag_color: formData.tagColor,
          avatar_url: avatarUrl,
          is_hidden: formData.isHidden
        })
        .select()
        .single();

      if (inboxError) throw inboxError;

      // Add managers and members
      const members = [
        ...formData.managers.map(user => ({
          inbox_id: inbox.id,
          user_id: user.id,
          role: 'manager'
        })),
        ...formData.members.map(user => ({
          inbox_id: inbox.id,
          user_id: user.id,
          role: 'member'
        }))
      ];

      const { error: membersError } = await supabase
        .from('inbox_members')
        .insert(members);

      if (membersError) throw membersError;

      onSubmit?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar caixa de entrada');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Nova caixa de entrada</h2>
              <p className="text-gray-500 mt-1">Configure uma nova caixa de entrada para sua equipe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="px-8 pt-4">
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-1">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Inbox Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <Tag className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFormData({ ...formData, avatar: reader.result as string });
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da caixa de entrada
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Suporte Técnico"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: SUP"
                    maxLength={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cor da tag
                  </label>
                  <select
                    value={formData.tagColor}
                    onChange={(e) => setFormData({ ...formData, tagColor: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="#3B82F6" className="bg-blue-500">Azul</option>
                    <option value="#10B981" className="bg-green-500">Verde</option>
                    <option value="#EF4444" className="bg-red-500">Vermelho</option>
                    <option value="#F59E0B" className="bg-yellow-500">Amarelo</option>
                    <option value="#8B5CF6" className="bg-purple-500">Roxo</option>
                    <option value="#EC4899" className="bg-pink-500">Rosa</option>
                    <option value="#6B7280" className="bg-gray-500">Cinza</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Descreva o propósito desta caixa de entrada"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gerentes responsáveis
              </label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto bg-gray-50 rounded-xl p-2">
                {users.map(user => (
                  <label
                    key={user.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.managers.some(m => m.id === user.id)}
                      onChange={() => toggleManager(user)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Segure Ctrl (Windows) ou Command (Mac) para selecionar múltiplos gerentes
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Membros da equipe
              </label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto bg-gray-50 rounded-xl p-2">
                {users.map(user => (
                  <label
                    key={user.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.members.some(m => m.id === user.id)}
                      onChange={() => toggleMember(user)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isHidden"
              checked={formData.isHidden}
              onChange={(e) => setFormData({ ...formData, isHidden: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isHidden" className="text-sm text-gray-600 flex items-center">
              {formData.isHidden ? (
                <EyeOff className="w-4 h-4 mr-2 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 mr-2 text-gray-400" />
              )}
              Caixa de entrada oculta
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Criando...' : 'Criar caixa de entrada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInboxModal;