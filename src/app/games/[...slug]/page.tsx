import React from "react";
import CountingGame from "@/components/games/CountingGame";
import MemoryGame from "@/components/games/MemoryGame";
import ShapesGame from "@/components/games/ShapesGame";
import SpellingGame from "@/components/games/SpellingGame";
import ReactionGame from "@/components/games/ReactionGame";

const gamesMap: { [key: string]: () => JSX.Element } = {
  counting: CountingGame,
  memory: MemoryGame,
  shapes: ShapesGame,
  spelling: SpellingGame,
  reaction: ReactionGame,
};

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const gameKey = slug[0];

  const GameComponent = gamesMap[gameKey];

  if (!GameComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">Game not found!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <GameComponent />
    </div>
  );
}
