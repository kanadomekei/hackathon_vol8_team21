import React from 'react'


async function getData() {
  const res = await fetch('https://api.example.com/...')
  

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  console.log
  return res.json()
}

const Genre = async () => {
  const data = await getData()
  
  
  return (
    <div>
      
    </div>
  )
}

export default Genre
