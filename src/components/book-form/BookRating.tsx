
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  isEditing: boolean;
}

const BookRating: React.FC<BookRatingProps> = ({ rating, onRatingChange, isEditing }) => {
  return (
    <Card>
      <CardHeader className="pb-3"><CardTitle className="text-lg">Sua Avaliação</CardTitle></CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => onRatingChange(star)} className={`text-2xl sm:text-3xl ${star <= rating ? 'text-yellow-400' : 'text-slate-300'} ${isEditing ? 'hover:text-yellow-400' : 'cursor-default'} transition-colors touch-manipulation`} disabled={!isEditing}>★</button>
          ))}
        </div>
        <p className="text-center text-sm text-slate-600 mt-2">{rating === 0 ? 'Sem avaliação' : `${rating} estrela${rating > 1 ? 's' : ''}`}</p>
      </CardContent>
    </Card>
  );
};

export default BookRating;
