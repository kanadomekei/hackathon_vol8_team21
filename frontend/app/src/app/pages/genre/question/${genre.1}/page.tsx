import Link from 'next/link'
import React from 'react'

const genre = () => {
  return (
    <div>
        <div>
            <Link href={'/genre/${genre.1}'}></Link>
        </div>
      {/* {genres.map((genre) => (
        <div key={genre.id}>
          <Link href={`/genre/${genre.id}`}>
            <a>
              <h2>{genre.name}</h2>
            </a>
          </Link>
        </div>
      ))
        
    } */}
    </div>
  )
}

export default genre
