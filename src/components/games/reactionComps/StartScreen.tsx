import React from "react";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center">
      <p className="mb-4 text-lg text-gray-700">
        Click on the dots as fast as you can! Smaller dots give more points.
      </p>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition font-semibold text-lg"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
