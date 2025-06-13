import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Clock, DollarSign, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Pie } from 'recharts';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const readingProgressData = [
    { month: 'Jan', booksRead: 4, hours: 32 },
    { month: 'Fev', booksRead: 6, hours: 45 },
    { month: 'Mar', booksRead: 3, hours: 28 },
    { month: 'Abr', booksRead: 8, hours: 52 },
    { month: 'Mai', booksRead: 5, hours: 38 },
    { month: 'Jun', booksRead: 7, hours: 41 },
  ];

  const genreDistribution = [
    { name: 'Tecnologia', value: 35, color: '#3B82F6' },
    { name: 'Ficção', value: 25, color: '#10B981' },
    { name: 'Autodesenvolvimento', value: 20, color: '#F59E0B' },
    { name: 'História', value: 12, color: '#EF4444' },
    { name: 'Biografia', value: 8, color: '#8B5CF6' },
  ];

  const monthlySpending = [
    { month: 'Jan', spending: 120 },
    { month: 'Fev', spending: 180 },
    { month: 'Mar', spending: 95 },
    { month: 'Abr', spending: 230 },
    { month: 'Mai', spending: 150 },
    { month: 'Jun', spending: 200 },
  ];

  const costPerHourData = [
    { book: 'Clean Code', cost: 2.3, hours: 25 },
    { book: 'Atomic Habits', cost: 1.8, hours: 18 },
    { book: 'Sapiens', cost: 3.1, hours: 35 },
    { book: 'Design Patterns', cost: 4.2, hours: 45 },
    { book: 'Psychology of Money', cost: 1.9, hours: 22 },
  ];

  const readingStats = {
    totalBooks: 247,
    booksRead: 89,
    currentlyReading: 12,
    averageRating: 4.2,
    totalHours: 342,
    averagePages: 298,
    totalSpent: 3245,
    averageCostPerHour: 9.48,
    favoriteGenre: 'Tecnologia',
    longestBook: 'Clean Architecture (464 páginas)',
    fastestRead: 'Atomic Habits (2 dias)',
    mostExpensive: 'Design Patterns (R$ 189,90)'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Relatórios e Métricas</h1>
          <p className="text-slate-600 mt-1">Análises detalhadas da sua biblioteca e hábitos de leitura</p>
        </div>
        
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Última Semana</option>
          <option value="month">Último Mês</option>
          <option value="quarter">Último Trimestre</option>
          <option value="year">Último Ano</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Livros Lidos</p>
                <p className="text-2xl font-bold text-slate-900">{readingStats.booksRead}</p>
                <p className="text-xs text-green-600">+8% vs mês anterior</p>
              </div>
              <Book className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Horas de Leitura</p>
                <p className="text-2xl font-bold text-slate-900">{readingStats.totalHours}h</p>
                <p className="text-xs text-green-600">+12% vs mês anterior</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Custo por Hora</p>
                <p className="text-2xl font-bold text-slate-900">R$ {readingStats.averageCostPerHour}</p>
                <p className="text-xs text-red-600">+3% vs mês anterior</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avaliação Média</p>
                <p className="text-2xl font-bold text-slate-900">{readingStats.averageRating}★</p>
                <p className="text-xs text-green-600">Mantendo qualidade</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reading Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Progresso de Leitura Mensal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={readingProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="booksRead" fill="#3B82F6" name="Livros Lidos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Genre Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Distribuição por Gênero</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {genreDistribution.map((genre, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: genre.color }}
                    />
                    <span>{genre.name}</span>
                  </div>
                  <span className="font-medium">{genre.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending */}
        <Card>
          <CardHeader>
            <CardTitle>Gastos Mensais com Livros</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Gastos']} />
                <Line 
                  type="monotone" 
                  dataKey="spending" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Per Hour Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Custo-Benefício por Livro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costPerHourData.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">{book.book}</h4>
                    <p className="text-sm text-slate-600">{book.hours}h de leitura</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold ${
                      book.cost <= 2 ? 'text-green-600' :
                      book.cost <= 3 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      R$ {book.cost.toFixed(2)}/h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Melhores Métricas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Gênero Favorito:</span>
              <span className="font-medium">{readingStats.favoriteGenre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Livro Mais Longo:</span>
              <span className="font-medium text-sm">{readingStats.longestBook}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Leitura Mais Rápida:</span>
              <span className="font-medium">{readingStats.fastestRead}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Estatísticas Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Páginas Médias:</span>
              <span className="font-medium">{readingStats.averagePages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Taxa de Conclusão:</span>
              <span className="font-medium">{Math.round((readingStats.booksRead / readingStats.totalBooks) * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Lendo Atualmente:</span>
              <span className="font-medium">{readingStats.currentlyReading}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Investimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Investido:</span>
              <span className="font-medium">R$ {readingStats.totalSpent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Mais Caro:</span>
              <span className="font-medium text-sm">{readingStats.mostExpensive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Custo Médio/Livro:</span>
              <span className="font-medium">R$ {(readingStats.totalSpent / readingStats.totalBooks).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
