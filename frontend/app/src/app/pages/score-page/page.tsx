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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-indigo-800">Score: {score}/20</h1>
          </div>
          <div className="mb-6">
            <ul className="list-none p-0 space-y-2">
              {[...correctAnswers, ...incorrectAnswers].map((answer, index) => (
                <li key={answer.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-2xl">{getResultIcon(answer.id)}</span>
                  <span className="text-lg text-gray-800">{answer.correct_answer}</span>
                  <span className="text-lg text-gray-600">{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <button
              onClick={goHome}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              ホームへ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckResult;