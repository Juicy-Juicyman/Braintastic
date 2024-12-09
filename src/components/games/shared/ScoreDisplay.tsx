import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="mt-6">
      <p className="text-xl sm:text-2xl font-bold text-gray-700">
        Score: {score}
      </p>
    </div>
  );
};

export default ScoreDisplay;
