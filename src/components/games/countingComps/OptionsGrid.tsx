import React from 'react';

interface OptionsGridProps {
  options: number[];
  onOptionClick: (option: number) => void;
  disabled: boolean;
}

const OptionsGrid: React.FC<OptionsGridProps> = ({ options, onOptionClick, disabled }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`bg-yellow-200 p-3 sm:p-4 md:p-5 rounded-full transition-colors duration-200 text-lg sm:text-xl font-semibold text-purple-800 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300'
          }`}
          onClick={() => onOptionClick(option)}
          disabled={disabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsGrid;
