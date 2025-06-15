
import React from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FormActionsProps {
  isEditing: boolean;
  isNewBook: boolean;
  onCancel: () => void;
  onBack: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, isNewBook, onCancel, onBack }) => {
  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6">
        <div className="space-y-3">
          {isEditing ? (
            <>
              <Button type="submit" className="w-full"><Save className="w-4 h-4 mr-2" />Salvar Alterações</Button>
              <Button type="button" variant="outline" className="w-full" onClick={isNewBook ? onBack : onCancel}>Cancelar</Button>
            </>
          ) : (
            <Button type="button" variant="outline" className="w-full" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a Biblioteca
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormActions;
