
import React, { useState } from 'react';
import { User, Bell, Database, Palette, Download, Upload, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: '',
    
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
    
    // Reading Goals
    monthlyReadingGoal: 4,
    yearlyReadingGoal: 50,
    dailyReadingMinutes: 30
  });

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Informações do Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                {settings.avatar ? (
                  <img src={settings.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <Button variant="outline" size="sm">
                  Alterar Foto
                </Button>
                <p className="text-sm text-slate-600 mt-1">JPG, PNG ou GIF (máx. 2MB)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome Completo
                </label>
                <Input
                  value={settings.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reading Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Metas de Leitura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Meta Mensal (livros)
              </label>
              <Input
                type="number"
                value={settings.monthlyReadingGoal}
                onChange={(e) => handleInputChange('monthlyReadingGoal', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Meta Anual (livros)
              </label>
              <Input
                type="number"
                value={settings.yearlyReadingGoal}
                onChange={(e) => handleInputChange('yearlyReadingGoal', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Leitura Diária (minutos)
              </label>
              <Input
                type="number"
                value={settings.dailyReadingMinutes}
                onChange={(e) => handleInputChange('dailyReadingMinutes', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

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
