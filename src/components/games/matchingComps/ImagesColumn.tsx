import React from "react";
import { MatchItems } from "@/types/gametypes";
import Image from "next/image";

interface ImagesColumnProps {
  items: MatchItems[];
  isGameFinished: boolean;
  incorrectItemId: number | null;
  justMatchedId: number | null;
  selectedItemId: number | null;
  onImageClick: (itemId: number) => void;
}

const ImagesColumn: React.FC<ImagesColumnProps> = ({
  items,
  isGameFinished,
  incorrectItemId,
  justMatchedId,
  selectedItemId,
  onImageClick,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-[45%] h-auto md:h-[35vh]">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center text-purple-600">
        Shapes / Colors
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {items.map((item) => {
          const isIncorrect = item.id === incorrectItemId;
          const isMatchedNow = item.id === justMatchedId;
          const isSelected = item.id === selectedItemId;

          return (
            <div
              key={item.id}
              onClick={() => !isGameFinished && onImageClick(item.id)}
              className={`h-16 bg-gray-100 flex items-center justify-center cursor-pointer text-xs sm:text-sm font-semibold text-gray-800 border border-gray-300 rounded
              ${isIncorrect ? "incorrect-shake" : ""}
              ${isMatchedNow ? "correct-snap" : ""}
              ${isSelected ? "ring-2 ring-purple-500" : ""}`}
            >
              {item.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                item.name
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagesColumn;
