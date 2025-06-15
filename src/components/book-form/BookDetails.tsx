
import React from 'react';
import { BookOpen, Clock, Landmark, Calendar, Users, Palette, Star, Trophy, Baby } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoodreadsBook } from '@/types/book';

interface BookDetailsProps {
  book: GoodreadsBook;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div className="space-y-6">
      {/* Informações principais */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <img src={book.cover} alt={book.title} className="w-40 h-auto object-cover rounded-lg shadow-lg mb-4" />
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{book.title}</h2>
              <p className="text-md text-slate-600 mt-1">{book.author}</p>
              
              {/* Nota e Rankings */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-bold text-slate-900">{book.bookRating}/10</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3 text-amber-500" />
                    <span>#{book.generalRanking} Geral</span>
                  </div>
                  {book.categoryRanking.slice(0, 2).map((rank, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <Trophy className="w-3 h-3 text-blue-500" />
                      <span>#{rank.position} {rank.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">Sinopse</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{book.description}</p>
              </div>
              
              {/* Informações técnicas */}
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">Detalhes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400"/>
                    <span>ISBN: {book.isbn}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400"/>
                    <span>{book.pages} páginas</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Baby className="w-4 h-4 text-slate-400"/>
                    <span>Idade: {book.recommendedAge}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400"/>
                    <span>{book.editions} {book.editions === 1 ? 'edição' : 'edições'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400"/>
                    <span>Publicado em {book.publicationDate}</span>
                  </div>
                </div>
              </div>
              
              {/* Autores e Ilustradores */}
              {(book.authors.length > 1 || book.illustrators.length > 0) && (
                <div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">Equipe</h3>
                  <div className="space-y-2 text-sm">
                    {book.authors.length > 1 && (
                      <div className="flex items-start space-x-2 text-slate-600">
                        <Users className="w-4 h-4 text-slate-400 mt-0.5"/>
                        <div>
                          <span className="font-medium">Autores: </span>
                          <span>{book.authors.join(', ')}</span>
                        </div>
                      </div>
                    )}
                    {book.illustrators.length > 0 && (
                      <div className="flex items-start space-x-2 text-slate-600">
                        <Palette className="w-4 h-4 text-slate-400 mt-0.5"/>
                        <div>
                          <span className="font-medium">Ilustradores: </span>
                          <span>{book.illustrators.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Editoras */}
              {book.publishers.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">Editoras</h3>
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <Landmark className="w-4 h-4 text-slate-400"/>
                    <span>{book.publishers.join(', ')}</span>
                  </div>
                </div>
              )}
              
              {/* Gêneros */}
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {book.genres.map((genre, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Rankings detalhados */}
      {book.categoryRanking.length > 2 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Rankings por Categoria</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {book.categoryRanking.map((rank, index) => (
                <div key={index} className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-slate-900">#{rank.position}</div>
                  <div className="text-sm text-slate-600">{rank.category}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookDetails;
