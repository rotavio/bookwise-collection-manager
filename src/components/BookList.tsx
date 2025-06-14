
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, Clock, BookOpen, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BookList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const books = [
    {
      id: 1,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      genre: 'Tecnologia',
      status: 'reading',
      rating: 5,
      pages: 464,
      currentPage: 302,
      publishDate: '2008',
      publisher: 'Prentice Hall',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      genre: 'Tecnologia',
      status: 'completed',
      rating: 5,
      pages: 352,
      currentPage: 352,
      publishDate: '1999',
      publisher: 'Addison-Wesley',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gang of Four',
      genre: 'Tecnologia',
      status: 'paused',
      rating: 4,
      pages: 395,
      currentPage: 158,
      publishDate: '1994',
      publisher: 'Addison-Wesley',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      genre: 'História',
      status: 'wishlist',
      rating: 0,
      pages: 443,
      currentPage: 0,
      publishDate: '2011',
      publisher: 'Harper',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Autodesenvolvimento',
      status: 'completed',
      rating: 5,
      pages: 320,
      currentPage: 320,
      publishDate: '2018',
      publisher: 'Avery',
      cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      genre: 'Finanças',
      status: 'reading',
      rating: 4,
      pages: 256,
      currentPage: 89,
      publishDate: '2020',
      publisher: 'Harriman House',
      cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=300&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'reading': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      case 'wishlist': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'reading': return 'Lendo';
      case 'paused': return 'Pausado';
      case 'wishlist': return 'Lista de Desejos';
      default: return 'N/A';
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || book.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const BookCard = ({ book }: { book: any }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-16 h-24 object-cover rounded shadow-sm"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-slate-600 mb-2">{book.author}</p>
            
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                {getStatusLabel(book.status)}
              </span>
              <span className="text-xs text-slate-500">{book.genre}</span>
            </div>

            {book.rating > 0 && (
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(book.rating)}
              </div>
            )}

            {book.status === 'reading' && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${(book.currentPage / book.pages) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  {book.currentPage}/{book.pages}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Minha Biblioteca</h1>
          <p className="text-slate-600 mt-1">{filteredBooks.length} livros encontrados</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Livro
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Status</option>
            <option value="reading">Lendo</option>
            <option value="completed">Concluídos</option>
            <option value="paused">Pausados</option>
            <option value="wishlist">Lista de Desejos</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Mais Filtros
          </Button>
        </div>
      </div>

      {/* Books Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum livro encontrado</h3>
          <p className="text-slate-600">Tente ajustar os filtros ou adicionar novos livros à sua biblioteca.</p>
        </div>
      )}
    </div>
  );
};

export default BookList;
