import React from "react";

interface GameStatsProps {
  timeLeft: number;
  score: number;
}

const GameStats: React.FC<GameStatsProps> = ({ timeLeft, score }) => {
  return (
    <div className="text-center mb-4">
      <p className="text-lg text-gray-800 font-bold">Time Left: {timeLeft}s</p>
      <p className="text-lg text-gray-600">Score: {score}</p>
    </div>
  );
};

export default GameStats;
