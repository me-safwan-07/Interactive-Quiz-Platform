import { create } from 'zustand';
import { QuizState } from '../types/quiz';
import { openDB } from 'idb';
import { questions } from '../data/questions';

const TIMER_PER_QUESTION = 30;
const DB_NAME = 'quiz-db';
const STORE_NAME = 'attempts';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  },
});

const shuffleQuestions = () => {
  return [...questions].sort(() => Math.random() - 0.5);
};

interface QuizStore extends QuizState {
  startQuiz: () => void;
  answerQuestion: (questionId: number, answer: string | number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => Promise<void>;
  decrementTimer: () => void;
  loadAttempts: () => Promise<void>;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  timeRemaining: TIMER_PER_QUESTION,
  isComplete: false,
  hasStarted: false,
  attempts: [],
  currentQuestions: shuffleQuestions(),

  startQuiz: () => {
    set({
      currentQuestion: 0,
      answers: {},
      timeRemaining: TIMER_PER_QUESTION,
      isComplete: false,
      hasStarted: true,
      currentQuestions: shuffleQuestions(),
    });
  },

  answerQuestion: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      timeRemaining: TIMER_PER_QUESTION,
    }));
  },

  previousQuestion: () => {
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
      timeRemaining: TIMER_PER_QUESTION,
    }));
  },

  completeQuiz: async () => {
    const state = get();
    const score = state.currentQuestions.reduce((total, question) => {
      return total + (state.answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    const attempt = {
      timestamp: Date.now(),
      score,
      totalQuestions: questions.length,
      timeSpent: 300 - state.timeRemaining,
      answers: state.answers,
    };

    const db = await dbPromise;
    await db.add(STORE_NAME, attempt);

    set((state) => ({
      isComplete: true,
      attempts: [...state.attempts, attempt],
    }));
  },

  decrementTimer: () => {
    set((state) => ({
      timeRemaining: Math.max(0, state.timeRemaining - 1),
    }));
  },

  loadAttempts: async () => {
    const db = await dbPromise;
    const attempts = await db.getAll(STORE_NAME);
    set({ attempts });
  },
}));