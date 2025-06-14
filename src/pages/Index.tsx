
import React, { useState } from 'react';
import { Book } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import BookList from '@/components/BookList';
import AddBookForm from '@/components/AddBookForm';
import Wishlist from '@/components/Wishlist';
import Reports from '@/components/Reports';
import Settings from '@/components/Settings';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleAddBookClick = () => {
    setActiveSection('add-book');
  };

  // Component para página "Aguardando chegada"
  const PendingBooks = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Aguardando chegada</h1>
        <p className="text-slate-600 mt-1">Livros que você comprou e estão a caminho</p>
      </div>
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">
          <Book className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum livro aguardando</h3>
        <p className="text-slate-600">Quando você comprar livros, eles aparecerão aqui até chegarem.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'books':
        return <BookList onAddBookClick={handleAddBookClick} />;
      case 'add-book':
        return <AddBookForm />;
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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
