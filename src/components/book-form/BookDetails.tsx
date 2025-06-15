
import React from 'react';
import { BookOpen, Clock, Landmark, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GoodreadsBook } from '@/types/book';

interface BookDetailsProps {
  book: GoodreadsBook;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <img src={book.cover} alt={book.title} className="w-40 h-auto object-cover rounded-lg shadow-lg mb-4" />
            <h2 className="text-xl font-bold text-slate-900 leading-tight">{book.title}</h2>
            <p className="text-md text-slate-600 mt-1">{book.author}</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Sinopse</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{book.description}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Detalhes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2 text-slate-600"><BookOpen className="w-4 h-4 text-slate-400"/><span>ISBN: {book.isbn}</span></div>
                <div className="flex items-center space-x-2 text-slate-600"><Clock className="w-4 h-4 text-slate-400"/><span>{book.pages} páginas</span></div>
                <div className="flex items-center space-x-2 text-slate-600"><Landmark className="w-4 h-4 text-slate-400"/><span>{book.publisher}</span></div>
                <div className="flex items-center space-x-2 text-slate-600"><Calendar className="w-4 h-4 text-slate-400"/><span>Publicado em {book.publicationDate}</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookDetails;
