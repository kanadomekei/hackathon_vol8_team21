'use client'
import { headers } from 'next/headers';
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
      <header style={styles.header}>
        <h2 style={styles.headerText}>ITwords</h2>
      </header>
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
    backgroundColor: '#ffffff',
    paddingTop: '50px', // ヘッダーの高さを考慮して追加
  },
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    padding: '0 20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    maxWidth: '1800px',
    padding: '100px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '40px',
    marginBottom: '50px',
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
  genreButton: {
    width: '100%',
    padding: '15px',
    margin: '5px 0',
    fontSize: '30px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
};

export default GenreSelectionPage;