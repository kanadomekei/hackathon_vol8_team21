import React from 'react';

type WordQuestionProps = {
  trem: string;
};

const WordQuestion: React.FC<WordQuestionProps> = ({ trem  }) => {
  return (
    <div className="flex items-center justify-center h-1/2 border-b">
      <h1 className="text-3xl">{trem}</h1>
    </div>
  );
};

export default WordQuestion;
