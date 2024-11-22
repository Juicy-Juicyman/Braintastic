import React from "react";
import Link from "next/link";

export default function GamesPageOverview() {
  const games = [
    { name: "Counting Game", path: "/games/counting" },
    { name: "Memory Game", path: "/games/memory" },
    { name: "Shapes Game", path: "/games/shapes" },
    { name: "Spelling Game", path: "/games/spelling" },
    { name: "Reaction Game", path: "/games/reaction" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Choose a Game</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.name}
            href={game.path}
            className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-600">{game.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
