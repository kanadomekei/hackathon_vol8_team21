import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className='border-b-2'>
        <div className='mx-5 my-6'>
      <Link href="/" className="">
        IT単語app

      </Link>
        </div>
      <nav>
      </nav>
    </header>
  );
};

export default Header;
