import React from "react";

interface WordImageDisplayProps {
  imageSrc: string;
}

const WordImageDisplay: React.FC<WordImageDisplayProps> = ({ imageSrc }) => {
  return (
    <img
      src={imageSrc}
      alt="Guess the word"
      className="w-full h-64 object-contain mb-6 rounded-lg"
    />
  );
};

export default WordImageDisplay;
