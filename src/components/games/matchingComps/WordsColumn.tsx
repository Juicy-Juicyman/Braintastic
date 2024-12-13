import React from 'react';
import { MatchItems } from '@/types/gametypes';

interface WordsColumnProps {
  items: MatchItems[];
  matched: MatchItems[];
  incorrectItemId: number | null;
  justMatchedId: number | null;
  onWordClick: (targetName: string) => void;
}

const WordsColumn: React.FC<WordsColumnProps> = ({
  items,
  matched,
  incorrectItemId,
  justMatchedId,
  onWordClick
}) => {
  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-[45%] mt-4 md:mt-0">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Words</h3>
      {/* Single column */}
      <div className="flex flex-col gap-3">
        {items.map(item => {
          const isIncorrect = item.id === incorrectItemId;
          const isMatchedNow = item.id === justMatchedId;

          return (
            <div
              key={item.id + '-word'}
              onClick={() => onWordClick(item.name)}
              className={`bg-green-200 border border-purple-400 rounded cursor-pointer p-2
              text-xs sm:text-sm font-semibold text-gray-800 text-center
              whitespace-normal break-all
              flex items-center justify-center
              ${isIncorrect ? 'incorrect-shake' : ''}
              ${isMatchedNow ? 'correct-snap' : ''}`}
              style={{
                overflowWrap: 'break-word',
                wordBreak: 'break-all',
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordsColumn;
