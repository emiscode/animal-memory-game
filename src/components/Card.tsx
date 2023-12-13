import React from 'react';

export interface CardProps {
  id: number;
  animal: { name: string; image: string };
  onCardClick: (id: number) => void;
  flipped: boolean;
  unmatchedCards: number[];
}

const Card: React.FC<CardProps> = ({
  id,
  animal,
  onCardClick,
  flipped,
  unmatchedCards,
}) => {
  return (
    <div
      className={`card border-gray-400 border-2 bg-white shadow-md rounded-md overflow-hidden cursor-pointer w-32 h-48 flex items-start justify-center ${
        unmatchedCards.includes(id) ? 'border-red-300 border-2' : ''
      }`}
      onClick={() => onCardClick(id)}
    >
      {flipped ? (
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-contain"
        />
      ) : (
        <img
          src={'./assets/back.png'}
          alt="Back of card"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default Card;
