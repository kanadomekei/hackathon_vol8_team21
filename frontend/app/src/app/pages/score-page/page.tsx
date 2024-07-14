'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type QuestionType = {
  id: number;
  word_id: number;
  content: string;
  correct: string;
  correct_answer: string;
  incorrect_answer1: string;
  incorrect_answer2: string;
  incorrect_answer3: string;
  difficulty: number;
};

const CheckResult: React.FC = () => {
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<QuestionType[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<QuestionType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedScore = localStorage.getItem('score');
    const storedCorrectAnswers = localStorage.getItem('correctAnswers');
    const storedIncorrectAnswers = localStorage.getItem('incorrectAnswers');

    if (storedScore) setScore(parseInt(storedScore));
    if (storedCorrectAnswers) setCorrectAnswers(JSON.parse(storedCorrectAnswers));
    if (storedIncorrectAnswers) setIncorrectAnswers(JSON.parse(storedIncorrectAnswers));
  }, []);

  const goHome = () => {
    router.push('/');
  };

  const totalQuestions = correctAnswers.length + incorrectAnswers.length;

  const getResultIcon = (index: number) => {
    const isCorrect = correctAnswers.some((q) => q.id === index);
    return isCorrect ? '⭕️' : '❌';
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="my-4 text-center">
        <h1 className="text-2xl font-bold">Score: {score}/20</h1>
      </div>
      <div className="w-full px-4">
        <ul className="list-none p-0">
        {[...correctAnswers, ...incorrectAnswers].map((answer, index) => (
            <li key={answer.id} className="flex items-center justify-between border-b-2 py-2">
              <span className="text-2xl">{getResultIcon(answer.id)}</span>
              <span className="text-2xl">{answer.correct_answer}</span>
              <span className="text-2xl">{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4">
        <button
          onClick={goHome}
          className="bg-gray-300 rounded-full py-2 px-4 text-center text-lg"
        >
          ホームへ
        </button>
      </div>
    </div>
  );
};

export default CheckResult;
