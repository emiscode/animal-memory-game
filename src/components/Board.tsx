import React from 'react';
import Card, { CardProps } from './Card';

interface BoardProps {
  cards: CardProps[];
  onCardClick: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {cards.map((card) => (
        <Card key={card.id} {...card} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default Board;
