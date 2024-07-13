import React from 'react';

const GenreSelectionPreview: React.FC = () => {
  // ジャンルのリストを定義
  const genres: string[] = ['ジャンル1', 'ジャンル2', 'ジャンル3', 'ジャンル4', 'ジャンル5', 'ジャンル6', 'ジャンル7'];

  // ジャンルボタンがクリックされたときの処理
  const handleGenreClick = (genre: string) => {
    console.log(`選択されたジャンル: ${genre}`);
    // ここに選択後の処理を追加
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>ジャンルを選択</h1>
        {genres.map((genre, index) => (
          <button
            key={index}
            style={styles.genreButton}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

// スタイルを定義
const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    backgroundColor: '#f5f5f5',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '300px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
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
    ':hover': {
      backgroundColor: '#f0f0f0',
    },
  } as React.CSSProperties,
};

export default GenreSelectionPreview;