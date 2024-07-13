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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data.length === 0) return <p>No data available for this genre.</p>;

  return (
    <div>
      <h1>{params.genre} Word List</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.word_term} ({item.word_definition})</h2>
          <p><strong>説明:</strong> {item.word_explanation}</p>
        </div>
      ))}
    </div>
  );
}