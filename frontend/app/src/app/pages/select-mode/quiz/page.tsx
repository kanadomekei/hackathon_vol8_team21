'use client'
import Genre from '@/app/components/genre/GenreQusetion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Genre = {
  id: number;
  genre: string;
};

const Page: React.FC = () => {
  const [genreDataList, setGenreDataList] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/genres');
        const data = await response.json();
        setGenreDataList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className='text-2xl text-center mt-5'>ジャンルを選択する</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 px-4">
      {genreDataList.map((genre) => (
        <Link href={`/pages/select-mode/quiz/${genre.id}`} key={genre.id}>
          <Genre genre={genre} />
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Page;
