
import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Book } from './BookList';
import GoodreadsSearch from './book-form/GoodreadsSearch';
import BookDetails from './book-form/BookDetails';
import UserBookDataForm from './book-form/UserBookDataForm';
import BookRating from './book-form/BookRating';
import FormActions from './book-form/FormActions';
import { GoodreadsBook, UserBookData } from '@/types/book';

interface BookFormProps {
  book: Book | null;
  onBack: () => void;
}

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

const BookForm: React.FC<BookFormProps> = ({ book, onBack }) => {
  const [isEditing, setIsEditing] = useState(!book);
  const [goodreadsBook, setGoodreadsBook] = useState<GoodreadsBook | null>(book ? mapBookToGoodreads(book) : null);
  
  const [userFormData, setUserFormData] = useState<UserBookData>({
    purchaseDate: '',
    price: '',
    store: '',
    status: book?.status || 'wishlist',
    currentPage: book?.currentPage?.toString() || '0',
    rating: book?.rating || 0,
    notes: '',
    tags: [] as string[],
  });

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

  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setUserFormData(prev => ({ ...prev, tags }));
  };
  
  const handleRatingChange = (rating: number) => {
    if (!isEditing) return;
    setUserFormData(prev => ({ ...prev, rating }));
  };

  const selectBookFromGoodreads = (selectedGoodreadsBook: GoodreadsBook) => {
    setGoodreadsBook(selectedGoodreadsBook);
    setIsEditing(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goodreadsBook) return;
    const finalBookData = { ...goodreadsBook, ...userFormData };
    console.log('Form submitted:', finalBookData);
    onBack();
  };

  if (!goodreadsBook) {
    return <GoodreadsSearch onBookSelect={selectBookFromGoodreads} onBack={onBack} />;
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
          <BookDetails book={goodreadsBook} />
          <UserBookDataForm
            formData={userFormData}
            onFormChange={handleUserFormChange}
            onTagsChange={handleTagsChange}
            isEditing={isEditing}
          />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <BookRating
            rating={userFormData.rating}
            onRatingChange={handleRatingChange}
            isEditing={isEditing}
          />
          <FormActions 
            isEditing={isEditing}
            isNewBook={!book}
            onCancel={() => setIsEditing(false)}
            onBack={onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default BookForm;
