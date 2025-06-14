
import React from 'react';
import UserMenu from './UserMenu';

interface HeaderProps {
  onEditProfile: () => void;
  onSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEditProfile, onSettings }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Espaço para breadcrumbs ou título da página se necessário */}
        </div>
        <UserMenu onEditProfile={onEditProfile} onSettings={onSettings} />
      </div>
    </header>
  );
};

export default Header;
