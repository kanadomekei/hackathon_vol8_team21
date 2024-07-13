'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type QuestionType = {
  id: number;
  word_id: number;
  content: string;
  correct: string;
  incorrect_answer1: string;
  incorrect_answer2: string;
  incorrect_answer3: string;
  difficulty: number;
};

const questions: QuestionType[] = [
    { id: 1, word_id: 1, content: 'content 1A', correct: 'correct 1A', incorrect_answer1: 'incorrect_answer1 1A',incorrect_answer2: 'incorrect_answer2 1A',incorrect_answer3: 'incorrect_answer3 1A', difficulty: 1},
    { id: 2, word_id: 2, content: 'content 2A', correct: 'correct 2A', incorrect_answer1: 'incorrect_answer1 2A',incorrect_answer2: 'incorrect_answer2 2A',incorrect_answer3: 'incorrect_answer3 2A', difficulty: 2},
    { id: 3, word_id: 3, content: 'content 3A', correct: 'correct 3A', incorrect_answer1: 'incorrect_answer1 3A',incorrect_answer2: 'incorrect_answer2 3A',incorrect_answer3: 'incorrect_answer3 3A', difficulty: 3},
    { id: 4, word_id: 4, content: 'content 4A', correct: 'correct 4A', incorrect_answer1: 'incorrect_answer1 4A',incorrect_answer2: 'incorrect_answer2 4A',incorrect_answer3: 'incorrect_answer3 4A', difficulty: 4},
    { id: 5, word_id: 5, content: 'content 5A', correct: 'correct 5A', incorrect_answer1: 'incorrect_answer1 5A',incorrect_answer2: 'incorrect_answer2 5A',incorrect_answer3: 'incorrect_answer3 5A', difficulty: 5},
    { id: 6, word_id: 6, content: 'content 6A', correct: 'correct 6A', incorrect_answer1: 'incorrect_answer1 6A',incorrect_answer2: 'incorrect_answer2 6A',incorrect_answer3: 'incorrect_answer3 6A', difficulty: 6},
    { id: 7, word_id: 7, content: 'content 7A', correct: 'correct 7A', incorrect_answer1: 'incorrect_answer1 7A',incorrect_answer2: 'incorrect_answer2 7A',incorrect_answer3: 'incorrect_answer3 7A', difficulty: 7},
    { id: 8, word_id: 8, content: 'content 8A', correct: 'correct 8A', incorrect_answer1: 'incorrect_answer1 8A',incorrect_answer2: 'incorrect_answer2 8A',incorrect_answer3: 'incorrect_answer3 8A', difficulty: 8},
    { id: 9, word_id: 9, content: 'content 9A', correct: 'correct 9A', incorrect_answer1: 'incorrect_answer1 9A',incorrect_answer2: 'incorrect_answer2 9A',incorrect_answer3: 'incorrect_answer3 9A', difficulty: 9},
];

const Question: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState<QuestionType[]>([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState<QuestionType[]>([]);
    const router = useRouter();
  
    const handleAnswerClick = (answer: string) => {
      const currentQuestion = questions[currentQuestionIndex];

      if (answer === currentQuestion.correct) {
        setScore(score + 1);
        setCorrectAnswers([...correctAnswers, currentQuestion]);
      } else {
        setIncorrectAnswers([...incorrectAnswers, currentQuestion]);
      }
  
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        localStorage.setItem('score', (score + (answer === currentQuestion.correct ? 1 : 0)).toString());
        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
        router.push('/pages/score-page');
      }
    };
  
    const currentQuestion = questions[currentQuestionIndex];
    const answers = [
      currentQuestion.correct,
      currentQuestion.incorrect_answer1,
      currentQuestion.incorrect_answer2,
      currentQuestion.incorrect_answer3,
    ];
  
    answers.sort(() => Math.random() - 0.5);
  
    return (
      <div className="flex flex-col items-center justify-between">
        <div className="my-24 text-center">
          <h1 className="text-4xl font-bold">{currentQuestion.content}</h1>
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
