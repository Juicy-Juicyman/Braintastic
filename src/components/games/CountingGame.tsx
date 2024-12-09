"use client";

import React, { useState, useEffect } from 'react';
import { ProblemType } from '@/types/gametypes';
import { generateProblem, generateOptions, generateHint } from "../../utils/mathGameUtils";

import ProblemDisplay from './countingComps/ProblemDisplay'; 
import OptionsGrid from './countingComps/OptionsGrid'; 
import FeedbackMessage from './shared/FeedbackMessage'; 
import ScoreDisplay from './shared/ScoreDisplay'; 

const CountingGame: React.FC = () => {
  const [question, setQuestion] = useState<ProblemType | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [animateOnCorrect, setAnimateOnCorrect] = useState<boolean>(false);
  const [answeredThisRound, setAnsweredThisRound] = useState<boolean>(false);

  useEffect(() => {
    const initialProblem = generateProblem();
    setQuestion(initialProblem);
    setOptions(generateOptions(initialProblem.answer));
  }, []);

  useEffect(() => {
    if (question) {
      setOptions(generateOptions(question.answer));
    }
  }, [question]);

  function handleAnswer(selectedOption: number) {
    if (answeredThisRound) return;
    setAnsweredThisRound(true);

    if (question && selectedOption === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback('Correct! 🎉');
      setAnimateOnCorrect(true);

      setTimeout(() => {
        setAnimateOnCorrect(false);
        const newQ = generateProblem();
        setQuestion(newQ);
        setFeedback('');
        setAnsweredThisRound(false);
      }, 1500);
    } else {
      const hint = question ? generateHint(question) : '';
      setFeedback(`Incorrect. Hint: ${hint}`);
      setAnsweredThisRound(false);
    }
  }

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-600 mb-4">
        Math Challenge
      </h1>
      <ProblemDisplay question={question.question} animateOnCorrect={animateOnCorrect} />
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6 md:p-8">
          <OptionsGrid 
            options={options} 
            onOptionClick={handleAnswer} 
            disabled={answeredThisRound} 
          />
          <FeedbackMessage feedback={feedback} />
        </div>
      </div>
      <ScoreDisplay score={score} />
    </div>
  );
};

export default CountingGame;
