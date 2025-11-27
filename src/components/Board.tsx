import React from 'react';
import Card, { CardProps } from './Card';

interface BoardProps {
  cards: CardProps[];
  onCardClick: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-1.5 md:gap-10 bg-orange-200 bg-opacity-90 p-2 md:p-20 rounded-md shadow-md w-full md:max-w-2xl mx-auto">
      {cards.map((card) => (
        <Card key={card.id} {...card} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default Board;
