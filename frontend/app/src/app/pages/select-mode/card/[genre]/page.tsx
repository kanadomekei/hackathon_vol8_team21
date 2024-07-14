'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type WordData = {
  id: string;
  genre_term: string;
  word_term: string;
  word_definition: string;
  word_explanation: string;
  question_content: string;
  correct_answer: string;
  difficulty: string;
};

type Props = {
  params: { genre: string };
};

export default function IntegratedWordQuiz({ params }: Props) {
  const [data, setData] = useState<WordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [knownWords, setKnownWords] = useState<WordData[]>([]);
  const [unknownWords, setUnknownWords] = useState<WordData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/data/genre_with_limit/${params.genre}?limit=10`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.error('Fetch error:', e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.genre]);

  const handleNextWord = (isKnown: boolean) => {
    const currentWord = data[currentIndex];
    if (isKnown) {
      setKnownWords([...knownWords, currentWord]);
    } else {
      setUnknownWords([...unknownWords, currentWord]);
    }

    if (currentIndex === data.length - 1) {
      setShowResult(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">データを読み込んでいます...</div>;
  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen text-red-500">
      <p>エラーが発生しました: {error}</p>
      <p className="mt-2 text-sm text-gray-600">
        サーバーが起動しているか、正しいURLを使用しているか確認してください。
      </p>
    </div>
  );
  if (data.length === 0) return <div className="flex justify-center items-center h-screen">このジャンルのデータはありません。</div>;

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">結果</h1>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-blue-800">知っている単語</h2>
        <ul className="mb-10">
          {knownWords.map(word => (
            <li key={word.id} className="mb-4 bg-green-100 p-4 rounded-lg shadow-sm">
              <span className="font-bold text-xl text-gray-700">{word.word_term}</span>: 
              <span className="text-lg text-gray-700"> {word.word_explanation}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-6 text-red-600">知らない単語</h2>
        <ul>
          {unknownWords.map(word => (
            <li key={word.id} className="mb-4 bg-red-100 p-4 rounded-lg shadow-sm">
              <span className="font-bold text-xl text-gray-700">{word.word_term}</span>: 
              <span className="text-lg text-gray-700"> {word.word_explanation}</span>
            </li>
          ))}
        </ul>
      </div>
      <button><Link href="/"></Link>ホームへ</button>
    </div>
    
    );
  }

  const currentWord = data[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{params.genre} 単語</h1>
      <div className="max-w-md mx-auto bg-white  rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-4xl mb-2 text-center">{currentWord.word_term}</div>
          <div className="text-gray-600 text-center">
            {currentIndex + 1} / {data.length}
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-center space-x-16 mt-72">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-full"
              onClick={() => handleNextWord(true)}
            >
              知ってる
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-8 px-4  rounded-full"
              onClick={() => handleNextWord(false)}
            >
              知らない
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}