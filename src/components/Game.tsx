import React, { useState, useEffect } from 'react';
import Board from './Board';
import { shuffle, generateAnimalPairs } from '../helpers';
import { CardProps } from './Card';

const Game: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [unmatchedCards, setUnmatchedCards] = useState<number[]>([]);

  useEffect(() => {
    setCards(shuffle(generateAnimalPairs()));
  }, []);

  const handleCardClick = (id: number) => {
    // Check if the card is already flipped or matched
    if (flippedCards.includes(id) || matchedCards.includes(id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];

    // Flip the card
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      const firstCard = cards.find((card) => card.id === newFlippedCards[0]);
      const secondCard = cards.find((card) => card.id === newFlippedCards[1]);

      if (
        firstCard &&
        secondCard &&
        firstCard.animal.name === secondCard.animal.name
      ) {
        // Match found
        setMatchedCards([...matchedCards, ...newFlippedCards]);
        // Reset flipped cards
        setFlippedCards([]);
      } else {
        // No match, set unmatched cards
        setUnmatchedCards(newFlippedCards);

        // No match, flip back after a short delay
        setTimeout(() => {
          setFlippedCards([]);
          setUnmatchedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex justify-center py-8">
      {' '}
      <Board
        cards={cards.map((card) => ({
          ...card,
          flipped:
            flippedCards.includes(card.id) || matchedCards.includes(card.id),
          unmatchedCards,
        }))}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default Game;
