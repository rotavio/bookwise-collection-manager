
import React, { useState } from 'react';
import { 
  Home, 
  Book, 
  List, 
  BarChart3, 
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronRight,
  Heart,
  Clock
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
  { 
    id: 'books', 
    label: 'Meus Livros', 
    icon: Book,
    subItems: [
      { id: 'books', label: 'Todos os Livros', icon: Book },
      { id: 'wishlist', label: 'Lista de Desejos', icon: Heart },
      { id: 'pending', label: 'Aguardando chegada', icon: Clock }
    ]
  },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  onToggle, 
  activeSection, 
  onSectionChange 
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['books']));

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: any) => {
    if (item.subItems && !collapsed) {
      toggleExpanded(item.id);
    } else {
      onSectionChange(item.id);
    }
  };

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
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems.has(item.id);
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left",
                    collapsed ? "justify-center" : "",
                    activeSection === item.id && !hasSubItems
                      ? "bg-blue-600 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {hasSubItems && (
                        <div className="ml-auto">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Sub Items */}
                {hasSubItems && !collapsed && isExpanded && (
                  <ul className="mt-2 ml-6 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <li key={subItem.id}>
                          <button
                            onClick={() => onSectionChange(subItem.id)}
                            className={cn(
                              "w-full flex items-center space-x-3 p-2 rounded-lg transition-colors text-left text-sm",
                              activeSection === subItem.id
                                ? "bg-blue-600 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                          >
                            <SubIcon className="w-4 h-4 flex-shrink-0" />
                            <span>{subItem.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
