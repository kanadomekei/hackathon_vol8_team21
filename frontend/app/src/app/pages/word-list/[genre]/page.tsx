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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/data/genre/${params.genre}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.genre]);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;
  if (data.length === 0) return <p className="text-center p-4">No data available for this genre.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">単語リスト</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/2 py-2 px-4 border-b text-left">用語</th>
            <th className="w-1/2 py-2 px-4 border-b text-left">説明</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="py-2 px-4 border-b">{item.word_term}</td>
              <td className="py-2 px-4 border-b">{item.word_explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}