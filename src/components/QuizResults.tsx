import React, { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';
import { questions } from '../data/questions';
import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import confetti from 'canvas-confetti';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fireCelebration = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  // const randomInRange = (min: number, max: number) => {
  //   return Math.random() * (max - min) + min;
  // };

  const confettiColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: confettiColors
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: confettiColors
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
};

export const QuizResults: React.FC = () => {
  const { answers, attempts, startQuiz, currentQuestions } = useQuizStore();

  useEffect(() => {
    fireCelebration();
  }, []);

  const calculateScore = () => {
    return currentQuestions.reduce((score, question) => {
      return score + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const score = calculateScore();
  const percentage = (score / questions.length) * 100;
  const incorrect = questions.length - score;

  // Current quiz performance data
  const currentQuizData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [score, incorrect],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  // Attempt history data
  const attemptHistoryData = {
    labels: attempts.slice(-5).map((_, index) => `Attempt ${attempts.length - 4 + index}`),
    datasets: [
      {
        label: 'Score',
        data: attempts.slice(-5).map(attempt => attempt.score),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Recent Attempts Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: questions.length,
      },
    },
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="celebration-sparkles"></div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-4 animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
            Congratulations!
          </h2>
          <p className="text-gray-600">You've completed the quiz!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-200">
            <p className="text-blue-800 mb-1 font-medium">Score</p>
            <p className="text-3xl font-bold text-blue-900">{score}/{questions.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-200">
            <p className="text-green-800 mb-1 font-medium">Percentage</p>
            <p className="text-3xl font-bold text-green-900">{percentage.toFixed(1)}%</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Current Quiz Performance</h3>
          <div className="w-48 h-48 mx-auto">
            <Pie data={currentQuizData} />
          </div>
        </div>

        {attempts.length > 1 && (
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Performance History</h3>
            <div className="w-full h-64">
              <Bar options={barOptions} data={attemptHistoryData} />
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-lg mb-4">Your Answers</h3>
          {currentQuestions.map((question, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg transform hover:scale-102 transition-transform duration-200">
              <div className="flex items-start gap-3">
                {answers[question.id] === question.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 mt-1" />
                )}
                <div>
                  <p className="font-medium mb-2">{question.question}</p>
                  <p className="text-sm">
                    Your answer: <span className="font-semibold">{answers[question.id]}</span>
                  </p>
                  {answers[question.id] !== question.correctAnswer && (
                    <p className="text-sm text-green-600">
                      Correct answer: <span className="font-semibold">{question.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={startQuiz}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white transition-all duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};