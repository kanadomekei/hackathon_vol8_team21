'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Question from '../../genre/question/page';

type WordQestion = {
  id: number;
  genre_id: number;
  trem: string;
  definition: string;
  explanation: string;
};

const WordPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<WordQestion[]>([]);
  const [unknownWords, setUnknownWords] = useState<WordQestion[]>([]);
  const router = useRouter();

  const words: WordQestion[] = [

import React, { useState } from 'react';

type WordQuestion = {
    id: number;
    genre_id: number;
    trem: string;
    definition: string;
    explanation: string;
};

const genreDataList: WordQuestion[] = [
    { id: 1, genre_id: 1, trem: 'trem 1A', definition: 'definition 1A', explanation: 'explanation 1A' },
    { id: 2, genre_id: 2, trem: 'trem 2A', definition: 'definition 2A', explanation: 'explanation 2A' },
    { id: 3, genre_id: 3, trem: 'trem 3A', definition: 'definition 3A', explanation: 'explanation 3A' },
    { id: 4, genre_id: 4, trem: 'trem 1B', definition: 'definition 1B', explanation: 'explanation 1B' },
    { id: 5, genre_id: 5, trem: 'trem 2B', definition: 'definition 2B', explanation: 'explanation 2B' },
    { id: 6, genre_id: 6, trem: 'trem 3B', definition: 'definition 3B', explanation: 'explanation 3B' },
    { id: 7, genre_id: 7, trem: 'trem 1C', definition: 'definition 1C', explanation: 'explanation 1C' },
    { id: 8, genre_id: 8, trem: 'trem 2C', definition: 'definition 2C', explanation: 'explanation 2C' },
    { id: 9, genre_id: 9, trem: 'trem 3C', definition: 'definition 3C', explanation: 'explanation 3C' }
  ];

  useEffect(() => {
    if (currentIndex >= words.length) {
      localStorage.setItem('knownWords', JSON.stringify(knownWords));
      localStorage.setItem('unknownWords', JSON.stringify(unknownWords));
      router.push('/pages/check-result');
    }
  }, [currentIndex, knownWords, unknownWords, router]);

  const handleKnown = () => {
    setKnownWords([...knownWords, words[currentIndex]]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleUnknown = () => {
    setUnknownWords([...unknownWords, words[currentIndex]]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
       <div className="flex flex-col items-center justify-between">
        <div className='my-24'>
      {words[currentIndex] ? (
        <Question question={words[currentIndex]} />
      ) : (
        <div>Loading...</div>
      )}
        </div>
      <div className="flex justify-around w-full py-16 border-t">
        <button onClick={handleKnown} className="bg-gray-300 rounded-full px-4 py-4">知ってる</button>
        <button onClick={handleUnknown} className="bg-gray-300 rounded-full px-4 py-4">知らない</button>
      </div>
    </div>
  );
};

export default WordPage;
];

export default function Page() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentQuestion = genreDataList[currentQuestionIndex];

    const handleAnswer = (known: boolean) => {
        // Here you can handle the user's response
        console.log(known ? "User knows the word" : "User doesn't know the word");
        
        // Move to the next question
        setCurrentQuestionIndex((prevIndex) => 
            (prevIndex + 1) % genreDataList.length
        );
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Status bar */}
            <div className="bg-black text-white text-center py-1">9:41</div>
            
            {/* Main content */}
            <div className="flex-1 flex flex-col justify-between p-4">
                {/* Word display */}
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-4xl font-bold">{currentQuestion.trem}</h1>
                </div>
                
                {/* Buttons */}
                <div className="flex justify-between space-x-4">
                    <button 
                        className="flex-1 bg-gray-200 text-black py-3 rounded-full font-semibold"
                        onClick={() => handleAnswer(true)}
                    >
                        知ってる
                    </button>
                    <button 
                        className="flex-1 bg-gray-200 text-black py-3 rounded-full font-semibold"
                        onClick={() => handleAnswer(false)}
                    >
                        知らない
                    </button>
                </div>
            </div>
        </div>
    );
}
