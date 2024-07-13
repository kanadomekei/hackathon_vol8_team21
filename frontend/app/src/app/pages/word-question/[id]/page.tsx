'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Question from '../../genre/question/page';

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

const WordPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<WordQuestion[]>([]);
  const [unknownWords, setUnknownWords] = useState<WordQuestion[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (currentIndex >= genreDataList.length) {
      localStorage.setItem('knownWords', JSON.stringify(knownWords));
      localStorage.setItem('unknownWords', JSON.stringify(unknownWords));
      router.push('/pages/check-result');
    }
  }, [currentIndex, knownWords, unknownWords, router]);

  const handleKnown = () => {
    setKnownWords([...knownWords, genreDataList[currentIndex]]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleUnknown = () => {
    setUnknownWords([...unknownWords, genreDataList[currentIndex]]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className='my-24'>
        {genreDataList[currentIndex] ? (
          <Question question={genreDataList[currentIndex]} />
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
