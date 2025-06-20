
import React, { useState } from 'react';
import { Book as BookIconLucide } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import BookList, { Book } from '@/components/BookList';
import BookForm from '@/components/BookForm';
import Wishlist from '@/components/Wishlist';
import Reports from '@/components/Reports';
import Settings from '@/components/Settings';
import Header from '@/components/Header';
import Profile from '@/components/Profile';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBookClick = () => {
    setSelectedBook(null);
    setActiveSection('add-book');
  };

  const handleProfileClick = () => {
    setActiveSection('profile');
  };

  const handleSettings = () => {
    setActiveSection('settings');
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setActiveSection('books');
  };
  
  const handleBackFromForm = () => {
    setSelectedBook(null);
    setActiveSection('books');
  };

  const PendingBooks = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Aguardando chegada</h1>
        <p className="text-slate-600 mt-1">Livros que você comprou e estão a caminho</p>
      </div>
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">
          <BookIconLucide className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum livro aguardando</h3>
        <p className="text-slate-600">Quando você comprar livros, eles aparecerão aqui até chegarem.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'add-book' || selectedBook) {
      return <BookForm 
        book={selectedBook} 
        onBack={handleBackFromForm} 
      />;
    }
    
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'books':
        return <BookList onAddBookClick={handleAddBookClick} onBookSelect={handleBookSelect} />;
      case 'add-book':
        return <BookForm book={null} onBack={handleBackFromForm} />;
      case 'wishlist':
        return <Wishlist />;
      case 'pending':
        return <PendingBooks />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Header 
        onProfileClick={handleProfileClick} 
        onSettings={handleSettings}
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setSelectedBook(null);
            setActiveSection(section);
          }}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
