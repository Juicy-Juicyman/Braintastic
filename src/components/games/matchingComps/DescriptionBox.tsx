import React from 'react';

interface DescriptionBoxProps {
  description: string;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ description }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
      <h2 className="text-lg font-bold text-purple-600 mb-2">Game Description</h2>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
};

export default DescriptionBox;
