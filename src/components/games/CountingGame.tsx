"use client";

import React, { useState, useEffect } from 'react';
import { ProblemType } from '@/types/gametypes';
import { generateProblem, generateOptions, generateHint } from "../../utils/mathGameUtils";
import ProblemDisplay from './countingComps/ProblemDisplay'; 
import OptionsGrid from './countingComps/OptionsGrid'; 
import FeedbackMessage from './shared/FeedbackMessage'; 
import ScoreDisplay from './shared/ScoreDisplay'; 
import DescriptionBox from './matchingComps/DescriptionBox'; 
import SharedGameOverScreen from './shared/SharedGameOverScreen';
import { handleSaveHighScoreCommon } from '@/utils/highScoreHelper';

const CountingGame: React.FC<{}> = () => {
  const [question, setQuestion] = useState<ProblemType | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [animateOnCorrect, setAnimateOnCorrect] = useState<boolean>(false);
  const [answeredThisRound, setAnsweredThisRound] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");

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
    if (answeredThisRound || isGameOver) return;
    setAnsweredThisRound(true);
    setAttempts((prev) => prev + 1);

    if (question && selectedOption === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback('Correct! 🎉');
      setAnimateOnCorrect(true);

      setTimeout(() => {
        setAnimateOnCorrect(false);
        if (score + 1 === 10) {
          setIsGameOver(true); 
        } else {
          const newQ = generateProblem();
          setQuestion(newQ);
        }
        setFeedback('');
        setAnsweredThisRound(false);
      }, 1500);
    } else {
      const hint = question ? generateHint(question) : '';
      setFeedback(`Incorrect. Hint: ${hint}`);
      setAnsweredThisRound(false);
    }
  }

  function resetGame() {
    setScore(0);
    setAttempts(0);
    setIsGameOver(false);
    setNickname("");
    setFeedback('');
    setAnsweredThisRound(false);
    setAnimateOnCorrect(false);
    setIsSaving(false);
    const newQ = generateProblem();
    setQuestion(newQ);
    setOptions(generateOptions(newQ.answer));
  }

  async function handleSaveHighScore() {
    await handleSaveHighScoreCommon({
      nickname,
      score,
      attempts,
      gameName: "Counting Game",
      setIsSaving,
      resetGame,
    });
  }

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-600 mb-4">
        Math Challenge
      </h1>
      <div className="w-full md:w-1/2 mt-6 mb-10 mx-auto">
        <DescriptionBox description="Solve the math problems and score points! Reach 10 points to finish the game." />
      </div>

      {!isGameOver ? (
        <>
          <ProblemDisplay question={question.question} animateOnCorrect={animateOnCorrect} />
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-b-xl shadow-xl w-full max-w-md">
            <OptionsGrid 
              options={options} 
              onOptionClick={handleAnswer} 
              disabled={answeredThisRound} 
            />
            <FeedbackMessage feedback={feedback} />
          </div>
          <ScoreDisplay score={score} attempts={attempts}/>
        </>
      ) : (
        <SharedGameOverScreen
          score={score}
          attempts={attempts}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSaveHighScore={handleSaveHighScore}
          onPlayAgain={resetGame}
          isSaving={isSaving}
          gameTitle="Counting Game"
        />
      )}
    </div>
  );
};

export default CountingGame;
