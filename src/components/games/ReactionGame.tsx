"use client";

import React, { useState, useEffect, useRef } from "react";

const GAME_DURATION = 30; 
const MIN_DOT_SIZE = 30; 
const MAX_DOT_SIZE = 80; 

const ReactionGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [score, setScore] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [dotX, setDotX] = useState<number>(0);
  const [dotY, setDotY] = useState<number>(0);
  const [dotSize, setDotSize] = useState<number>(50);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [lastDotTime, setLastDotTime] = useState<number>(0);

  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setClickCount(0);
    setReactionTimes([]);
    placeDotRandomly();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsPlaying(false);
  };

  const placeDotRandomly = () => {
    if (!gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();

    const randomSize = Math.floor(Math.random() * (MAX_DOT_SIZE - MIN_DOT_SIZE + 1)) + MIN_DOT_SIZE;
    const maxX = rect.width - randomSize;
    const maxY = rect.height - randomSize;

    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    setDotSize(randomSize);
    setDotX(newX);
    setDotY(newY);
    setLastDotTime(Date.now());
  };

  const handleDotClick = () => {
    if (!isPlaying) return;

    const now = Date.now();
    const reactionTime = now - lastDotTime;
    setReactionTimes((prev) => [...prev, reactionTime]);

    const points = Math.floor((MAX_DOT_SIZE + 20 - dotSize)); 

    setScore((prev) => prev + points);
    setClickCount((prev) => prev + 1);

    placeDotRandomly();
  };

  const calculateStats = () => {
    const totalTime = GAME_DURATION; 
    const cps = clickCount / totalTime; 

    let avgReaction = 0;
    if (reactionTimes.length > 0) {
      const sum = reactionTimes.reduce((a, b) => a + b, 0);
      avgReaction = sum / reactionTimes.length;
    }

    return { cps, avgReaction };
  };

  const { cps, avgReaction } = calculateStats();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-100 to-green-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6">
        Reaction Game
      </h1>

      {!isPlaying && timeLeft === GAME_DURATION && (
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-700">
            Click on the dots as fast as you can! Smaller dots give more points.
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold text-lg"
          >
            Start Game
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="text-center mb-4">
          <p className="text-lg text-gray-800 font-bold">Time Left: {timeLeft}s</p>
          <p className="text-lg text-gray-600">Score: {score}</p>
        </div>
      )}

      {!isPlaying && timeLeft < GAME_DURATION && (
        <div className="text-center mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Game Over!
          </h2>
          <p className="text-lg text-gray-700 mb-2">Your Score: {score}</p>
          <p className="text-lg text-gray-700 mb-2">
            Clicks: {clickCount} in {GAME_DURATION} seconds
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Clicks per Second: {cps.toFixed(2)}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Avg Reaction Time: {avgReaction.toFixed(0)} ms
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold text-lg"
          >
            Play Again
          </button>
        </div>
      )}

      <div
        ref={gameAreaRef}
        className="relative w-full h-[500px] bg-white mt-6 rounded-lg shadow-md overflow-hidden"
      >
        {isPlaying && (
          <div
            onClick={handleDotClick}
            style={{
              position: "absolute",
              top: dotY,
              left: dotX,
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: "#FF6347",
              cursor: "pointer",
              transition: "top 0.1s, left 0.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactionGame;
