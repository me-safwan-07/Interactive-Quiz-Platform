import React from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Navigation } from './components/Navigation';
import { QuizResults } from './components/QuizResults';
import { useQuizStore } from './store/quizStore';
import { Brain } from 'lucide-react';
import { QuizTimer } from './components/QuizTimer';
import { HomeScreen } from './components/HomeScreen';

function App() {
  const { isComplete, hasStarted, loadAttempts } = useQuizStore();

  React.useEffect(() => {
    loadAttempts();
  }, [loadAttempts]);

  if (!hasStarted) {
    return <HomeScreen />;
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
        <QuizResults />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Interactive Quiz
          </h1>
        </div>
        
        <div className="w-full flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
          <QuizTimer />
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            Reset Quiz
          </button>
        </div>
      </div>

      <QuestionCard />
      <Navigation />
    </div>
  );
}

export default App;