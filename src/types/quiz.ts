export interface Question {
  id: number;
  type: 'multiple-choice' | 'integer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
}

export interface QuizAttempt {
  timestamp: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: Record<number, string | number>;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string | number>;
  timeRemaining: number;
  isComplete: boolean;
  hasStarted: boolean;
  attempts: QuizAttempt[];
  currentQuestions: Question[];
}