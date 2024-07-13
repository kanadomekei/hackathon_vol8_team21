import React from 'react';

type WordQuestionProps = {
  question: {
    id: number;
    genre_id: number;
    trem: string;
    definition: string;
    explanation: string;
  };
};

const WordQuestion: React.FC<WordQuestionProps> = ({ question }) => {
  return (
    <div className="p-4 border rounded shadow-md my-2">
      <h2 className="text-lg font-bold">{question.trem}</h2>
    </div>
  );
};

export default WordQuestion;
