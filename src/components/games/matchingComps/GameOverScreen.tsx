import React from "react";

interface GameOverScreenProps {
  onPlayAgain: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onPlayAgain }) => {
  return (
    <div className="text-center bg-white p-4 rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl text-green-600 font-bold mb-2">
        Congratulations!
      </h2>
      <p className="text-sm sm:text-lg text-gray-700 mb-4">
        You matched all pairs correctly.
      </p>
      <button
        onClick={onPlayAgain}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold text-sm sm:text-lg"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
