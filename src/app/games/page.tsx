"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchGames } from "@/utils/firebaseQueries";
import type { Game } from "@/types/gametypes";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getGames = async () => {
      const fetchedGames = await fetchGames();
      setGames(fetchedGames);
    };
    getGames();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-5xl font-extrabold text-purple-600 mb-8">Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
              <img
                src={game.imgSrc}
                alt={`${game.name} Image`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-blue-600">{game.name}</h2>
            <p className="text-black">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
