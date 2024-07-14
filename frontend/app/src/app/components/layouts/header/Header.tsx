import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 p-4">
        <div className='mx-5 my-4'>
      <Link href="/" className="">
      <h2 className="text-white text-2xl font-bold">ITwords</h2>
      </Link>
        </div>
      <nav>
      </nav>
    </header>
  );
};

export default Header;
