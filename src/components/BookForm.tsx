
import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/book';
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
  authors: b.authors || [b.author],
  illustrators: b.illustrators || [],
  publisher: b.publisher,
  publishers: b.publishers || [b.publisher],
  isbn: b.isbn || "N/A",
  pages: b.pages,
  recommendedAge: b.recommendedAge || "N/A",
  editions: b.editions || 1,
  genres: b.genres || [],
  publicationDate: b.publicationDate,
  cover: b.cover,
  description: b.description,
  bookRating: b.bookRating || 0,
  generalRanking: b.generalRanking || 0,
  categoryRanking: b.categoryRanking || [],
});

const BookForm: React.FC<BookFormProps> = ({ book, onBack }) => {
  const [isEditing, setIsEditing] = useState(!book);
  const [goodreadsBook, setGoodreadsBook] = useState<GoodreadsBook | null>(null);
  
  const [userFormData, setUserFormData] = useState<UserBookData>({
    purchaseDate: '',
    price: '',
    store: '',
    status: 'wishlist',
    currentPage: '0',
    rating: 0,
    notes: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (book) {
      setGoodreadsBook(mapBookToGoodreads(book));
      setUserFormData({
        purchaseDate: book.purchaseDate || '',
        price: book.price || '',
        store: book.store || '',
        status: book.status,
        currentPage: book.currentPage.toString(),
        rating: book.rating,
        notes: book.notes || '',
        tags: book.tags || [],
      });
      setIsEditing(false);
    } else {
      // Criar dados mock para demonstração
      const mockBook: GoodreadsBook = {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        authors: ["Robert C. Martin", "James W. Grenning", "Robert S. Koss"],
        illustrators: ["John Doe Designer"],
        publisher: "Prentice Hall",
        publishers: ["Prentice Hall", "Pearson Education"],
        isbn: "978-0132350884",
        pages: 464,
        recommendedAge: "16+",
        editions: 3,
        genres: ["Programação", "Engenharia de Software", "Tecnologia", "Desenvolvimento", "Metodologias Ágeis"],
        publicationDate: "2008",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code 'on the fly' into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.",
        bookRating: 8.7,
        generalRanking: 156,
        categoryRanking: [
          { category: "Programação", position: 12 },
          { category: "Engenharia de Software", position: 8 },
          { category: "Tecnologia", position: 45 },
          { category: "Desenvolvimento Web", position: 23 },
          { category: "Metodologias Ágeis", position: 5 }
        ]
      };
      
      setGoodreadsBook(mockBook);
      setUserFormData({
        purchaseDate: '2024-01-15',
        price: '89.90',
        store: 'Amazon',
        status: 'reading',
        currentPage: '156',
        rating: 5,
        notes: 'Excelente livro para quem quer melhorar a qualidade do código. Os exemplos são muito práticos e aplicáveis no dia a dia.',
        tags: ['programação', 'must-read', 'desenvolvimento', 'boas-práticas'],
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
