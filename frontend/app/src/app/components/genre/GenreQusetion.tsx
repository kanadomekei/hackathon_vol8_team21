import React from 'react'




type GenreProps = {
  genre: {
    id: number;
    genre: string;
  };
};

const Genre: React.FC<GenreProps> = ({ genre }) => {
  return (
    <div className='bg-gray-200 hover:bg-gray-300 py-8 border-t-2 border-black text-center'>
      <p>{genre.genre}</p>
    </div>
  );
};

export default Genre;
