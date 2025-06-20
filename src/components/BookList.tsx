import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, Clock, BookOpen, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/book';

interface BookListProps {
  onAddBookClick?: () => void;
  onBookSelect?: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ onAddBookClick, onBookSelect }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data using the global Book type
  const books: Book[] = [
    {
      id: '1',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      authors: ['Robert C. Martin'],
      illustrators: [],
      publisher: 'Prentice Hall',
      publishers: ['Prentice Hall'],
      isbn: '978-0132350884',
      pages: 464,
      recommendedAge: '16+',
      editions: 1,
      genres: ['Tecnologia'],
      publicationDate: '2008',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
      description: 'A handbook of agile software craftsmanship',
      bookRating: 4.5,
      generalRanking: 1,
      categoryRanking: [],
      purchaseDate: '2024-01-15',
      price: '89.90',
      store: 'Amazon',
      status: 'reading',
      currentPage: 302,
      rating: 5,
      notes: '',
      tags: []
    },
    {
      id: '2',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      authors: ['David Thomas', 'Andrew Hunt'],
      illustrators: [],
      publisher: 'Addison-Wesley',
      publishers: ['Addison-Wesley'],
      isbn: '978-0201616224',
      pages: 352,
      recommendedAge: '16+',
      editions: 1,
      genres: ['Tecnologia'],
      publicationDate: '1999',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
      description: 'From journeyman to master',
      bookRating: 4.6,
      generalRanking: 2,
      categoryRanking: [],
      purchaseDate: '2024-01-10',
      price: '79.90',
      store: 'Amazon',
      status: 'read',
      currentPage: 352,
      rating: 5,
      notes: '',
      tags: []
    },
    {
      id: '3',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gang of Four',
      authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
      illustrators: [],
      publisher: 'Addison-Wesley',
      publishers: ['Addison-Wesley'],
      isbn: '978-0201633610',
      pages: 395,
      recommendedAge: '18+',
      editions: 1,
      genres: ['Tecnologia'],
      publicationDate: '1994',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop',
      description: 'Elements of reusable object-oriented software',
      bookRating: 4.3,
      generalRanking: 3,
      categoryRanking: [],
      purchaseDate: '2024-01-20',
      price: '99.90',
      store: 'Amazon',
      status: 'reading',
      currentPage: 158,
      rating: 4,
      notes: '',
      tags: []
    },
    {
      id: '4',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      authors: ['Yuval Noah Harari'],
      illustrators: [],
      publisher: 'Harper',
      publishers: ['Harper'],
      isbn: '978-0062316097',
      pages: 443,
      recommendedAge: '16+',
      editions: 1,
      genres: ['História'],
      publicationDate: '2011',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
      description: 'A brief history of humankind',
      bookRating: 4.4,
      generalRanking: 4,
      categoryRanking: [],
      purchaseDate: '',
      price: '',
      store: '',
      status: 'wishlist',
      currentPage: 0,
      rating: 0,
      notes: '',
      tags: []
    },
    {
      id: '5',
      title: 'Atomic Habits',
      author: 'James Clear',
      authors: ['James Clear'],
      illustrators: [],
      publisher: 'Avery',
      publishers: ['Avery'],
      isbn: '978-0735211292',
      pages: 320,
      recommendedAge: '16+',
      editions: 1,
      genres: ['Autodesenvolvimento'],
      publicationDate: '2018',
      cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=300&fit=crop',
      description: 'An easy & proven way to build good habits & break bad ones',
      bookRating: 4.7,
      generalRanking: 5,
      categoryRanking: [],
      purchaseDate: '2024-01-25',
      price: '69.90',
      store: 'Amazon',
      status: 'read',
      currentPage: 320,
      rating: 5,
      notes: '',
      tags: []
    },
    {
      id: '6',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      authors: ['Morgan Housel'],
      illustrators: [],
      publisher: 'Harriman House',
      publishers: ['Harriman House'],
      isbn: '978-0857197689',
      pages: 256,
      recommendedAge: '16+',
      editions: 1,
      genres: ['Finanças'],
      publicationDate: '2020',
      cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=300&fit=crop',
      description: 'Timeless lessons on wealth, greed, and happiness',
      bookRating: 4.5,
      generalRanking: 6,
      categoryRanking: [],
      purchaseDate: '2024-02-01',
      price: '59.90',
      store: 'Amazon',
      status: 'reading',
      currentPage: 89,
      rating: 4,
      notes: '',
      tags: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read': return 'bg-green-100 text-green-800';
      case 'reading': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'wishlist': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'read': return 'Concluído';
      case 'reading': return 'Lendo';
      case 'pending': return 'Pausado';
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

  const BookCard = ({ book }: { book: Book }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onBookSelect && onBookSelect(book)}>
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
              <span className="text-xs text-slate-500">{book.genres[0] || 'N/A'}</span>
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
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Minha Biblioteca</h1>
            <p className="text-slate-600 mt-1">{filteredBooks.length} livros encontrados</p>
          </div>
          <Button variant="outline" onClick={onAddBookClick}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Livro
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
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
            <option value="read">Concluídos</option>
            <option value="pending">Pausados</option>
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
