
// Re-exportando o tipo Book de BookList para usá-lo em toda a aplicação
export interface Book {
  id: string;
  title: string;
  author: string;
  authors: string[]; // Array de autores
  illustrators: string[]; // Ilustradores
  publisher: string;
  publishers: string[]; // Array de editoras
  isbn: string;
  pages: number;
  recommendedAge: string; // Idade recomendada
  editions: number; // Número de edições ou volumes
  genres: string[]; // Gêneros
  publicationDate: string;
  publishDate: string; // Manter compatibilidade
  cover: string;
  description: string;
  synopsis?: string; // Manter compatibilidade
  rating: number; // Nota do usuário (1-5 estrelas)
  bookRating: number; // Nota geral do livro (1-10)
  generalRanking: number; // Posição no ranking geral
  categoryRanking: { category: string; position: number }[]; // Ranking por categoria
  status: 'wishlist' | 'to-read' | 'reading' | 'paused' | 'completed' | 'abandoned';
  currentPage: number;
  // Dados do usuário
  purchaseDate?: string;
  price?: string;
  store?: string;
  notes?: string;
  tags?: string[];
}

// Representa a estrutura de dados de uma resposta da API do Goodreads
export interface GoodreadsBook {
  title: string;
  author: string;
  authors: string[];
  illustrators: string[];
  publisher: string;
  publishers: string[];
  isbn: string;
  pages: number;
  recommendedAge: string;
  editions: number;
  genres: string[];
  publicationDate: string;
  cover: string;
  description: string;
  bookRating: number;
  generalRanking: number;
  categoryRanking: { category: string; position: number }[];
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
