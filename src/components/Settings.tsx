import React, { useState } from 'react';
import { Bell, Database, Palette, Download, Upload, Shield, Globe, Link, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Goodreads Integration
    goodreadsConnected: false,
    goodreadsUsername: '',
    goodreadsApiKey: '',
    
    // Notification Settings
    emailNotifications: true,
    readingReminders: true,
    wishlistAlerts: false,
    weeklyReports: true,
    
    // Privacy Settings
    profilePublic: false,
    shareReadingStats: true,
    
    // App Preferences
    language: 'pt-BR',
    theme: 'light',
    defaultView: 'grid',
    booksPerPage: 12,
  });

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoodreadsConnect = () => {
    if (settings.goodreadsConnected) {
      // Desconectar
      setSettings(prev => ({
        ...prev,
        goodreadsConnected: false,
        goodreadsUsername: '',
        goodreadsApiKey: ''
      }));
    } else {
      // Simular conexão com Goodreads
      console.log('Conectando com Goodreads...');
      // Aqui você implementaria a lógica real de OAuth do Goodreads
      setSettings(prev => ({
        ...prev,
        goodreadsConnected: true,
        goodreadsUsername: 'usuario_exemplo'
      }));
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Implementar lógica de salvamento
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Implementar exportação
  };

  const handleImportData = () => {
    console.log('Importing data...');
    // Implementar importação
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-600 mt-1">Personalize sua experiência na BookLib</p>
        </div>
      </div>

      {/* Goodreads Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="w-5 h-5" />
            <span>Integração com Goodreads</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium">Conectar conta do Goodreads</h4>
              <p className="text-sm text-slate-600">
                {settings.goodreadsConnected 
                  ? `Conectado como @${settings.goodreadsUsername}` 
                  : 'Conecte sua conta para importar dados e buscar livros automaticamente'
                }
              </p>
            </div>
            <Button 
              onClick={handleGoodreadsConnect}
              variant={settings.goodreadsConnected ? "destructive" : "default"}
            >
              {settings.goodreadsConnected ? 'Desconectar' : 'Conectar'}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {settings.goodreadsConnected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Conta conectada com sucesso!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Agora você pode buscar livros do Goodreads ao adicionar novos títulos à sua biblioteca.
              </p>
            </div>
          )}

          {!settings.goodreadsConnected && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Benefícios da integração:</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Busca automática de informações dos livros</li>
                <li>• Preenchimento automático de formulários</li>
                <li>• Sincronização de avaliações e resenhas</li>
                <li>• Importação de listas de leitura</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por Email</p>
                <p className="text-sm text-slate-600">Receber atualizações importantes</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Lembretes de Leitura</p>
                <p className="text-sm text-slate-600">Notificações para manter o hábito</p>
              </div>
              <Switch
                checked={settings.readingReminders}
                onCheckedChange={(checked) => handleInputChange('readingReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas da Lista de Desejos</p>
                <p className="text-sm text-slate-600">Promoções e disponibilidade</p>
              </div>
              <Switch
                checked={settings.wishlistAlerts}
                onCheckedChange={(checked) => handleInputChange('wishlistAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Relatórios Semanais</p>
                <p className="text-sm text-slate-600">Resumo da sua atividade</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => handleInputChange('weeklyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Preferências do App</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Idioma
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español (España)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tema
              </label>
              <select
                value={settings.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Visualização Padrão
              </label>
              <select
                value={settings.defaultView}
                onChange={(e) => handleInputChange('defaultView', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="grid">Grade</option>
                <option value="list">Lista</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Livros por Página
              </label>
              <select
                value={settings.booksPerPage}
                onChange={(e) => handleInputChange('booksPerPage', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Perfil Público</p>
                <p className="text-sm text-slate-600">Permitir que outros vejam seu perfil</p>
              </div>
              <Switch
                checked={settings.profilePublic}
                onCheckedChange={(checked) => handleInputChange('profilePublic', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compartilhar Estatísticas</p>
                <p className="text-sm text-slate-600">Mostrar progresso de leitura</p>
              </div>
              <Switch
                checked={settings.shareReadingStats}
                onCheckedChange={(checked) => handleInputChange('shareReadingStats', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Gerenciamento de Dados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Exportar Dados</h4>
              <p className="text-sm text-slate-600 mb-3">Baixe uma cópia de todos os seus dados</p>
              <Button variant="outline" onClick={handleExportData} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar Biblioteca
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Importar Dados</h4>
              <p className="text-sm text-slate-600 mb-3">Restaure ou migre dados de outro serviço</p>
              <Button variant="outline" onClick={handleImportData} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Importar Dados
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Button variant="destructive" className="w-full">
                Excluir Conta
              </Button>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default Settings;
