'use client'

import React, { useState } from 'react';

const App = () => {
  const [timer, setTimer] = useState(10);
  const [isChecked, setIsChecked] = useState(false);
  const [select, setSelect] = useState(false);

  const minus = () => setTimer(prevTimer => Math.max(prevTimer - 1, 0));
  const plus = () => setTimer(prevTimer => prevTimer + 1);
  const toggleSelect = () => setSelect(prevSelect => !prevSelect);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-300 w-80 flex flex-col items-center py-5 px-5 rounded-2xl text-center space-y-4">
        <div className="flex items-center space-x-2">
          <h2>制限時間</h2>
          <button onClick={minus} className="bg-gray-400 rounded-full px-3 py-1">ー</button>
          <h2>{timer}秒</h2>
          <button onClick={plus} className="bg-gray-400 rounded-full px-3 py-1">＋</button>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
      </div>
      <div className="w-80 flex justify-center  rounded-2xl text-center mt-5">
        <span
          onClick={toggleSelect}
          className={`flex items-center justify-center w-56 h-16 cursor-pointer bg-gray-300 rounded-xl p-1`}
        >
          <span className={select ? 'bg-white px-6 py-2 rounded-xl' : 'bg-gray-300 px-6 py-2 rounded-xl'}>4択</span>
          <span className="mx-1"> : </span>
          <span className={select ? 'bg-gray-300 px-5 py-2 rounded-xl' : 'bg-white px-5 py-2 rounded-xl'}>カード</span>
        </span>
      </div>
    </div>
  );
};

export default App;
