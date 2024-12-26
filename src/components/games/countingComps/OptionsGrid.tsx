import React from "react";

interface OptionsGridProps {
  options: number[];
  onOptionClick: (option: number) => void;
  disabled: boolean;
}

const OptionsGrid: React.FC<OptionsGridProps> = ({
  options,
  onOptionClick,
  disabled,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`bg-purple-400 p-3 sm:p-4 md:p-5 rounded-full transition-colors duration-200 text-lg sm:text-xl font-semibold text-black ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
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
