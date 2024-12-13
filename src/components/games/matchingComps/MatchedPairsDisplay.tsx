import React from 'react';
import { MatchItems } from '@/types/gametypes';

interface MatchedPairsDisplayProps {
  matched: MatchItems[];
}

const MatchedPairsDisplay: React.FC<MatchedPairsDisplayProps> = ({ matched }) => {
  if (matched.length === 0) return null;

  return (
    <div className="mt-4 md:mt-6">
      <h4 className="font-bold text-base mb-2">Matched Pairs:</h4>
      <div className="flex flex-wrap gap-2">
        {matched.map(m => (
          <div key={m.id} className="px-2 py-1 bg-green-200 rounded-full text-gray-800 text-xs sm:text-sm">
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchedPairsDisplay;
