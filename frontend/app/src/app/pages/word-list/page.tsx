'use client'
import { headers } from 'next/headers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Genre = {
  id: number;
  name: string;
};

const GenreSelectionPage: React.FC = () => {
  const [genreDataList, setGenreDataList] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:8080/genres');
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          id: item.id,
          name: item.genre,
        }));
        setGenreDataList(formattedData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h2 style={styles.headerText}>ITwords</h2>
      </header>
      <div style={styles.container}>
        <h1 style={styles.title}>ジャンルを選択</h1>
        {genreDataList.map((genre) => (
          <Link href={`/pages/word-question/${genre.id}`} key={genre.id} style={styles.link}>
            <button style={styles.genreButton}>
              {genre.name} ({genre.id})
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

// ... existing styles ...

export default GenreSelectionPage;