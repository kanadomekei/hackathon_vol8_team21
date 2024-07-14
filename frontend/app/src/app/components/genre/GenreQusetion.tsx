import React from 'react'




type GenreProps = {
  genre: {
    id: number;
    genre: string;
  };
};

const Genre: React.FC<GenreProps> = ({ genre }) => {
  return (
    <div className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow">
      <p className='text-xl'>{genre.genre}</p>
    </div>
  );
};

export default Genre;
