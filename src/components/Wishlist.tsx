
import React, { useState } from 'react';
import { Plus, ExternalLink, ShoppingCart, Star, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Wishlist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const wishlistBooks = [
    {
      id: 1,
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      genre: 'História',
      price: 'R$ 45,90',
      priority: 'high',
      addedDate: '2024-01-15',
      estimatedPrice: 45.90,
      notes: 'Recomendado por vários amigos',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
      amazonLink: '#',
      goodreadsRating: 4.4
    },
    {
      id: 2,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      genre: 'Ficção',
      price: 'R$ 32,50',
      priority: 'medium',
      addedDate: '2024-01-10',
      estimatedPrice: 32.50,
      notes: 'Livro do mês no clube de leitura',
      cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=300&fit=crop',
      amazonLink: '#',
      goodreadsRating: 4.2
    },
    {
      id: 3,
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Biografia',
      price: 'R$ 38,90',
      priority: 'high',
      addedDate: '2024-01-05',
      estimatedPrice: 38.90,
      notes: 'Winner of several awards',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
      amazonLink: '#',
      goodreadsRating: 4.6
    },
    {
      id: 4,
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      genre: 'Ficção Científica',
      price: 'R$ 42,00',
      priority: 'low',
      addedDate: '2023-12-28',
      estimatedPrice: 42.00,
      notes: 'Nobel Prize winner author',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop',
      amazonLink: '#',
      goodreadsRating: 4.1
    },
    {
      id: 5,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      genre: 'Romance',
      price: 'R$ 29,90',
      priority: 'medium',
      addedDate: '2023-12-20',
      estimatedPrice: 29.90,
      notes: 'Trending on social media',
      cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=300&fit=crop',
      amazonLink: '#',
      goodreadsRating: 4.5
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'N/A';
    }
  };

  const filteredBooks = wishlistBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEstimatedCost = wishlistBooks.reduce((sum, book) => sum + book.estimatedPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lista de Desejos</h1>
          <p className="text-slate-600 mt-1">
            {filteredBooks.length} livros • Valor estimado: R$ {totalEstimatedCost.toFixed(2)}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar à Lista
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Buscar na lista de desejos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">
              {wishlistBooks.length}
            </div>
            <div className="text-sm text-slate-600">Total de Livros</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {wishlistBooks.filter(b => b.priority === 'high').length}
            </div>
            <div className="text-sm text-slate-600">Alta Prioridade</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              R$ {totalEstimatedCost.toFixed(2)}
            </div>
            <div className="text-sm text-slate-600">Valor Estimado</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {(wishlistBooks.reduce((sum, book) => sum + book.goodreadsRating, 0) / wishlistBooks.length).toFixed(1)}
            </div>
            <div className="text-sm text-slate-600">Avaliação Média</div>
          </CardContent>
        </Card>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex space-x-6">
                {/* Book Cover */}
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0"
                />
                
                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg mb-1">{book.title}</h3>
                      <p className="text-slate-600 mb-2">{book.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{book.price}</div>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600 ml-1">{book.goodreadsRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(book.priority)}`}>
                      {getPriorityLabel(book.priority)}
                    </span>
                    <span className="text-sm text-slate-500">{book.genre}</span>
                    <span className="text-sm text-slate-500">
                      Adicionado em {new Date(book.addedDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {book.notes && (
                    <p className="text-sm text-slate-600 mb-4 italic">"{book.notes}"</p>
                  )}

                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar Agora
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      Marcar como Adquirido
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum livro encontrado</h3>
          <p className="text-slate-600">Tente ajustar sua pesquisa ou adicione novos livros à sua lista de desejos.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
