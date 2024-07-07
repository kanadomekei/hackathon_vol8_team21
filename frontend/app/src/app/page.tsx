import { FC } from 'react';

type Post = {
  id: number;
  title: string;
};

async function getPost() {
  const res = await fetch('http://backend:3000/posts');

  if (!res.ok) {
    throw new Error('Failed to fetch Post');
  }

  return res.json();
}

const Home: FC = async () => {
  const posts: Post[] = await getPost();

  return (
    <div className="m-4">
      <h1 className="text-4xl mb-4 underline">Post List</h1>
      {posts.map((post) => (
        <p className="mb-1" key={post.id}>
          {post.title}
        </p>
      ))}
    </div>
  );
};

export default Home;
