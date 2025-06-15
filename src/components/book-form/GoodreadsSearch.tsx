
import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoodreadsBook } from '@/types/book';

interface GoodreadsSearchProps {
  onBookSelect: (book: GoodreadsBook) => void;
  onBack: () => void;
}

const GoodreadsSearch: React.FC<GoodreadsSearchProps> = ({ onBookSelect, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GoodreadsBook[]>([]);

  const searchGoodreads = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResults: GoodreadsBook[] = [{
        title: `Resultado para: "${searchQuery}"`, author: "Autor Exemplo", publisher: "Editora Exemplo",
        isbn: "978-0-123456-78-9", pages: 300, publicationDate: "2023-01-01",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
        description: "Esta é uma sinopse de exemplo para o livro encontrado."
      }];
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar no Goodreads:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-2" /> Voltar</Button>
      </div>
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Adicionar Novo Livro</h1>
        <p className="text-slate-600 mt-1 text-sm sm:text-base">Primeiro, encontre seu livro no Goodreads.</p>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg"><Search className="w-5 h-5" /><span>Buscar no Goodreads</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Digite o título ou autor do livro" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), searchGoodreads())} className="flex-1" />
            <Button type="button" onClick={searchGoodreads} disabled={isSearching || !searchQuery.trim()} className="w-full sm:w-auto">{isSearching ? 'Buscando...' : 'Buscar'}</Button>
          </div>
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-slate-700">Resultados encontrados:</h4>
              {searchResults.map((b, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 border rounded-lg hover:bg-slate-50">
                  <img src={b.cover} alt={b.title} className="w-16 h-20 sm:w-12 sm:h-16 object-cover rounded mx-auto sm:mx-0" />
                  <div className="flex-1 text-center sm:text-left">
                    <h5 className="font-medium">{b.title}</h5><p className="text-sm text-slate-600">{b.author}</p><p className="text-xs text-slate-500">{b.publisher} • {b.pages} páginas</p>
                  </div>
                  <Button size="sm" onClick={() => onBookSelect(b)} className="w-full sm:w-auto">Usar este livro</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoodreadsSearch;
