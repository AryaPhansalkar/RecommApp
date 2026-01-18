'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions as questions } from "@/data/quizQuestions";

export default function QuizPage() {
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 🔥 This stores actual preference scores
  const [scores, setScores] = useState({});

  const submitQuiz = async (finalScores) => {
    const response = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ scores: finalScores })
    });

    const result = await response.json();

    if (result.success) {
      router.push("/protected/dashboard");
    } else {
      alert("Failed to save quiz results");
    }
  };

  const handleOptionClick = (option) => {
    const updatedScores = { ...scores };

    // 🔥 Add option's score contribution
    for (const key in option.scores) {
      updatedScores[key] = (updatedScores[key] || 0) + option.scores[key];
    }

    setScores(updatedScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // ✅ Last question → submit to backend
      console.log("Final Scores:", updatedScores);
      submitQuiz(updatedScores);
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
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
