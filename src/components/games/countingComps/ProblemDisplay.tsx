import React from "react";

interface ProblemDisplayProps {
  question: string;
  animateOnCorrect: boolean;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({
  question,
  animateOnCorrect,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 w-full max-w-md rounded-t-xl">
      <p
        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black ${
          animateOnCorrect ? "animate-correct-text" : ""
        }`}
      >
        {question}
      </p>
    </div>
  );
};

export default ProblemDisplay;
