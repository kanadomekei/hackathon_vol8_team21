

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
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.options];

  answers.sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="my-24 text-center">
        <h1 className="text-xl font-bold">{currentQuestion.question_content}</h1>
        <h3>{currentQuestionIndex}/20</h3>
      </div>
      <div className="flex flex-col space-y-4 w-full px-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className="bg-gray-300 rounded-full py-4 text-center text-lg"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
