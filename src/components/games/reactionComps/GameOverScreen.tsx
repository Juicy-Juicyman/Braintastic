import React from "react";

interface GameOverScreenProps {
  score: number;
  clickCount: number;
  gameDuration: number;
  cps: number;
  avgReaction: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  clickCount,
  gameDuration,
  cps,
  avgReaction,
}) => {
  return (
    <div className="text-center mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Game Over!</h2>
      <p className="text-lg text-gray-700 mb-2">Your Score: {score}</p>
      <p className="text-lg text-gray-700 mb-2">
        Clicks: {clickCount} in {gameDuration} seconds
      </p>
      <p className="text-lg text-gray-700 mb-2">
        Clicks per Second: {cps.toFixed(2)}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Avg Reaction Time: {avgReaction.toFixed(0)} ms
      </p>
    </div>
  );
};

export default GameOverScreen;
