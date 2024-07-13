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
    <div>
      {genreDataList.map((genre) => (
        <Link href={`/pages/question/${genre.id}`} key={genre.id}>
          <Genre genre={genre} />
        </Link>
      ))}
    </div>
  );
};

export default Page;
