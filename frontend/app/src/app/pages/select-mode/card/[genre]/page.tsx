'use client';

import React, { useState, useEffect } from 'react';

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

export default function GenreWordList({ params }: Props) {
  const [data, setData] = useState<WordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ローカル開発環境のURLに戻します
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

  const handleNextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
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

  const currentWord = data[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{params.genre} 単語</h1>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">{currentWord.word_term}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleNextWord}
            >
              知ってる
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleNextWord}
            >
              知らない
            </button>
          </div>
          <div className="mt-8 text-center">
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={handleNextWord}
            >
              次の単語 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}