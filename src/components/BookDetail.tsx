
import React from 'react';
import { ArrowLeft, Star, Edit, Trash2, MoreVertical, Calendar, Landmark, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Book } from '@/components/BookList';

// Estas funções poderiam ser movidas para um arquivo de utilitários no futuro
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

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
};

interface BookDetailProps {
    book: Book;
    onBack: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onBack }) => {
    const readingProgress = book.status === 'reading' ? (book.currentPage / book.pages) * 100 : 0;
    
    const synopsis = book.synopsis || "Nenhuma sinopse disponível para este livro. Edite para adicionar uma.";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onBack} className="text-slate-600 hover:text-slate-900">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para a Biblioteca
                </Button>
                
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir Livro
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card>
                <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 flex flex-col items-center text-center">
                            <img 
                                src={book.cover} 
                                alt={book.title}
                                className="w-48 h-auto object-cover rounded-lg shadow-lg mb-6"
                            />
                             <h1 className="text-2xl font-bold text-slate-900 leading-tight">{book.title}</h1>
                             <p className="text-lg text-slate-600 mt-1">{book.author}</p>
                             {book.rating > 0 && (
                                <div className="flex items-center justify-center space-x-1 mt-2">
                                    {renderStars(book.rating)}
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2 space-y-6">
                             <div>
                                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(book.status)}`}>
                                    {getStatusLabel(book.status)}
                                </span>
                             </div>

                             {book.status === 'reading' && (
                                <div>
                                    <h3 className="text-base font-semibold text-slate-800 mb-2">Progresso da Leitura</h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                                            <div 
                                                className="h-2.5 bg-blue-500 rounded-full"
                                                style={{ width: `${readingProgress}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-slate-500 font-medium">
                                            Página {book.currentPage} de {book.pages} ({readingProgress.toFixed(0)}%)
                                        </span>
                                    </div>
                                </div>
                             )}

                            <div>
                                <h3 className="text-base font-semibold text-slate-800 mb-2">Sinopse</h3>
                                <p className="text-slate-600 leading-relaxed">{synopsis}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-base font-semibold text-slate-800 mb-2">Detalhes</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center space-x-2 text-slate-600">
                                        <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>{book.genre}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-slate-600">
                                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>{book.pages} páginas</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-slate-600">
                                        <Landmark className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>{book.publisher}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-slate-600">
                                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>Publicado em {book.publishDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookDetail;
