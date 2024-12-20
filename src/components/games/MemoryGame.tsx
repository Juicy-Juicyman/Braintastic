"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SharedGameOverScreen from "./shared/SharedGameOverScreen";
import { handleSaveHighScoreCommon } from "@/utils/highScoreHelper";

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

const MemoryGame: React.FC<{}> = () => {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(false);
  };

  async function handleSaveHighScore() {
    await handleSaveHighScoreCommon({
      nickname,
      score: solved.length / 2,
      attempts,
      gameName: "Memory Game",
      setIsSaving,
      resetGame,
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Memory Game</h1>
        {gameOver ? (
          <SharedGameOverScreen
            score={solved.length / 2}
            attempts={attempts}
            nickname={nickname}
            onNicknameChange={setNickname}
            onSaveHighScore={handleSaveHighScore}
            onPlayAgain={resetGame}
            isSaving={isSaving}
            gameTitle="Memory Game"
          />
        ) : (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mt-5">
              {cards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`
                    relative
                    flex justify-center items-center
                    w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                    bg-slate-200 
                    text-sm sm:text-lg md:text-4xl
                    font-bold text-black 
                    cursor-pointer rounded 
                    transform transition-transform duration-300 
                    ${flipped.includes(index) || solved.includes(index) ? "rotate-180" : ""}
                  `}
                >
                  {flipped.includes(index) || solved.includes(index) ? (
                    <div className="relative w-full h-full">
                      <Image
                        className="rotate-180 object-contain"
                        src={`/memory-cards/${card}.jpg`}
                        fill
                        alt="Memory Card"
                      />
                    </div>
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
