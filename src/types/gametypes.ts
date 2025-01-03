export interface Game {
  id: string;
  name: string;
  slug: string;
  imgSrc: string;
  description: string;
}
export interface ProblemType {
  question: string;
  answer: number;
}

export type WordType = {
  word: string;
  image: string;
  hint: string;
};

export type MatchItems = {
  id: number;
  name: string;
  image: string;
}

export type HighScores = {
  id: string;
  nickname: string;
  score: number;
  attempts: number;
  game: string;
  timestamp: Date;
};