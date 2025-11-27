import React, { useState, useEffect } from 'react';
import Board from './Board';
import { shuffle, generateAnimalPairs } from '../helpers';
import { CardProps } from './Card';
import backgroundSound from '../sounds/background-music.mp3';
import flipSound from '../sounds/card-flip-2.mp3';
import correctSound from '../sounds/correct.mp3';
import ohNoSound from '../sounds/oh-no.mp3';
import gameOverSound from '../sounds/game-over.mp3';
import useSound from 'use-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const Game: React.FC = () => {
  const [playGameOverSound] = useSound(gameOverSound);
  const [playFlipSound] = useSound(flipSound);
  const [playOhNoSound] = useSound(ohNoSound);
  const [playCorrectSound] = useSound(correctSound);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [canFlip, setCanFlip] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [unmatchedCards, setUnmatchedCards] = useState<number[]>([]);

  const [restart, setRestart] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.3);
  const [playBackgroundSound, { stop, sound }] = useSound(backgroundSound, {
    loop: true,
    volume,
  });

  const restartGame = () => {
    // Reset state variables
    setFlippedCards([]);
    setMatchedCards([]);

    // Shuffle cards
    const shuffledCards = shuffle(cards);
    setCards(shuffledCards);

    stop();
    playBackgroundSound();
  };

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [sound, volume]);

  useEffect(() => {
    setIsLoading(true);
    generateAnimalPairs()
      .then((generatedCards) => {
        setCards(shuffle(generatedCards));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load cards:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    playBackgroundSound();
    return () => {
      stop();
    };
  }, [playBackgroundSound, stop]);

  useEffect(() => {
    if (
      (flippedCards.length > 1 && flippedCards.length === cards.length) ||
      (matchedCards.length > 1 && matchedCards.length === cards.length)
    ) {
      stop();
      playGameOverSound();
      setRestart(true);
    }
  }, [flippedCards, matchedCards, cards, stop, playGameOverSound, restart]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-800"></div>
        <div className="text-xl font-bold text-orange-800 ml-2">
          Iniciando...
        </div>
      </div>
    );
  }

  const handleCardClick = (id: number) => {
    if (!canFlip) return;

    playFlipSound();

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
        playCorrectSound();
        setMatchedCards([...matchedCards, ...newFlippedCards]);
        // Reset flipped cards
        setFlippedCards([]);
      } else {
        playOhNoSound();
        setCanFlip(false);
        // No match, set unmatched cards
        setUnmatchedCards(newFlippedCards);

        // No match, flip back after a short delay
        setTimeout(() => {
          setCanFlip(true);
          setFlippedCards([]);
          setUnmatchedCards([]);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-4 md:py-8 px-1 md:px-0">
      <div className="mb-3 md:mb-4 flex flex-wrap items-center justify-center gap-2 md:gap-0">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faVolumeUp} className="mr-1 md:mr-2 ml-1 md:ml-2 text-sm md:text-base" />
          <input
            className="mr-1 md:mr-2 w-16 md:w-auto"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex items-center">
          <button onClick={(event) => stop()} className="ml-1 md:ml-2 mr-2 md:mr-4 text-sm md:text-base">
            <FontAwesomeIcon icon={faStop} />
          </button>
          <button
            onClick={(event) => playBackgroundSound()}
            className="ml-1 md:ml-2 mr-2 md:mr-4 text-sm md:text-base"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
        {restart && (
          <button
            onClick={(event) => restartGame()}
            className="ml-2 md:ml-8 mr-1 md:mr-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 px-3 py-1.5 md:px-4 md:py-2 rounded text-gray-700 shadow-lg font-bold text-sm md:text-base"
          >
            Reiniciar
          </button>
        )}
      </div>
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
