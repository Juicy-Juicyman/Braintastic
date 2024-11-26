"use client";

import { useEffect, useState } from "react";
import { fetchHighScore } from "../../utils/firebaseQueries";

export default function HighScorePage() {
  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    async function getHighScore() {
      const data = await fetchHighScore();
      if (data?.points) {
        setHighScore(data.points);
      }
    }
    getHighScore();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">High Score</h1>
      {highScore !== null ? (
        <p className="text-2xl text-gray-700">Points: {highScore}</p>
      ) : (
        <p className="text-2xl text-gray-700">Loading...</p>
      )}
    </div>
  );
}
