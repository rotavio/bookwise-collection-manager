
import React from 'react';
import { Palette } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useColorPalette, colorPalettes, ColorPalette } from '@/hooks/useColorPalette';

const ColorPaletteSelect: React.FC = () => {
  const { palette, setPalette } = useColorPalette();

  return (
    <div className="flex items-center space-x-2">
      <Palette className="w-4 h-4 text-slate-600" />
      <Select value={palette} onValueChange={(value: ColorPalette) => setPalette(value)}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(colorPalettes).map(([key, config]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: config.primary }}
                />
                <span>{config.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ColorPaletteSelect;
