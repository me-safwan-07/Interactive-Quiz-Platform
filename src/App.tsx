import { useState } from 'react'
import { Brain } from 'lucide-react';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center p-4">
        <div className="w-full max-w-2xl flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bluw-600 to-indigo-600">
            Interactive Quiz
          </h1>
        </div>

        <div className="">
          <button
            className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 font-medium '
          >
            Reset Quiz
          </button>
        </div>
      </div>
    </>
  )
}

export default App
