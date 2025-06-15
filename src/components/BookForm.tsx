
import React, { useState, useEffect } from 'react';
import { Save, Search, ArrowLeft, BookOpen, Clock, Landmark, Calendar, Edit, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Book } from './BookList';

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

interface BookFormProps {
  book: Book | null;
  onBack: () => void;
  // onSave: (data: any) => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onBack }) => {
  const [isEditing, setIsEditing] = useState(!book);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GoodreadsBook[]>([]);

  const mapBookToGoodreads = (b: Book): GoodreadsBook => ({
    title: b.title,
    author: b.author,
    publisher: b.publisher,
    isbn: "N/A",
    pages: b.pages,
    publicationDate: b.publishDate,
    cover: b.cover,
    description: b.synopsis || "Nenhuma sinopse disponível.",
  });

  const [goodreadsBook, setGoodreadsBook] = useState<GoodreadsBook | null>(book ? mapBookToGoodreads(book) : null);
  
  const [userFormData, setUserFormData] = useState({
    purchaseDate: '',
    price: '',
    store: '',
    status: book?.status || 'wishlist',
    currentPage: book?.currentPage?.toString() || '0',
    rating: book?.rating || 0,
    notes: '', // Em uma implementação futura, isso viria do book.notes
    tags: [] as string[], // Em uma implementação futura, isso viria do book.tags
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (book) {
      setGoodreadsBook(mapBookToGoodreads(book));
      setUserFormData({
        purchaseDate: '',
        price: '',
        store: '',
        status: book.status,
        currentPage: book.currentPage.toString(),
        rating: book.rating,
        notes: '',
        tags: [],
      });
      setIsEditing(false);
    } else {
      setGoodreadsBook(null);
      setUserFormData({
        purchaseDate: '', price: '', store: '', status: 'wishlist',
        currentPage: '0', rating: 0, notes: '', tags: [],
      });
      setIsEditing(true);
    }
  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };
  
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
  
  const selectBookFromGoodreads = (selectedGoodreadsBook: GoodreadsBook) => {
    setGoodreadsBook(selectedGoodreadsBook);
    setSearchResults([]);
    setSearchQuery('');
    setIsEditing(true);
  };
  
  const addTag = () => {
    if (newTag.trim() && !userFormData.tags.includes(newTag.trim())) {
      setUserFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setUserFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleRatingClick = (rating: number) => {
    if (!isEditing) return;
    setUserFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goodreadsBook) return;
    const finalBookData = { ...goodreadsBook, ...userFormData };
    console.log('Form submitted:', finalBookData);
    onBack(); // Volta para a lista após salvar
  };

  if (!goodreadsBook) {
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
                    <Button size="sm" onClick={() => selectBookFromGoodreads(b)} className="w-full sm:w-auto">Usar este livro</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const pageTitle = book ? (isEditing ? 'Editar Livro' : 'Detalhes do Livro') : 'Adicionar Novo Livro';
  const pageDescription = book ? (isEditing ? 'Altere as informações de leitura.' : 'Veja os detalhes do seu livro.') : 'Confirme os dados e adicione suas informações de leitura.';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{pageTitle}</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">{pageDescription}</p>
        </div>
        {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
            </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
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
          
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Informações de Compra e Leitura</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Data de Aquisição</label>
                <Input name="purchaseDate" type="date" value={userFormData.purchaseDate} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preço (R$)</label>
                <Input name="price" type="number" step="0.01" value={userFormData.price} onChange={handleInputChange} placeholder="0,00" disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Loja</label>
                <Input name="store" value={userFormData.store} onChange={handleInputChange} placeholder="Amazon, Saraiva, etc." disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Página Atual</label>
                <Input name="currentPage" type="number" value={userFormData.currentPage} onChange={handleInputChange} placeholder="0" disabled={!isEditing} />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Status de Leitura</label>
                <select name="status" value={userFormData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" disabled={!isEditing}>
                  <option value="wishlist">Lista de Desejos</option><option value="to-read">Para Ler</option><option value="reading">Lendo</option><option value="paused">Pausado</option><option value="completed">Concluído</option><option value="abandoned">Abandonado</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Notas e Etiquetas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notas Pessoais</label>
                <Textarea name="notes" value={userFormData.notes} onChange={handleInputChange} placeholder="Suas impressões, resumo, citações favoritas..." rows={4} className="text-sm" disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Etiquetas</label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                  <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Digite uma etiqueta" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1" disabled={!isEditing} />
                  <Button type="button" onClick={addTag} size="sm" className="w-full sm:w-auto" disabled={!isEditing}>Adicionar</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userFormData.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {tag}
                      {isEditing && <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-blue-600"><X className="w-3 h-3" /></button>}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Sua Avaliação</CardTitle></CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => handleRatingClick(star)} className={`text-2xl sm:text-3xl ${star <= userFormData.rating ? 'text-yellow-400' : 'text-slate-300'} ${isEditing ? 'hover:text-yellow-400' : 'cursor-default'} transition-colors touch-manipulation`} disabled={!isEditing}>★</button>
                ))}
              </div>
              <p className="text-center text-sm text-slate-600 mt-2">{userFormData.rating === 0 ? 'Sem avaliação' : `${userFormData.rating} estrela${userFormData.rating > 1 ? 's' : ''}`}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <Button type="submit" className="w-full"><Save className="w-4 h-4 mr-2" />Salvar Alterações</Button>
                    <Button type="button" variant="outline" className="w-full" onClick={book ? () => setIsEditing(false) : onBack}>Cancelar</Button>
                  </>
                ) : (
                  <Button type="button" variant="outline" className="w-full" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para a Biblioteca
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
