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
  const [filteredData, setFilteredData] = useState<WordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/data/genre/${params.genre}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.genre]);

  useEffect(() => {
    const filtered = data.filter(item =>
      item.word_term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.word_explanation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
      <p className="text-center p-4 text-red-500">Error: {error}</p>
    </div>
  );

  if (data.length === 0) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
      <p className="text-center p-4">No data available for this genre.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800">単語リスト</h1>
          <div className="mb-6 flex justify-end">
            <input
              type="text"
              placeholder="検索..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="w-1/2 py-3 px-4 text-left text-indigo-800 font-semibold">用語</th>
                  <th className="w-1/2 py-3 px-4 text-left text-indigo-800 font-semibold">説明</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 border-b">{item.word_term}</td>
                    <td className="py-3 px-4 border-b">{item.word_explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && (
            <p className="text-center p-4 text-gray-600">検索結果がありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}