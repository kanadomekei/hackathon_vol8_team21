'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Select = () => {
  const [timer, setTimer] = useState(10);
  const [isChecked, setIsChecked] = useState(false);
  const [select, setSelect] = useState(true);
  const router = useRouter();

  const minus = () => setTimer(prevTimer => Math.max(prevTimer - 1, 0));
  const plus = () => setTimer(prevTimer => prevTimer + 1);
  const toggleSelect = () => setSelect(prevSelect => !prevSelect);

  const handleStart = () => {
    if (select) {
      router.push('/pages/select-mode/quiz');
    } else {
      router.push('/pages/select-mode/card');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-800">回答時間</h2>
              <button onClick={minus} className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 transition duration-300">ー</button>
              <h2 className="text-xl font-bold text-indigo-600">{timer}秒</h2>
              <button onClick={plus} className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 transition duration-300">＋</button>
            </div>
          </div>
          <div className="mb-8">
            <span
              onClick={toggleSelect}
              className={`flex items-center justify-center w-full h-16 cursor-pointer bg-gray-200 rounded-xl p-1 transition duration-300 ${select ? 'bg-indigo-100' : ''}`}
            >
              <span className={`py-2 px-6 rounded-xl transition duration-300 ${select ? 'bg-indigo-500 text-white' : 'bg-gray-300'}`}>4択</span>
              <span className="mx-2 text-gray-500"> : </span>
              <span className={`py-2 rounded-xl px-4 transition duration-300 ${select ? 'bg-gray-300' : 'bg-indigo-500 text-white'}`}>カード</span>
            </span>
          </div>
          <div className="text-center">
            <button 
              onClick={handleStart} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              はじめる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;