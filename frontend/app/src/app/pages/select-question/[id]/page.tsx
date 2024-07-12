'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export const Select = () => {
  const [timer, setTimer] = useState(10);
  const [isChecked, setIsChecked] = useState(false);
  const [select, setSelect] = useState(false);

  const minus = () => setTimer(prevTimer => Math.max(prevTimer - 1, 0));
  const plus = () => setTimer(prevTimer => prevTimer + 1);
  const toggleSelect = () => setSelect(prevSelect => !prevSelect);

  return (
    <div className="flex flex-col items-center justify-center pt-3 bg-gray-100">
      <div className="bg-gray-300 w-80 flex flex-col items-center py-5 px-5 rounded-2xl text-center space-y-4">
        <div className="flex items-center space-x-2">
          <h2>制限時間</h2>
          <button onClick={minus} className="bg-gray-400 rounded-full px-3 py-1">ー</button>
          <h2>{timer}秒</h2>
          <button onClick={plus} className="bg-gray-400 rounded-full px-3 py-1">＋</button>
          </div>
        </div>
      <div className="bg-gray-300 w-80 flex justify-center py-5 px-5 rounded-2xl text-center mt-5">
        <span
          onClick={toggleSelect}
          className={`flex items-center justify-center w-56 h-16 cursor-pointer bg-gray-400 rounded-xl p-1 ${select ? 'bg-blue-500' : ''}`}
        >
          <span className={select ? 'bg-gray-300 py-2 px-6 rounded-xl' : 'bg-gray-400 py-2 px-6 rounded-xl'}>4択</span>
          <span className="mx-1"> : </span>
          <span className={select ? 'bg-gray-400 py-2 rounded-xl px-4' : 'bg-gray-300 py-2 rounded-xl px-4'}>カード</span>
        </span>
      </div>
      <div className='bg-gray-300 py-2 px-2 my-4 rounded-xl'>
        {/* {select ? 
        <Link  href="/question">はじめる</Link>
        :
        <Link href="/word-list">はじめる</Link>
        } */}
      </div>
    </div>
  );
};

export default Select;
