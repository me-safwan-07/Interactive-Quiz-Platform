import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { questions } from '../data/questions';

export const Navigation: React.FC = () => {
  const { currentQuestion, nextQuestion, previousQuestion, completeQuiz } = useQuizStore();

  return (
    <div className="flex justify-between items-center w-full max-w-2xl mt-6 bg-white p-4 rounded-xl shadow-lg">
      <button
        onClick={previousQuestion}
        disabled={currentQuestion === 0}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 transition-all duration-200 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Previous
      </button>

      {currentQuestion === questions.length - 1 ? (
        <button
          onClick={() => completeQuiz()}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <CheckCircle className="w-5 h-5" />
          Complete Quiz
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};