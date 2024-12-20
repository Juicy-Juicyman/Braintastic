"use client";

import React from "react";

interface SharedGameOverScreenProps {
  score: number;
  attempts: number;
  nickname: string;
  onNicknameChange: (value: string) => void;
  onSaveHighScore: () => void;
  onPlayAgain: () => void;
  isSaving: boolean;
  gameTitle?: string; 
}

const SharedGameOverScreen: React.FC<SharedGameOverScreenProps> = ({
  score,
  attempts,
  nickname,
  onNicknameChange,
  onSaveHighScore,
  onPlayAgain,
  isSaving,
  gameTitle
}) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg text-center">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Game Over!</h2>
      {gameTitle && <h3 className="text-xl font-semibold text-gray-700 mb-2">{gameTitle}</h3>}
      <p className="text-gray-700 mb-4">You scored {score} points in {attempts} attempts.</p>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => onNicknameChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={onSaveHighScore}
        disabled={isSaving || nickname.trim() === ""}
        className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition ${
          nickname.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "Saving..." : "Save High Score"}
      </button>
      <button
        onClick={onPlayAgain}
        className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default SharedGameOverScreen;
