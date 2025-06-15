
import React, { useState } from 'react';
import { User, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: '',
    monthlyReadingGoal: 4,
    yearlyReadingGoal: 50,
    dailyReadingMinutes: 30
  });

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    // Aqui você pode implementar a lógica para salvar o perfil
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-slate-600 mt-1">Gerencie suas informações pessoais e metas de leitura.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Informações Pessoais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
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
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Metas de Leitura</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Meta Mensal (livros)
              </label>
              <Input
                type="number"
                min="0"
                value={profile.monthlyReadingGoal}
                onChange={(e) => handleInputChange('monthlyReadingGoal', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Meta Anual (livros)
              </label>
              <Input
                type="number"
                min="0"
                value={profile.yearlyReadingGoal}
                onChange={(e) => handleInputChange('yearlyReadingGoal', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Leitura Diária (minutos)
              </label>
              <Input
                type="number"
                min="0"
                value={profile.dailyReadingMinutes}
                onChange={(e) => handleInputChange('dailyReadingMinutes', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveProfile} size="lg">
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default Profile;
