interface Animal {
  name: string;
  image: string;
}

interface Card {
  id: number;
  animal: Animal;
  flipped: boolean;
}

export function generateAnimalPairs(): Card[] {
  const animals: Animal[] = [
    { name: 'Vaca', image: './assets/cow.png' },
    { name: 'Gato', image: './assets/cat.png' },
    //{ name: 'Leão', image: './assets/lion.png' },
    //{ name: 'Urso', image: './assets/bear.png' },
    { name: 'Cachorro', image: './assets/dog.png' },
    { name: 'Cavalo', image: './assets/horse.png' },
    //{ name: 'Coelho', image: './assets/habbit.png' },
    //{ name: 'Elefante', image: './assets/elephant.png' },
  ];

  let cards: Card[] = animals.reduce<Card[]>((result, animal, index) => {
    const card1: Card = { id: index * 2, animal, flipped: false };
    const card2: Card = { id: index * 2 + 1, animal, flipped: false };
    return result.concat([card1, card2]);
  }, []);

  return cards;
}

export function shuffle(array: any[]): any[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
