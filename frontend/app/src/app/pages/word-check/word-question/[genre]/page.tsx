'use client';

import { useState, useEffect } from 'react';

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
        const response = await fetch(`http://localhost:8080/data/genre_with_limit/${params.genre}?limit=10`);
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

  const handleNextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data.length === 0) return <p>No data available for this genre.</p>;

  const currentWord = data[currentIndex];

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{params.genre} 単語</h1>
      <div key={currentWord.id} style={{ marginBottom: '20px' }}>
        <h2>{currentWord.word_term}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <button
            style={{ padding: '10px 20px', borderRadius: '50%', backgroundColor: '#e0e0e0' }}
            onClick={handleNextWord}
          >
            知ってる
          </button>
          <button
            style={{ padding: '10px 20px', borderRadius: '50%', backgroundColor: '#e0e0e0' }}
            onClick={handleNextWord}
          >
            知らない
          </button>
        </div>
      </div>
    </div>
  );
}