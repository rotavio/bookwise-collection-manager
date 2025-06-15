
import { Book as BookFromList } from '@/components/BookList';

// Re-exportando o tipo Book de BookList para usá-lo em toda a aplicação
export type Book = BookFromList;

// Representa a estrutura de dados de uma resposta da API do Goodreads
export interface GoodreadsBook {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  pages: number;
  publicationDate: string;
  cover: string;
  description: string;
}

// Representa os dados específicos do usuário para um livro
export interface UserBookData {
    purchaseDate: string;
    price: string;
    store: string;
    status: Book['status'];
    currentPage: string;
    rating: number;
    notes: string;
    tags: string[];
}
