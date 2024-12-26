import React from "react";
import { FaStar } from "react-icons/fa";

interface ScoreDisplayProps {
  score: number;
  attempts: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, attempts }) => {
  return (
    <div className="mt-4 text-center">
      <div className="flex justify-center items-center mb-2">
        {Array.from({ length: 10 }, (_, i) => (
          <FaStar
            key={i}
            className={`mx-1 ${
              i < score ? "text-yellow-500" : "text-gray-300"
            }`}
            size={24}
          />
        ))}
      </div>
      <div className="text-purple-600 font-semibold">Attempts: {attempts}</div>
    </div>
  );
};

export default ScoreDisplay;
