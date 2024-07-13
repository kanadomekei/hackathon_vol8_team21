'use client'
import Link from 'next/link';
import React from 'react';

type Genre = {
  id: number;
  name: string;
};

const GenreSelectionPage: React.FC = () => {
  const genreDataList: Genre[] = [
    { id: 1, name: 'ジャンル1' },
    { id: 2, name: 'ジャンル2' },
    { id: 3, name: 'ジャンル3' },
    { id: 4, name: 'ジャンル4' },
    { id: 5, name: 'ジャンル5' },
    { id: 6, name: 'ジャンル6' },
    { id: 7, name: 'ジャンル7' },
  ];

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>ジャンルを選択</h1>
        {genreDataList.map((genre) => (
          <Link href={`/pages/word-question/${genre.id}`} key={genre.id} style={styles.link}>
            <button style={styles.genreButton}>
              {genre.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    margin: 0,
    backgroundColor: '#f5f5f5',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '90%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
  genreButton: {
    width: '100%',
    padding: '15px',
    margin: '5px 0',
    fontSize: '16px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
};

export default GenreSelectionPage;