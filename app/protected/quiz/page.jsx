'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    question: "What sounds most fun right now?",
    options: [
      "Playing a fast-paced game",
      "Watching an intense movie",
      "Reading a good story",
      "Just relaxing with casual content"
    ]
  },
  {
    id: 2,
    question: "Pick a vibe you enjoy",
    options: [
      "Action & adrenaline",
      "Mystery & suspense",
      "Romance & emotions",
      "Fantasy & world-building"
    ]
  },
  {
    id: 3,
    question: "How do you usually spend free time?",
    options: [
      "Competing or gaming with friends",
      "Binge watching shows",
      "Reading or exploring stories",
      "Scrolling / light entertainment"
    ]
  }
];

export default function QuizPage() {
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // last question → auto submit
      console.log("Quiz answers:", updatedAnswers);
      router.push("/protected/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {!started ? (
        /* Intro Screen */
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-xl w-[500px] shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Quick Preference Quiz</h1>

          <p className="text-gray-300 mb-6">
            Answer a few questions so we can personalize your recommendations.
            This will only take 2–3 minutes.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        /* Quiz Screen */
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-xl w-[500px] shadow-lg">
          <p className="text-sm mb-2 text-gray-300">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <h2 className="text-2xl font-semibold mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="flex flex-col gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="bg-white/20 hover:bg-white/30 text-left px-4 py-3 rounded-lg transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
