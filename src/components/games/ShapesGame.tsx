"use client";

import React, { useState, useEffect } from 'react';
import { MatchItems } from '@/types/gametypes';
import { ALL_ITEMS } from '@/data/words';
import { getGameItems } from '@/utils/matchingGameUtils';
import { saveHighScore } from '@/utils/firebaseQueries'; 
import ImagesColumn from './matchingComps/ImagesColumn';
import WordsColumn from './matchingComps/WordsColumn';
import MatchedPairsDisplay from './matchingComps/MatchedPairsDisplay';
import GameOverScreen from './matchingComps/GameOverScreen';
import DescriptionBox from './matchingComps/DescriptionBox'; 

const ShapeMatchingGame: React.FC = () => {
  const [items, setItems] = useState<MatchItems[]>([]);
  const [matched, setMatched] = useState<MatchItems[]>([]);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [nickname, setNickname] = useState<string>(''); 
  const [isSaving, setIsSaving] = useState<boolean>(false); 
  const [incorrectItemId, setIncorrectItemId] = useState<number | null>(null);
  const [justMatchedId, setJustMatchedId] = useState<number | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  function initializeGame() {
    const gameItems = getGameItems(ALL_ITEMS);
    setItems(gameItems);
    setMatched([]);
    setIsGameFinished(false);
    setIncorrectItemId(null);
    setJustMatchedId(null);
    setSelectedItemId(null);
    setAttempts(0);
    setNickname('');
  }

  function handleImageClick(itemId: number) {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  }

  function handleWordClick(targetName: string) {
    if (selectedItemId === null) return;

    setAttempts((prev) => prev + 1); 

    const selectedItem = items.find(it => it.id === selectedItemId);
    if (!selectedItem) {
      setSelectedItemId(null);
      return;
    }

    if (selectedItem.name.toLowerCase() === targetName.toLowerCase()) {
      setJustMatchedId(selectedItem.id);
      setMatched(prev => [...prev, selectedItem]);

      const updatedItems = items.filter(it => it.id !== selectedItem.id);
      setItems(updatedItems);

      setTimeout(() => {
        setJustMatchedId(null);
        setSelectedItemId(null);
        checkIfGameFinished(updatedItems);
      }, 300);
    } else {
      setIncorrectItemId(selectedItem.id);
      setTimeout(() => setIncorrectItemId(null), 400);
      setSelectedItemId(null);
    }
  }

  function checkIfGameFinished(updatedItems: MatchItems[]) {
    if (updatedItems.length === 0) {
      setIsGameFinished(true);
    }
  }

  const handleSaveHighScore = async () => {
    if (nickname.trim() === '') {
      alert('Please enter a nickname!');
      return;
    }

    setIsSaving(true);
    await saveHighScore({
      nickname,
      score: matched.length,
      attempts,
      gameName: 'Shape Matching Game',
    });
    setIsSaving(false);
    alert('High score saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-600 mb-4">
        Shape/Color Matching
      </h1>

      {isGameFinished && (
        <div className="w-full max-w-md mb-4">
          <GameOverScreen onPlayAgain={initializeGame} />
          <div className="mt-4">
            <p className="text-gray-700 font-medium">Attempts: {attempts}</p>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <button
              onClick={handleSaveHighScore}
              disabled={isSaving}
              className={`w-full mt-2 px-4 py-2 text-white rounded ${
                isSaving ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } transition`}
            >
              {isSaving ? 'Saving...' : 'Save High Score'}
            </button>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/2 mt-6 mx-auto">
        <DescriptionBox description="Welcome to the Shape/Color Matching Game! This fun and engaging activity is designed to sharpen your memory and matching skills. To play, click on an image of a shape or color in the top/left column, then click on the corresponding word in the bottom/right column. Match all pairs to win!"/>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-4xl mt-4 md:mt-6 gap-4 mx-auto">
        <ImagesColumn
          items={items}
          isGameFinished={isGameFinished}
          incorrectItemId={incorrectItemId}
          justMatchedId={justMatchedId}
          selectedItemId={selectedItemId}
          onImageClick={handleImageClick}
        />

        <div className="flex-1 flex flex-col gap-4">
          <WordsColumn
            items={items}
            matched={matched}
            incorrectItemId={incorrectItemId}
            justMatchedId={justMatchedId}
            onWordClick={handleWordClick}
          />
          <MatchedPairsDisplay matched={matched} />
        </div>
      </div>
    </div>
  );
};

export default ShapeMatchingGame;
