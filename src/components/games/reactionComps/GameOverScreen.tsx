import React from "react";

interface GameOverScreenProps {
  score: number;
  clickCount: number;
  gameDuration: number;
  cps: number;
  avgReaction: number;
  onPlayAgain: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  clickCount,
  gameDuration,
  cps,
  avgReaction,
  onPlayAgain,
}) => {
  return (
    <div className="text-center mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Game Over!</h2>
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
      <button
        onClick={onPlayAgain}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold text-lg"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
