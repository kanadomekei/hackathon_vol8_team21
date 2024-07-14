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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center mt-3">ジャンルを選択</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {genreDataList.map((genre) => (
            <Link href={`/pages/select-mode/card/${genre.name}`} key={genre.id} className="block">
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow">
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