'use client';

import React, { useEffect, useState } from 'react';

type WordQestion = {
  id: number;
  genre_id: number;
  trem: string;
  definition: string;
  explanation: string;
};

const ResultPage: React.FC = () => {
  const [knownWords, setKnownWords] = useState<WordQestion[]>([]);
  const [unknownWords, setUnknownWords] = useState<WordQestion[]>([]);

  useEffect(() => {
    const storedKnownWords = localStorage.getItem('knownWords');
    const storedUnknownWords = localStorage.getItem('unknownWords');
    if (storedKnownWords) {
      setKnownWords(JSON.parse(storedKnownWords));
    }
    if (storedUnknownWords) {
      setUnknownWords(JSON.parse(storedUnknownWords));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">結果</h1>
      <div>
        <h2 className="text-xl font-semibold">知っている単語</h2>
        <ul>
          {knownWords.map(word => (
            <li key={word.id}>{word.trem}　　{word.definition}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold">知らない単語</h2>
        <ul>
          {unknownWords.map(word => (
            <li key={word.id}>{word.trem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPage;
