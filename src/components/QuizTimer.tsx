import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import clsx from 'clsx';

export const QuizTimer: React.FC = () => {
  const { timeRemaining, decrementTimer, completeQuiz } = useQuizStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        decrementTimer();
      } else {
        completeQuiz();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, decrementTimer, completeQuiz]);

  return (
    <div className={clsx(
      'flex items-center gap-2 text-lg font-semibold px-4 py-2 rounded-lg transition-colors duration-200',
      timeRemaining <= 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-black'
    )}>
      <Timer className="w-6 h-6" />
      <span>{timeRemaining}s</span>
    </div>
  );
};