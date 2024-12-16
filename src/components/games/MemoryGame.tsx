"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { saveHighScore } from "@/utils/firebaseQueries";

const generateDeck = () => {
  const memoryCards = [
    "apple",
    "banana",
    "bird",
    "flower",
    "horse",
    "monkey",
    "star",
    "tree",
  ];

  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;

      if (cards[first] === cards[second]) {
        setSolved((prev) => [...prev, first, second]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setAttempts((prev) => prev + 1); 
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setGameOver(true); 
    }
  }, [solved, cards]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
    setAttempts(0);
    setGameOver(false);
    setNickname("");
  };

  const handleSaveHighScore = async () => {
    if (nickname.trim() === "") {
      alert("Please enter a nickname!");
      return;
    }

    await saveHighScore({
      nickname,
      score: solved.length / 2, 
      attempts,
      gameName: "Memory Game",
    });

    alert("High score saved!");
    resetGame();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Memory Game</h1>
        {gameOver ? (
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Winner Winner Chicken Dinner!
            </h2>
            <p className="text-gray-700 mb-4">Attempts: {attempts}</p>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleSaveHighScore}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save High Score
            </button>
            <button
              onClick={resetGame}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-5 mt-5">
              {cards.map((card, index) => (
                <div
                  className={`flex justify-center items-center w-28 h-28 bg-slate-200 text-4xl font-bold text-black cursor-pointer rounded transform transition-transform duration-300 
                  ${
                    flipped.includes(index) || solved.includes(index)
                      ? "rotate-180"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {flipped.includes(index) || solved.includes(index) ? (
                    <Image
                      className="rotate-180"
                      src={`/memory-cards/${card}.jpg`}
                      fill
                      alt="Memory Card"
                    />
                  ) : (
                    "?"
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={resetGame}
              className="p-3 bg-slate-500 text-white rounded mt-6 hover:bg-slate-600 transition"
            >
              Restart
            </button>
            <p className="mt-4 text-gray-700 font-semibold">
              Attempts: {attempts}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
