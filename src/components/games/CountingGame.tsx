"use client";

import type { ProblemType } from '@/types/gametypes';
import React, { useState, useEffect } from 'react';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem(): ProblemType {
  const operations = ['+', '-', '*', '/'];
  const operation = operations[getRandomInt(0, operations.length - 1)];
  let num1 = getRandomInt(1, 20);
  let num2 = getRandomInt(1, 20);

  if (operation === '/') {
    num2 = getRandomInt(1, 10); 
    num1 = num2 * getRandomInt(1, 10);
  }

  const question = `${num1} ${operation} ${num2}`;
  let answer: number;

  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = num1 / num2;
      break;
    default:
      answer = 0;
      break;
  }

  return { question, answer };
}

function generateOptions(correctAnswer: number): number[] {
  const optionsSet = new Set<number>();
  optionsSet.add(correctAnswer);

  while (optionsSet.size < 4) {
    const distractor = correctAnswer + getRandomInt(-10, 10);
    if (distractor !== correctAnswer && distractor >= 0) {
      optionsSet.add(distractor);
    }
  }

  const optionsArray = Array.from(optionsSet);
  return optionsArray.sort(() => Math.random() - 0.5);
}

function generateHint(problem: ProblemType): string {
  const [num1Str, operation, num2Str] = problem.question.split(' ');
  const num1 = parseInt(num1Str);
  const num2 = parseInt(num2Str);

  switch (operation) {
    case '+':
      return `Add ${num1} and ${num2}.`;
    case '-':
      return `Subtract ${num2} from ${num1}.`;
    case '*':
      return `Multiply ${num1} by ${num2}.`;
    case '/':
      return `Divide ${num1} by ${num2}.`;
    default:
      return '';
  }
}

const CountingGame: React.FC = () => {
  const [question, setQuestion] = useState<ProblemType | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [animate, setAnimate] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

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
    if (isAnswered) return;
    setIsAnswered(true);

    if (question && selectedOption === question.answer) {
      setScore(score + 1);
      setFeedback('Correct! 🎉');

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
        const newQuestion = generateProblem();
        setQuestion(newQuestion);
        setFeedback('');
        setIsAnswered(false);
      }, 1500);
    } else {
      const hint = question ? generateHint(question) : '';
      setFeedback(`Incorrect. Hint: ${hint}`);
      setIsAnswered(false);
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
      <div
        className={`bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md transform transition-transform duration-500 ${
          animate ? 'scale-105' : ''
        }`}
      >
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600">
          {question.question}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              className="bg-yellow-200 p-3 sm:p-4 md:p-5 rounded-full hover:bg-yellow-300 transition-colors duration-200 text-lg sm:text-xl font-semibold text-purple-800"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <p
            className={`mt-6 text-center text-lg sm:text-xl font-semibold ${
              feedback.includes('Correct')
                ? 'text-green-600'
                : 'text-red-600'
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

export default CountingGame;
