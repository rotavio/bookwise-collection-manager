
import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { GoodreadsBook } from '@/types/book';

interface GoodreadsSearchProps {
  onBookSelect: (book: GoodreadsBook) => void;
  onBack: () => void;
}

const GoodreadsSearch: React.FC<GoodreadsSearchProps> = ({ onBookSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GoodreadsBook[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    // Simular busca na API do Goodreads
    setTimeout(() => {
      const mockResults: GoodreadsBook[] = [
        {
          title: searchTerm,
          author: "Autor Exemplo",
          authors: ["Autor Exemplo", "Co-autor Exemplo"],
          illustrators: ["Ilustrador Exemplo"],
          publisher: "Editora Exemplo",
          publishers: ["Editora Exemplo", "Editora Secundária"],
          isbn: "978-0000000000",
          pages: 300,
          recommendedAge: "14+",
          editions: 2,
          genres: ["Ficção", "Drama"],
          publicationDate: "2023",
          cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
          description: "Uma descrição exemplo do livro pesquisado.",
          bookRating: 8.5,
          generalRanking: 250,
          categoryRanking: [
            { category: "Ficção", position: 15 },
            { category: "Drama", position: 8 }
          ]
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Buscar Livro</h1>
          <p className="text-slate-600 mt-1">Encontre o livro que deseja adicionar à sua biblioteca</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="Digite o título ou autor do livro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
          <Search className="w-4 h-4 mr-2" />
          {isSearching ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Resultados da Busca</h2>
          <div className="grid gap-4">
            {searchResults.map((book, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onBookSelect(book)}>
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{book.title}</h3>
                      <p className="text-slate-600">{book.author}</p>
                      <p className="text-sm text-slate-500 mt-1">{book.publisher} • {book.publicationDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodreadsSearch;
