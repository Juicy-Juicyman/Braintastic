"use client";

import React, { useState, useEffect, useRef } from "react";
import StartScreen from "./reactionComps/StartScreen"; 
import GameStats from "./reactionComps/GameStats"; 
import GameOverScreen from "./reactionComps/GameOverScreen"; 
import Dot from "./reactionComps/Dot"; 
import { saveHighScore } from "@/utils/firebaseQueries";

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
  const [nickname, setNickname] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

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

  const handleSaveHighScore = async () => {
    if (nickname.trim() === "") {
      alert("Please enter a nickname!");
      return;
    }

    setIsSaving(true);
    await saveHighScore({
      nickname,
      score,
      attempts: clickCount,
      gameName: "Reaction Game",
    });
    setIsSaving(false);
    alert("High score saved!");
    setNickname(""); 
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-100 to-green-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6">
        Reaction Game
      </h1>

      {!isPlaying && timeLeft === GAME_DURATION && (
        <StartScreen onStart={startGame} />
      )}

      {isPlaying && <GameStats timeLeft={timeLeft} score={score} />}

      {!isPlaying && timeLeft < GAME_DURATION && (
        <div className="text-center bg-white p-6 rounded shadow-lg">
          <GameOverScreen
            score={score}
            clickCount={clickCount}
            gameDuration={GAME_DURATION}
            cps={cps}
            avgReaction={avgReaction}
            onPlayAgain={startGame}
          />

          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleSaveHighScore}
              disabled={isSaving}
              className={`px-4 py-2 text-white rounded ${
                isSaving ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } transition`}
            >
              {isSaving ? "Saving..." : "Save High Score"}
            </button>
          </div>
        </div>
      )}

      <div
        ref={gameAreaRef}
        className="relative w-full h-[500px] bg-white mt-6 rounded-lg shadow-md overflow-hidden"
      >
        <Dot 
          x={dotX} 
          y={dotY} 
          size={dotSize} 
          onClick={handleDotClick} 
          isPlaying={isPlaying} 
        />
      </div>
    </div>
  );
};

export default ReactionGame;
