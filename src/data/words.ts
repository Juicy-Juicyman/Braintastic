import { MatchItems, WordType } from "@/types/gametypes";

export const words: WordType[] = [
  {
    word: 'cat',
    image: '/spelling-images/cat.jpg',
    hint: 'A small domesticated feline.',
  },
  {
    word: 'dog',
    image: '/spelling-images/dog.jpg',
    hint: 'A domesticated canine, often kept as a pet.',
  },
  {
    word: 'house',
    image: '/spelling-images/house.jpg',
    hint: 'A building for human habitation.',
  },
  {
    word: 'family',
    image: '/spelling-images/family.jpg',
    hint: 'A group consisting of parents and children.',
  },
  {
    word: 'child',
    image: '/spelling-images/child.jpg',
    hint: 'A young human being below the age of puberty.',
  },
  {
    word: 'flower',
    image: '/spelling-images/flower.jpg',
    hint: 'The seed-bearing part of a plant, often colorful.',
  },
  {
    word: 'waves',
    image: '/spelling-images/waves.jpg',
    hint: 'Moving ridges of water on the surface of the sea.',
  },
  {
    word: 'boat',
    image: '/spelling-images/boat.jpg',
    hint: 'A small vessel for traveling over water.',
  },
  {
    word: 'fish',
    image: '/spelling-images/fish.jpg',
    hint: 'An aquatic animal that swims.',
  },
  {
    word: 'spider',
    image: '/spelling-images/spider.jpg',
    hint: 'An eight-legged arachnid that spins webs.',
  },
  // Fix images for those below.....
  {
    word: 'apple',
    image: '/spelling-images/apple.jpg',
    hint: 'A common fruit that keeps the doctor away.',
  },
  {
    word: 'tree',
    image: '/spelling-images/tree.jpg',
    hint: 'A tall plant with a trunk and branches.',
  },
  {
    word: 'sun',
    image: '/spelling-images/sun.jpg',
    hint: 'The star at the center of our solar system.',
  },
  {
    word: 'moon',
    image: '/spelling-images/moon.jpg',
    hint: 'Earth’s natural satellite, visible at night.',
  },
  {
    word: 'star',
    image: '/spelling-images/star.jpg',
    hint: 'A bright point of light in the night sky.',
  },
  {
    word: 'bird',
    image: '/spelling-images/bird.jpg',
    hint: 'An animal with feathers that can often fly.',
  },
  {
    word: 'car',
    image: '/spelling-images/car.jpg',
    hint: 'A vehicle with four wheels used for transportation.',
  },
  {
    word: 'plane',
    image: '/spelling-images/plane.jpg',
    hint: 'An aircraft that flies in the sky.',
  },
  {
    word: 'book',
    image: '/spelling-images/book.jpg',
    hint: 'A collection of pages with written stories or information.',
  },
  {
    word: 'pencil',
    image: '/spelling-images/pencil.jpg',
    hint: 'A tool used for writing or drawing.',
  },
  {
    word: 'school',
    image: '/spelling-images/school.jpg',
    hint: 'A place where children go to learn.',
  },
  {
    word: 'horse',
    image: '/spelling-images/horse.jpg',
    hint: 'A large animal with hooves, often ridden.',
  },
  {
    word: 'elephant',
    image: '/spelling-images/elephant.jpg',
    hint: 'The largest land animal with a trunk.',
  },
  {
    word: 'lion',
    image: '/spelling-images/lion.jpg',
    hint: 'A big cat known as the king of the jungle.',
  },
  {
    word: 'banana',
    image: '/spelling-images/banana.jpg',
    hint: 'A long, yellow fruit that monkeys love.',
  },
  {
    word: 'bicycle',
    image: '/spelling-images/bicycle.jpg',
    hint: 'A two-wheeled vehicle powered by pedaling.',
  },
  {
    word: 'computer',
    image: '/spelling-images/computer.jpg',
    hint: 'An electronic device for storing and processing data.',
  },
  {
    word: 'rainbow',
    image: '/spelling-images/rainbow.jpg',
    hint: 'A multicolored arc in the sky after rain.',
  },
  {
    word: 'mountain',
    image: '/spelling-images/mountain.jpg',
    hint: 'A large natural elevation of the earth’s surface.',
  },
  {
    word: 'ocean',
    image: '/spelling-images/ocean.jpg',
    hint: 'A vast body of salt water that covers much of the Earth.',
  },
  {
    word: 'rabbit',
    image: '/spelling-images/rabbit.jpg',
    hint: 'A small animal with long ears and a fluffy tail.',
  },
  {
    word: 'giraffe',
    image: '/spelling-images/giraffe.jpg',
    hint: 'An animal with a very long neck and long legs.',
  },
  {
    word: 'butterfly',
    image: '/spelling-images/butterfly.jpg',
    hint: 'An insect with colorful wings that flies.',
  },
  {
    word: 'clock',
    image: '/spelling-images/clock.jpg',
    hint: 'A device used to tell time.',
  },
  {
    word: 'bread',
    image: '/spelling-images/bread.jpg',
    hint: 'A staple food made from flour and baked.',
  },
  {
    word: 'ship',
    image: '/spelling-images/ship.jpg',
    hint: 'A large vessel that travels on water.',
  },
  {
    word: 'train',
    image: '/spelling-images/train.jpg',
    hint: 'A series of connected vehicles that run on tracks.',
  },
  {
    word: 'phone',
    image: '/spelling-images/phone.jpg',
    hint: 'A device used to communicate with others.',
  },
  {
    word: 'candle',
    image: '/spelling-images/candle.jpg',
    hint: 'A stick of wax with a wick that burns to give light.',
  },
  {
    word: 'puzzle',
    image: '/spelling-images/puzzle.jpg',
    hint: 'A game that tests your problem-solving skills.',
  },
  {
    word: 'drum',
    image: '/spelling-images/drum.jpg',
    hint: 'A musical instrument you hit to make a beat.',
  },
  {
    word: 'balloon',
    image: '/spelling-images/balloon.jpg',
    hint: 'A rubber bag that can be inflated with air.',
  },
];

export const ALL_ITEMS: MatchItems[] = [
  { id: 1, name: 'Circle', image: '/images/circle.png' },
  { id: 2, name: 'Square', image: '/images/square.png' },
  { id: 3, name: 'Triangle', image: '/images/triangle.png' },
  { id: 4, name: 'Rectangle', image: '/images/rectangle.png' },
  { id: 5, name: 'Diamond', image: '/images/diamond.png' },
  { id: 6, name: 'Star', image: '/images/star.png' },
  { id: 7, name: 'Heart', image: '/images/heart.png' },
  { id: 8, name: 'Octagon', image: '/images/octagon.png' },
  { id: 9, name: 'Red', image: '/images/red.png' },
  { id: 10, name: 'Blue', image: '/images/blue.png' },
  { id: 11, name: 'Green', image: '/images/green.png' },
  { id: 12, name: 'Yellow', image: '/images/yellow.png' },
  { id: 13, name: 'Purple', image: '/images/purple.png' },
  { id: 14, name: 'Orange', image: '/images/orange.png' },
  { id: 15, name: 'Pink', image: '/images/pink.png' },
  { id: 16, name: 'Black', image: '/images/black.png' },
  { id: 17, name: 'White', image: '/images/white.png' },
  { id: 18, name: 'Brown', image: '/images/brown.png' },
  { id: 19, name: 'Gray', image: '/images/gray.png' },
  { id: 20, name: 'Romb', image: '/images/romb.png' },
];