
import React from 'react';
import { Book, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';
import ColorPaletteSelect from './ColorPaletteSelect';

interface HeaderProps {
  onProfileClick: () => void;
  onSettings: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onProfileClick, 
  onSettings, 
  onToggleSidebar,
  sidebarCollapsed 
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onToggleSidebar}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-slate-900">BookLib</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ColorPaletteSelect />
          <UserMenu onProfileClick={onProfileClick} onSettings={onSettings} />
        </div>
      </div>
    </header>
  );
};

export default Header;
