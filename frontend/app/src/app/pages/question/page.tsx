import Genre from '@/app/components/genre/GenreQusetion'
import Link from 'next/link';
import React from 'react'

type Genre = {
    id: number;
    name: string;
  };

  const Page: React.FC = () => {
    const genreDataList: Genre[] = [
      { id: 1, name: 'genre 1A' },
      { id: 2, name: 'genre 2A' },
      { id: 3, name: 'genre 3A' },
      { id: 4, name: 'genre 1B' },
      { id: 5, name: 'genre 2B' },
      { id: 6, name: 'genre 3B' },
      { id: 7, name: 'genre 1C' },
      { id: 8, name: 'genre 2C' },
      { id: 9, name: 'genre 3C' }
    ];
  
    return (
      <div>
        {genreDataList.map((genre) => (
            <Link href={`/pages/question/${genre.id}`} key={genre.id} >
          <Genre key={genre.id} genre={genre} />
          </Link>
        ))}
      </div>
    );
  };
  
  export default Page;
