"use client";

import React, { useState, useEffect } from "react";
import { WordType } from "@/types/gametypes";
import { shuffleWords } from "@/utils/spellingGameUtils";
import FeedbackMessage from "./shared/FeedbackMessage";
import ScoreDisplay from "./shared/ScoreDisplay";
import WordImageDisplay from "./spellingComps/WordImageDisplay";
import WordInputForm from "./spellingComps/WordInputForm";
import SharedGameOverScreen from "./shared/SharedGameOverScreen";
import { handleSaveHighScoreCommon } from "@/utils/highScoreHelper";

export default function SpellingGame() {
  const [shuffledWords, setShuffledWords] = useState<WordType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const shuffled = shuffleWords();
    setShuffledWords(shuffled);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (shuffledWords.length === 0 || isGameOver) return;

    const currentWordObj = shuffledWords[currentIndex];
    const currentWord = currentWordObj.word.toLowerCase();
    const userAnswer = userInput.trim().toLowerCase();

    setTotalAttempts((prev) => prev + 1);

    if (userAnswer === currentWord) {
      setFeedback("Correct! 🎉");
      setScore((prevScore) => {
        const newScore = prevScore + 1;

        if (newScore === 10) {
          setIsGameOver(true);
        }

        return newScore;
      });
      setAttempts(0);
      setTimeout(() => {
        setFeedback("");
        setUserInput("");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
      }, 1500);
    } else {
      setAttempts((prev) => prev + 1);
      const attemptCount = attempts + 1;

      if (attemptCount === 1) {
        setFeedback(
          `Incorrect. Hint: The word has ${currentWord.length} letters.`
        );
      } else if (attemptCount === 2) {
        setFeedback(`Incorrect. Hint: ${currentWordObj.hint}`);
      } else {
        setFeedback(`Incorrect. The correct word was "${currentWord}".`);
        setTimeout(() => {
          setFeedback("");
          setUserInput("");
          setAttempts(0);
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % shuffledWords.length
          );
        }, 2000);
      }
    }
  };

  function resetGame() {
    const shuffled = shuffleWords();
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setTotalAttempts(0);
    setFeedback("");
    setUserInput("");
    setIsGameOver(false);
    setNickname("");
    setIsSaving(false);
  }

  async function handleSaveHighScore() {
    await handleSaveHighScoreCommon({
      nickname,
      score: 10,
      attempts: totalAttempts,
      gameName: "Spelling Game",
      setIsSaving,
      resetGame,
    });
  }

  if (shuffledWords.length === 0) {
    return <div>Loading...</div>;
  }

  const currentImage = shuffledWords[currentIndex].image;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-600 mb-4">
        Spelling Game
      </h1>

      {isGameOver ? (
        <SharedGameOverScreen
          score={10}
          attempts={totalAttempts}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSaveHighScore={handleSaveHighScore}
          onPlayAgain={resetGame}
          isSaving={isSaving}
          gameTitle="Spelling Game"
        />
      ) : (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col items-center">
          <WordImageDisplay imageSrc={currentImage} />
          <WordInputForm
            userInput={userInput}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          <FeedbackMessage feedback={feedback} />
        </div>
      )}

      <ScoreDisplay score={score} attempts={totalAttempts} />
    </div>
  );
}
