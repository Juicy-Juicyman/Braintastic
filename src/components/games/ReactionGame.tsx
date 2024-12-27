"use client";

import React, { useState, useEffect, useRef } from "react";
import GameStats from "./reactionComps/GameStats";
import GameOverScreen from "./reactionComps/GameOverScreen";
import Dot from "./reactionComps/Dot";
import { handleSaveHighScoreCommon } from "@/utils/highScoreHelper";
import DescriptionBox from "./matchingComps/DescriptionBox";

const MIN_DOT_SIZE = 30;
const MAX_DOT_SIZE = 80;

export default function ReactionGame() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
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

  const startGame = (duration: number) => {
    setSelectedDuration(duration);
    setIsPlaying(true);
    setTimeLeft(duration);
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

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setTimeLeft(selectedDuration || 0);
    setScore(0);
    setClickCount(0);
    setReactionTimes([]);
    setLastDotTime(0);
    setNickname("");
    setIsSaving(false);
  };

  const placeDotRandomly = () => {
    if (!gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const randomSize =
      Math.floor(Math.random() * (MAX_DOT_SIZE - MIN_DOT_SIZE + 1)) +
      MIN_DOT_SIZE;
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

    const points = Math.floor(MAX_DOT_SIZE + 20 - dotSize);
    setScore((prev) => prev + points);
    setClickCount((prev) => prev + 1);

    placeDotRandomly();
  };

  const calculateStats = () => {
    const cps = clickCount / (selectedDuration || 1);

    let avgReaction = 0;
    if (reactionTimes.length > 0) {
      const sum = reactionTimes.reduce((a, b) => a + b, 0);
      avgReaction = sum / reactionTimes.length;
    }

    return { cps, avgReaction };
  };

  const { cps, avgReaction } = calculateStats();

  async function handleSaveHighScore() {
    await handleSaveHighScoreCommon({
      nickname,
      score,
      attempts: clickCount,
      gameName: "Reaction Game",
      setIsSaving,
      resetGame,
    });
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-purple-600 mb-6">
        Reaction Game
      </h1>
      <div className="w-full md:w-1/2 mt-6 mb-10 mx-auto px-4 sm:px-6">
        {!isPlaying && timeLeft === 0 && selectedDuration === null && (
          <DescriptionBox description="Test your reflexes in the ultimate Reaction Game! Click the dot as quickly as possible when it appears. Score points for each hit, and try to get the highest score before time runs out!" />
        )}
      </div>
      {!isPlaying && timeLeft === 0 && (
        <div className="text-center mb-6">
          <p className="mb-4 text-lg font-semibold text-purple-600">
            Choose your game duration:
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => startGame(10)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
            >
              10 Seconds
            </button>
            <button
              onClick={() => startGame(20)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
            >
              20 Seconds
            </button>
            <button
              onClick={() => startGame(30)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition"
            >
              30 Seconds
            </button>
          </div>
        </div>
      )}

      {isPlaying && <GameStats timeLeft={timeLeft} score={score} />}

      {!isPlaying && timeLeft < (selectedDuration || 0) && (
        <div className="text-center bg-white p-6 rounded shadow-lg">
          <GameOverScreen
            score={score}
            clickCount={clickCount}
            gameDuration={selectedDuration || 0}
            cps={cps}
            avgReaction={avgReaction}
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
                isSaving ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-800"
              } transition`}
            >
              {isSaving ? "Saving..." : "Save High Score"}
            </button>
          </div>
        </div>
      )}
      <div
        ref={gameAreaRef}
        className={`relative w-[90%] max-w-[600px] h-[350px] bg-white mt-6 rounded-lg shadow-md overflow-hidden ${
          !isPlaying && timeLeft === 0 ? "hidden" : ""
        }`}
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
}
