import React from 'react'




type GenreProps = {
  genre: {
    id: number;
    genre: string;
  };
};

const Genre: React.FC<GenreProps> = ({ genre }) => {
  return (
    <div className='transition-transform transform hover:scale-105 bg-gray-100 hover:bg-gray-300 py-16 border-2 border-black text-center shadow-inner m-8'>
      <p className='text-xl'>{genre.genre}</p>
    </div>
  );
};

export default Genre;
