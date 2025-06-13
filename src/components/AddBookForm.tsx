import React, { useState } from 'react';
import { Save, Upload, X, Plus, Search } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    pages: '',
    publicationDate: '',
    purchaseDate: '',
    price: '',
    status: 'wishlist',
    currentPage: '',
    rating: 0,
    notes: '',
    tags: [] as string[],
    cover: ''
  });

  const [newTag, setNewTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GoodreadsBook[]>([]);
  const [showSearch, setShowSearch] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchGoodreads = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Simulação da API do Goodreads (você precisará implementar a integração real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para demonstração
      const mockResults: GoodreadsBook[] = [
        {
          title: searchQuery,
          author: "Autor Exemplo",
          publisher: "Editora Exemplo",
          isbn: "978-0-123456-78-9",
          pages: 300,
          publicationDate: "2023-01-01",
          cover: "https://via.placeholder.com/150x200",
          description: "Descrição do livro encontrado no Goodreads"
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
    setFormData(prev => ({
      ...prev,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      isbn: book.isbn,
      pages: book.pages.toString(),
      publicationDate: book.publicationDate,
      cover: book.cover,
      notes: book.description
    }));
    
    setShowSearch(false);
    setSearchResults([]);
    setSearchQuery('');
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aqui você implementaria a lógica para salvar o livro
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Adicionar Novo Livro</h1>
          <p className="text-slate-600 mt-1">Cadastre um novo livro em sua biblioteca</p>
        </div>
      </div>

      {/* Goodreads Search */}
      {showSearch && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Buscar no Goodreads</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o título ou autor do livro"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), searchGoodreads())}
              />
              <Button 
                type="button" 
                onClick={searchGoodreads}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700">Resultados encontrados:</h4>
                {searchResults.map((book, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-slate-50">
                    <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h5 className="font-medium">{book.title}</h5>
                      <p className="text-sm text-slate-600">{book.author}</p>
                      <p className="text-xs text-slate-500">{book.publisher} • {book.pages} páginas</p>
                    </div>
                    <Button size="sm" onClick={() => selectBookFromGoodreads(book)}>
                      Usar este livro
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowSearch(false)}
              >
                Preencher manualmente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showSearch && (
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Buscar no Goodreads
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Título *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Digite o título do livro"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Autor(es) *
                  </label>
                  <Input
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Nome do autor"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Editora
                  label>
                  <Input
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    placeholder="Nome da editora"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ISBN
                  </label>
                  <Input
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    placeholder="978-0-123456-78-9"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Páginas
                  </label>
                  <Input
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase & Reading Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Compra e Leitura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Data de Publicação
                  </label>
                  <Input
                    name="publicationDate"
                    type="date"
                    value={formData.publicationDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Data de Aquisição
                  </label>
                  <Input
                    name="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preço (R$)
                  </label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Página Atual
                  </label>
                  <Input
                    name="currentPage"
                    type="number"
                    value={formData.currentPage}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status de Leitura
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
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
            <CardHeader>
              <CardTitle>Notas e Etiquetas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notas Pessoais
                </label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Suas impressões, resumo, citações favoritas..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Etiquetas
                </label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Digite uma etiqueta"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cover Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Capa do Livro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                {formData.cover ? (
                  <img src={formData.cover} alt="Capa" className="w-full h-48 object-cover rounded mb-4" />
                ) : (
                  <div className="text-slate-400 mb-4">
                    <Upload className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Clique ou arraste uma imagem</p>
                  </div>
                )}
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Arquivo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className={`text-2xl ${
                      star <= formData.rating ? 'text-yellow-400' : 'text-slate-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-slate-600 mt-2">
                {formData.rating === 0 ? 'Sem avaliação' : `${formData.rating} estrela${formData.rating > 1 ? 's' : ''}`}
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button type="submit" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Livro
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
