import React, { useState } from 'react';
import { User, Mail, Shield, Key, Activity, Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.user_metadata?.full_name || 'Usuário'}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Membro desde {user?.created_at ? formatDate(user.created_at) : 'N/A'}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informações Pessoais</h2>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  defaultValue={user?.user_metadata?.full_name || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Para alterar o email, entre em contato com o suporte
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nome:</span>
                <span className="font-medium text-gray-900">
                  {user?.user_metadata?.full_name || 'Não informado'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status da conta:</span>
                <span className="text-green-600 font-medium">Ativa</span>
              </div>
            </div>
          )}
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Segurança</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Key className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Senha</p>
                  <p className="text-sm text-gray-500">Última alteração há 30 dias</p>
                </div>
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Alterar
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Autenticação 2FA</p>
                  <p className="text-sm text-gray-500">Segurança adicional</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Configurar
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Log de Atividades</p>
                  <p className="text-sm text-gray-500">Visualizar acessos recentes</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver logs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};