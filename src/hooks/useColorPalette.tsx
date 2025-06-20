
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorPalette = 'blue' | 'green' | 'purple' | 'terracota' | 'minimal';

interface ColorPaletteContextType {
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(undefined);

export const colorPalettes = {
  blue: {
    name: 'Azul Profissional',
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#10b981',
    variables: {
      '--primary': '222.2 47.4% 11.2%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96%',
      '--accent': '210 40% 96%',
      '--ring': '222.2 84% 4.9%',
    }
  },
  green: {
    name: 'Verde Natureza',
    primary: '#059669',
    secondary: '#16a34a',
    accent: '#f59e0b',
    variables: {
      '--primary': '160 84% 39%',
      '--primary-foreground': '0 0% 98%',
      '--secondary': '142 76% 36%',
      '--accent': '43 96% 56%',
      '--ring': '160 84% 39%',
    }
  },
  purple: {
    name: 'Roxo Criativo',
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#f472b6',
    variables: {
      '--primary': '258 90% 66%',
      '--primary-foreground': '0 0% 98%',
      '--secondary': '283 100% 74%',
      '--accent': '316 78% 69%',
      '--ring': '258 90% 66%',
    }
  },
  terracota: {
    name: 'Terracota Moderna',
    primary: '#dc2626',
    secondary: '#ea580c',
    accent: '#f59e0b',
    variables: {
      '--primary': '0 84% 60%',
      '--primary-foreground': '0 0% 98%',
      '--secondary': '24 95% 53%',
      '--accent': '43 96% 56%',
      '--ring': '0 84% 60%',
    }
  },
  minimal: {
    name: 'Minimalista',
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#3b82f6',
    variables: {
      '--primary': '220 26% 14%',
      '--primary-foreground': '0 0% 98%',
      '--secondary': '215 25% 27%',
      '--accent': '217 91% 60%',
      '--ring': '217 91% 60%',
    }
  }
};

export const ColorPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palette, setPalette] = useState<ColorPalette>(() => {
    const saved = localStorage.getItem('booklib-color-palette');
    return (saved as ColorPalette) || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('booklib-color-palette', palette);
    
    const paletteConfig = colorPalettes[palette];
    const root = document.documentElement;
    
    Object.entries(paletteConfig.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [palette]);

  return (
    <ColorPaletteContext.Provider value={{ palette, setPalette }}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export const useColorPalette = () => {
  const context = useContext(ColorPaletteContext);
  if (!context) {
    throw new Error('useColorPalette must be used within a ColorPaletteProvider');
  }
  return context;
};
