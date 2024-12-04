"use client";

import React, { useState, useEffect } from 'react';
import { words } from '@/data/words';
import type { WordType } from '@/types/gametypes';

const SpellingGame: React.FC = () => {
  const [shuffledWords, setShuffledWords] = useState<WordType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    shuffleWords();
  }, []);

  const shuffleWords = () => {
    const shuffled = [...words]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledWords(shuffled); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (shuffledWords.length === 0) return; 

    const currentWord = shuffledWords[currentIndex].word.toLowerCase();
    if (userInput.trim().toLowerCase() === currentWord) {
      setFeedback('Correct! 🎉');
      setScore(score + 1);
      setAttempts(0);
      setTimeout(() => {
        setFeedback('');
        setUserInput('');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
      }, 1500);
    } else {
      setAttempts(attempts + 1);
      if (attempts === 0) {
        setFeedback(
          `Incorrect. Hint: The word has ${currentWord.length} letters.`
        );
      } else if (attempts === 1) {
        setFeedback(`Incorrect. Hint: ${shuffledWords[currentIndex].hint}`);
      } else {
        setFeedback(`Incorrect. The correct word was "${currentWord}".`);
        setTimeout(() => {
          setFeedback('');
          setUserInput('');
          setAttempts(0);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledWords.length);
        }, 2000);
      }
    }
  };

  if (shuffledWords.length === 0) {
    return <div>Loading...</div>;
  }

  const currentImage = shuffledWords[currentIndex].image;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-yellow-50 to-green-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-600 mb-4">
        Spelling Game
      </h1>
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col items-center">
        <img
          src={currentImage}
          alt="Guess the word"
          className="w-full h-64 object-contain mb-6 rounded-lg"
        />
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-3 sm:p-4 md:p-5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-lg sm:text-xl"
            placeholder="Type the word"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-200 text-lg sm:text-xl font-semibold"
          >
            Submit
          </button>
        </form>
        {feedback && (
          <p
            className={`mt-6 text-center text-lg sm:text-xl font-semibold ${
              feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
      <div className="mt-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-700">
          Score: {score}
        </p>
      </div>
    </div>
  );
};

export default SpellingGame;
