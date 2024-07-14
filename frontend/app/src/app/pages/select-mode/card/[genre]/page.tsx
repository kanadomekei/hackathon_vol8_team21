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
  const [isWordVisible, setIsWordVisible] = useState(true);
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
    setIsWordVisible(false);

    const currentWord = data[currentIndex];
    if (isKnown) {
      setKnownWords([...knownWords, currentWord]);
    } else {
      setUnknownWords([...unknownWords, currentWord]);
    }

    setTimeout(() => {
      if (currentIndex === data.length - 1) {
        setShowResult(true);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsWordVisible(true);
      }
    }, 300); // Reduced delay for a quicker transition
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-red-800">
      <p className="text-2xl font-bold mb-4">エラーが発生しました</p>
      <p className="text-lg">{error}</p>
      <p className="mt-4 text-sm text-gray-600">
        サーバーが起動しているか、正しいURLを使用しているか確認してください。
      </p>
    </div>
  );

  if (data.length === 0) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 text-indigo-800">
      <p className="text-2xl font-bold">このジャンルのデータはありません。</p>
    </div>
  );

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">学習結果</h1>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-green-700">知っている単語</h2>
              <ul className="space-y-4">
                {knownWords.map(word => (
                  <li key={word.id} className="bg-green-50 p-4 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md">
                    <span className="font-bold text-xl text-gray-800">{word.word_term}</span>: 
                    <span className="text-lg text-gray-700 ml-2">{word.word_explanation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-red-700">知らない単語</h2>
              <ul className="space-y-4">
                {unknownWords.map(word => (
                  <li key={word.id} className="bg-red-50 p-4 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md">
                    <span className="font-bold text-xl text-gray-800">{word.word_term}</span>: 
                    <span className="text-lg text-gray-700 ml-2">{word.word_explanation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <Link href="/" className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
                ホームへ戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = data[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">{params.genre} 単語</h1>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className={`text-3xl font-bold text-center mb-4 text-gray-800 transition-opacity duration-300 ${isWordVisible ? 'opacity-100' : 'opacity-0'}`}>
              {currentWord.word_term}
            </div>
            <div className="text-xl text-center text-gray-600 mb-6">{currentIndex + 1} / {data.length}</div>
            
            <div className="flex justify-center space-x-4">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={() => handleNextWord(true)}
              >
                知ってる
              </button>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => handleNextWord(false)}
              >
                知らない
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={() => setShowResult(true)}
          >
            終了する
          </button>
        </div>
      </div>
    </div>
  );
}