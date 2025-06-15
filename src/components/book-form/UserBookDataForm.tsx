
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserBookData } from '@/types/book';

interface UserBookDataFormProps {
  formData: UserBookData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onTagsChange: (tags: string[]) => void;
  isEditing: boolean;
}

const UserBookDataForm: React.FC<UserBookDataFormProps> = ({ formData, onFormChange, onTagsChange, isEditing }) => {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      onTagsChange([...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(formData.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-lg">Informações de Compra e Leitura</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Data de Aquisição</label>
            <Input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={onFormChange} disabled={!isEditing} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Preço (R$)</label>
            <Input name="price" type="number" step="0.01" value={formData.price} onChange={onFormChange} placeholder="0,00" disabled={!isEditing} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Loja</label>
            <Input name="store" value={formData.store} onChange={onFormChange} placeholder="Amazon, Saraiva, etc." disabled={!isEditing} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Página Atual</label>
            <Input name="currentPage" type="number" value={formData.currentPage} onChange={onFormChange} placeholder="0" disabled={!isEditing} />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Status de Leitura</label>
            <select name="status" value={formData.status} onChange={onFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" disabled={!isEditing}>
              <option value="wishlist">Lista de Desejos</option><option value="to-read">Para Ler</option><option value="reading">Lendo</option><option value="paused">Pausado</option><option value="completed">Concluído</option><option value="abandoned">Abandonado</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-lg">Notas e Etiquetas</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notas Pessoais</label>
            <Textarea name="notes" value={formData.notes} onChange={onFormChange} placeholder="Suas impressões, resumo, citações favoritas..." rows={4} className="text-sm" disabled={!isEditing} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Etiquetas</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
              <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Digite uma etiqueta" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1" disabled={!isEditing} />
              <Button type="button" onClick={addTag} size="sm" className="w-full sm:w-auto" disabled={!isEditing}>Adicionar</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {tag}
                  {isEditing && <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-blue-600"><X className="w-3 h-3" /></button>}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default UserBookDataForm;
