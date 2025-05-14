import type { Game, HighScores } from "@/types/gametypes";
import { localGames } from "@/data/games";

const USE_LOCAL = process.env.NEXT_PUBLIC_USE_LOCAL_DATA !== "false";

export async function fetchGames(): Promise<Game[]> {
  if (!USE_LOCAL) {
  }
  return localGames;
}
const inMemoryScores: HighScores[] = [
  {
    id: "demo-1",
    nickname: "Alice",
    score: 23,
    attempts: 1,
    game: "reaction",
    timestamp: new Date("2025-05-01T12:00:00Z"),
  },
  {
    id: "demo-2",
    nickname: "Bob",
    score: 15,
    attempts: 3,
    game: "counting",
    timestamp: new Date("2025-05-02T09:30:00Z"),
  },
  {
    id: "demo-3",
    nickname: "Charlie",
    score: 30,
    attempts: 2,
    game: "shapes",
    timestamp: new Date("2025-05-03T08:15:00Z"),
  },
  {
    id: "demo-4",
    nickname: "Dana",
    score: 12,
    attempts: 1,
    game: "memory",
    timestamp: new Date("2025-05-03T13:45:00Z"),
  },
  {
    id: "demo-5",
    nickname: "Eve",
    score: 28,
    attempts: 4,
    game: "spelling",
    timestamp: new Date("2025-05-04T11:05:00Z"),
  },
  {
    id: "demo-6",
    nickname: "Frank",
    score: 18,
    attempts: 2,
    game: "reaction",
    timestamp: new Date("2025-05-04T15:20:00Z"),
  },
];

export async function fetchHighScores(): Promise<HighScores[]> {
  if (!USE_LOCAL) {
  }
  return inMemoryScores;
}

export async function saveHighScore({
  nickname,
  score,
  attempts,
  gameName,
}: {
  nickname: string;
  score: number;
  attempts: number;
  gameName: string;
}) {

  inMemoryScores.push({
    id: crypto.randomUUID(),
    nickname,
    score,
    attempts,
    game: gameName,
    timestamp: new Date(),
  });
}
