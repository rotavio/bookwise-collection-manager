
import React, { useState } from 'react';
import { Save, Upload, X, Plus, Search, ArrowLeft, BookOpen, Clock, Landmark, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface GoodreadsBook {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  pages: number;
  publicationDate: string;
  cover: string;
  description: string;
}

const AddBookForm: React.FC = () => {
  const [goodreadsBook, setGoodreadsBook] = useState<GoodreadsBook | null>(null);
  const [userFormData, setUserFormData] = useState({
    purchaseDate: '',
    price: '',
    store: '',
    status: 'wishlist',
    currentPage: '',
    rating: 0,
    notes: '',
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GoodreadsBook[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchGoodreads = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults: GoodreadsBook[] = [
        {
          title: `Resultado para: "${searchQuery}"`,
          author: "Autor Exemplo",
          publisher: "Editora Exemplo",
          isbn: "978-0-123456-78-9",
          pages: 300,
          publicationDate: "2023-01-01",
          cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
          description: "Esta é uma sinopse de exemplo para o livro encontrado. Ela pode ser longa e descrever os principais pontos da trama, personagens e o universo da história. A integração real com o Goodreads traria a sinopse oficial do livro."
        }
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar no Goodreads:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectBookFromGoodreads = (book: GoodreadsBook) => {
    setGoodreadsBook(book);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleSearchAgain = () => {
    setGoodreadsBook(null);
  };

  const addTag = () => {
    if (newTag.trim() && !userFormData.tags.includes(newTag.trim())) {
      setUserFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setUserFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleRatingClick = (rating: number) => {
    setUserFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goodreadsBook) {
      console.error("Nenhum livro selecionado do Goodreads.");
      return;
    }

    const finalBookData = {
      // Dados do Goodreads
      title: goodreadsBook.title,
      author: goodreadsBook.author,
      publisher: goodreadsBook.publisher,
      isbn: goodreadsBook.isbn,
      pages: goodreadsBook.pages,
      publicationDate: goodreadsBook.publicationDate,
      cover: goodreadsBook.cover,
      synopsis: goodreadsBook.description,
      // Dados do usuário
      ...userFormData,
    };
    console.log('Form submitted:', finalBookData);
    // Aqui você implementaria a lógica para salvar o livro
  };

  if (!goodreadsBook) {
    return (
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Adicionar Novo Livro</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Primeiro, encontre seu livro no Goodreads.</p>
        </div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Search className="w-5 h-5" />
              <span>Buscar no Goodreads</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o título ou autor do livro"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), searchGoodreads())}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={searchGoodreads}
                disabled={isSearching || !searchQuery.trim()}
                className="w-full sm:w-auto"
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700">Resultados encontrados:</h4>
                {searchResults.map((book, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 border rounded-lg hover:bg-slate-50">
                    <img src={book.cover} alt={book.title} className="w-16 h-20 sm:w-12 sm:h-16 object-cover rounded mx-auto sm:mx-0" />
                    <div className="flex-1 text-center sm:text-left">
                      <h5 className="font-medium">{book.title}</h5>
                      <p className="text-sm text-slate-600">{book.author}</p>
                      <p className="text-xs text-slate-500">{book.publisher} • {book.pages} páginas</p>
                    </div>
                    <Button size="sm" onClick={() => selectBookFromGoodreads(book)} className="w-full sm:w-auto">
                      Usar este livro
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Adicionar Novo Livro</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Confirme os dados e adicione suas informações de leitura.</p>
        </div>
        <Button variant="outline" onClick={handleSearchAgain}>
            <Search className="w-4 h-4 mr-2" />
            Buscar outro livro
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          {/* Book Details from Goodreads */}
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center text-center">
                  <img src={goodreadsBook.cover} alt={goodreadsBook.title} className="w-40 h-auto object-cover rounded-lg shadow-lg mb-4" />
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">{goodreadsBook.title}</h2>
                  <p className="text-md text-slate-600 mt-1">{goodreadsBook.author}</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 mb-2">Sinopse</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{goodreadsBook.description}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 mb-2">Detalhes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-slate-600"><BookOpen className="w-4 h-4 text-slate-400"/><span>ISBN: {goodreadsBook.isbn}</span></div>
                        <div className="flex items-center space-x-2 text-slate-600"><Clock className="w-4 h-4 text-slate-400"/><span>{goodreadsBook.pages} páginas</span></div>
                        <div className="flex items-center space-x-2 text-slate-600"><Landmark className="w-4 h-4 text-slate-400"/><span>{goodreadsBook.publisher}</span></div>
                        <div className="flex items-center space-x-2 text-slate-600"><Calendar className="w-4 h-4 text-slate-400"/><span>Publicado em {goodreadsBook.publicationDate}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Purchase & Reading Info */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Informações de Compra e Leitura</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Data de Aquisição</label>
                <Input name="purchaseDate" type="date" value={userFormData.purchaseDate} onChange={handleInputChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preço (R$)</label>
                <Input name="price" type="number" step="0.01" value={userFormData.price} onChange={handleInputChange} placeholder="0,00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Loja</label>
                <Input name="store" value={userFormData.store} onChange={handleInputChange} placeholder="Amazon, Saraiva, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Página Atual</label>
                <Input name="currentPage" type="number" value={userFormData.currentPage} onChange={handleInputChange} placeholder="0" />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Status de Leitura</label>
                <select name="status" value={userFormData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="wishlist">Lista de Desejos</option>
                  <option value="to-read">Para Ler</option>
                  <option value="reading">Lendo</option>
                  <option value="paused">Pausado</option>
                  <option value="completed">Concluído</option>
                  <option value="abandoned">Abandonado</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Notes and Tags */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Notas e Etiquetas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notas Pessoais</label>
                <Textarea name="notes" value={userFormData.notes} onChange={handleInputChange} placeholder="Suas impressões, resumo, citações favoritas..." rows={4} className="text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Etiquetas</label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                  <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Digite uma etiqueta" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1" />
                  <Button type="button" onClick={addTag} size="sm" className="w-full sm:w-auto"><Plus className="w-4 h-4 mr-1" />Adicionar</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userFormData.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-blue-600"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Sua Avaliação</CardTitle></CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => handleRatingClick(star)} className={`text-2xl sm:text-3xl ${star <= userFormData.rating ? 'text-yellow-400' : 'text-slate-300'} hover:text-yellow-400 transition-colors touch-manipulation`}>★</button>
                ))}
              </div>
              <p className="text-center text-sm text-slate-600 mt-2">{userFormData.rating === 0 ? 'Sem avaliação' : `${userFormData.rating} estrela${userFormData.rating > 1 ? 's' : ''}`}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-3">
                <Button type="submit" className="w-full"><Save className="w-4 h-4 mr-2" />Salvar Livro</Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleSearchAgain}>Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
