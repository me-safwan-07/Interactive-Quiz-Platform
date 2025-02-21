import { Brain, History, Shuffle, Timer } from 'lucide-react'
import { HoverEffect } from './ui/hover-effect'
import { useQuizStore } from '../store/quizStore';

export const HomeScreen = () => {
    const { startQuiz, attempts } = useQuizStore();
    const card = [
        {
            title: 'Timed Questions',
            description: '30 seconds per question',
            icon: <Timer className='w-6 h-6 text-black'/>
        },
        {
            title: 'Random Order',
            description: 'Questions shuffle each time',
            icon: <Shuffle className='w-6 h-6 text-black'/>
        },
        {
            title: 'Track Progress',
            description: 'View Previous attempts',
            icon: <History className='w-6 h-6'/>
        }
    ] 
  return (
    <div className="border min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
                <div className="inline-block p-4 rounded-full bg-black mb-4">
                    <Brain className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Interactive Quiz Challenge</h1>
                <p className="text-gray-600">Test your knowledge across various topics!</p>
            </div>

            
            <div className="">
                <HoverEffect items={card} />
            </div>
            {attempts.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Recent Attempts</h2>
                    <div className="space-y-3">
                    {attempts.slice(-3).map((attempt, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <span className="text-gray-600">
                            {new Date(attempt.timestamp).toLocaleDateString()}
                        </span>
                        <span className="font-semibold">
                            Score: {attempt.score}/{attempt.totalQuestions}
                        </span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            <button 
                onClick={startQuiz}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-colors cursor-pointer"
            >
                Start Quiz
            </button>
        </div>

    </div>
  )
};