import React, { useState } from "react";
import { useQuizStore } from "../store/quizStore";
import clsx from "clsx";
import { CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const QuestionCard: React.FC = () => {
  const { currentQuestion, answers, answerQuestion, currentQuestions } = useQuizStore();
  const question = currentQuestions[currentQuestion];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!question) return null;

  const handleAnswer = (answer: string | number) => {
    answerQuestion(question.id, answer);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full transition-all duration-200 ">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-4 py-2 bg-black text-white rounded-full">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </span>
          <span className="text-sm font-medium px-4 py-2 bg-green-100 text-green-800 rounded-full">
            {question.type === "multiple-choice" ? "Multiple Choice" : "Numerical Answer"}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>
      </div>

      {question.type === "multiple-choice" && question.options && (
        <div className="space-y-3 relative">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === option;

            return (
              <div key={index} className="relative">
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-gray-100 rounded-xl"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.2 } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    />
                  )}
                </AnimatePresence>

                <button
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleAnswer(option)}
                  className={clsx(
                    "relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer",
                    isSelected
                      ? "bg-slate-200 border-black shadow-md"
                      : " border-gray-200"
                  )}
                >
                  <span className={clsx("font-medium", isSelected ? "text-black font-bold" : "text-gray-700")}>
                    {option}
                  </span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-green-500" />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {question.type === "integer" && (
        <div className="relative">
          <input
            type="number"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(parseInt(e.target.value, 10))}
            className="w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-black transition-all duration-200 text-lg font-medium"
            placeholder="Enter your numerical answer..."
          />
        </div>
      )}
    </div>
  );
};
