
import React from 'react';
import { Book, Clock, Star, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Livros',
      value: '247',
      icon: Book,
      change: '+12 este mês',
      color: 'text-blue-600'
    },
    {
      title: 'Horas de Leitura',
      value: '156h',
      icon: Clock,
      change: '+8h esta semana',
      color: 'text-green-600'
    },
    {
      title: 'Livros Lidos',
      value: '89',
      icon: Star,
      change: '+5 este mês',
      color: 'text-purple-600'
    },
    {
      title: 'Investimento Total',
      value: 'R$ 3.245',
      icon: DollarSign,
      change: '+R$ 180 este mês',
      color: 'text-orange-600'
    }
  ];

  const recentBooks = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      status: 'Lendo',
      progress: 65,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=120&fit=crop'
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      status: 'Concluído',
      progress: 100,
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=120&fit=crop'
    },
    {
      title: 'Design Patterns',
      author: 'Gang of Four',
      status: 'Pausado',
      progress: 40,
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=80&h=120&fit=crop'
    }
  ];

  const abandonedBooks = [
    { title: 'Effective Java', author: 'Joshua Bloch', daysAgo: 45 },
    { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', daysAgo: 32 },
    { title: 'Refactoring', author: 'Martin Fowler', daysAgo: 28 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Visão geral da sua biblioteca pessoal</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>Última atualização: hoje</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reading Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Progresso de Leitura</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBooks.map((book, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{book.title}</h4>
                  <p className="text-sm text-slate-600">{book.author}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          book.status === 'Concluído' ? 'bg-green-500' :
                          book.status === 'Lendo' ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{book.progress}%</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  book.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                  book.status === 'Lendo' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {book.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Abandoned Books */}
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Livros Parados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {abandonedBooks.map((book, index) => (
              <div key={index} className="p-3 border-l-4 border-orange-400 bg-orange-50">
                <h4 className="font-medium text-slate-900 text-sm">{book.title}</h4>
                <p className="text-xs text-slate-600">{book.author}</p>
                <p className="text-xs text-orange-600 mt-1">
                  Parado há {book.daysAgo} dias
                </p>
              </div>
            ))}
            <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium mt-4">
              Ver todos os livros parados
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
