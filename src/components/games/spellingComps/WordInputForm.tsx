import React from 'react';

interface WordInputFormProps {
  userInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const WordInputForm: React.FC<WordInputFormProps> = ({ userInput, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <input
        type="text"
        value={userInput}
        onChange={onChange}
        className="w-full p-3 sm:p-4 md:p-5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-lg sm:text-xl"
        placeholder="Type the word"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-200 text-lg sm:text-xl font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default WordInputForm;
