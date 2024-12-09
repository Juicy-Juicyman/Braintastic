import React from 'react';

interface ProblemDisplayProps {
  question: string;
  animateOnCorrect: boolean;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ question, animateOnCorrect }) => {
  return (
    <div
      className={`bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md transform transition-transform duration-500 ${
        animateOnCorrect ? 'scale-105' : ''
      }`}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600">
        {question}
      </p>
    </div>
  );
};

export default ProblemDisplay;
