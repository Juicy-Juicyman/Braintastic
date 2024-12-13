import { MatchItems } from "@/types/gametypes";

export function shuffleArray<T>(arr: T[]): T[] {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getGameItems(allItems: MatchItems[]): MatchItems[] {
  const shuffled = shuffleArray(allItems);
  return shuffled.slice(0, 8);
}