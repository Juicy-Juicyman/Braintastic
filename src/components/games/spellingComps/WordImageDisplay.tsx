import Image from "next/image";
import React from "react";

interface WordImageDisplayProps {
  imageSrc: string;
}

const WordImageDisplay: React.FC<WordImageDisplayProps> = ({ imageSrc }) => {
  return (
    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
      <Image
        src={imageSrc}
        alt="Guess the word"
        fill
        className="object-contain"
      />
    </div>
  );
};

export default WordImageDisplay;
