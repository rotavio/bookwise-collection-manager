
export interface CategoryRanking {
  category: string;
  position: number;
}

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
  categoryRanking: CategoryRanking[];
}

export interface UserBookData {
  purchaseDate: string;
  price: string;
  store: string;
  status: 'wishlist' | 'reading' | 'read' | 'pending';
  currentPage: string;
  rating: number;
  notes: string;
  tags: string[];
}

// Interface completa que combina dados da API e do usuário
export interface Book extends GoodreadsBook, UserBookData {
  id?: string;
  currentPage: number; // Override para ser number ao invés de string
}
