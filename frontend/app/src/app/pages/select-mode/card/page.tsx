'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Genre = {
  id: number;
  name: string;
};

const GenreSelectionPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800">ジャンルを選択</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {genreDataList.map((genre) => (
            <Link href={`/pages/select-mode/card/${genre.name}`} key={genre.id} className="block">
              <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                {genre.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreSelectionPage;