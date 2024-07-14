'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type QuestionType = {
  id: number;
  question_content: string;
  correct_answer: string;
  options: string[];
};

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<QuestionType[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<QuestionType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:8080/quiz/Security/21');
        const data: QuestionType[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, currentQuestion]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestion]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      localStorage.setItem('score', (score + (answer === currentQuestion.correct_answer ? 1 : 0)).toString());
      localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
      localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
      router.push('/pages/score-page');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-indigo-800">Loading...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.options];

  answers.sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-indigo-800 mb-2">{currentQuestion.question_content}</h1>
            <h3 className="text-lg text-gray-600">{currentQuestionIndex + 1}/20</h3>
          </div>
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;