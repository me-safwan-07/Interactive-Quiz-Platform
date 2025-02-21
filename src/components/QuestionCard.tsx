import React from 'react';
import { useQuizStore } from '../store/quizStore';
import clsx from 'clsx';
import { CheckCircle } from 'lucide-react';

export const QuestionCard: React.FC = () => {
  const { currentQuestion, answers, answerQuestion, currentQuestions } = useQuizStore();
  const question = currentQuestions[currentQuestion];

  if (!question) return null;

  const handleAnswer = (answer: string | number) => {
    answerQuestion(question.id, answer);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full transform transition-all duration-200 hover:shadow-xl">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </span>
          <span className="text-sm font-medium px-4 py-2 bg-green-100 text-green-800 rounded-full">
            {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Numerical Answer'}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>
      </div>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === option;
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={clsx(
                  'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group hover:border-blue-400',
                  isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'hover:bg-gray-50 border-gray-200'
                )}
              >
                <span className={clsx('font-medium', isSelected ? 'text-blue-700' : 'text-gray-700')}>
                  {option}
                </span>
                {isSelected && <CheckCircle className="w-5 h-5 text-blue-500" />}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'integer' && (
        <div className="relative">
          <input
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(parseInt(e.target.value, 10))}
            className="w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg font-medium"
            placeholder="Enter your numerical answer..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="text-gray-400">#</span>
          </div>
        </div>
      )}
    </div>
  );
};