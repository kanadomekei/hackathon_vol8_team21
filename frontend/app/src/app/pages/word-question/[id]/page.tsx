import React from 'react'

type WordQestion = {
    id: number;
    genre_id: number;
    trem: string;
    definition: string;
    explanation: string;

  };

const page = () => {
    const genreDataList: WordQestion[] = [
        { id: 1, genre_id: 1, trem: 'trem 1A',definition: 'definition 1A',explanation: 'explanation 1A' },
        { id: 2, genre_id: 2, trem: 'trem 2A',definition: 'definition 2A',explanation: 'explanation 2A' },
        { id: 3, genre_id: 3, trem: 'trem 3A',definition: 'definition 3A',explanation: 'explanation 3A'},
        { id: 4, genre_id: 4, trem: 'trem 1B',definition: 'definition 1B',explanation: 'explanation 1B' },
        { id: 5, genre_id: 5, trem: 'trem 2B',definition: 'definition 2B',explanation: 'explanation 2B' },
        { id: 6, genre_id: 6, trem: 'trem 3B',definition: 'definition 3B',explanation: 'explanation 3B'},
        { id: 7, genre_id: 7, trem: 'trem 1C',definition: 'definition 1C',explanation: 'explanation 1C'},
        { id: 8, genre_id: 8, trem: 'trem 2C',definition: 'definition 2C',explanation: 'explanation 2C'},
        { id: 9, genre_id: 9, trem: 'trem 3C',definition: 'definition 3C',explanation: 'explanation 3C'}
      ];
  return (
    <div>
     <div>
        {genreDataList.map(question => (
        ))}
      </div>
    </div>
  )
}

export default page
