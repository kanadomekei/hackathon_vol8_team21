import React from 'react'


// async function getData() {


//   const res = await fetch('http://localhost:')

  

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   console.log
//   return res.json()
// }


type GenreProps = {
  genre: {
    id: number;
    name: string;
  };
};

const Genre: React.FC<GenreProps> = ({ genre }) => {
  return (
    <div className='bg-gray-200 hover:bg-gray-300 py-8 border-t-2 border-black text-center'>
      <p>{genre.name}</p>
    </div>
  );
};

export default Genre;
