import React from 'react';
import { 
  Home, 
  Book, 
  List, 
  BarChart3, 
  Settings,
  PanelLeftClose,
  PanelLeftOpen 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'books', label: 'Meus Livros', icon: Book },
  { id: 'wishlist', label: 'Lista de Desejos', icon: List },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  onToggle, 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <div className={cn(
      "h-screen bg-slate-900 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">BookLib</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left",
                    collapsed ? "justify-center" : "",
                    activeSection === item.id 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!collapsed && (
          <div className="text-xs text-slate-400">
            <p>BookLib v1.0</p>
            <p>Sua biblioteca pessoal</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
