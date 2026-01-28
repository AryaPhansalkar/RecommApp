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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

  {!started ? (
    /* Intro Screen */
    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl w-[500px] border border-white/10 shadow-lg shadow-purple-500/20 text-center">
      
      <h1 className="text-3xl font-bold mb-4">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Quick Preference Quiz
        </span>
      </h1>

      <p className="text-gray-400 mb-8">
        Answer a few questions so we can personalize your recommendations.
        This will only take 2–3 minutes.
      </p>

      <button
        onClick={() => setStarted(true)}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition shadow-lg shadow-purple-500/30"
      >
        Start Quiz
      </button>
    </div>
  ) : (
    /* Quiz Screen */
    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl w-[500px] border border-white/10 shadow-lg shadow-purple-500/20">
      
      <p className="text-sm mb-2 text-gray-400">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h2 className="text-2xl font-semibold mb-8">
        {questions[currentQuestion].question}
      </h2>

      <div className="flex flex-col gap-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-500/40 text-left px-5 py-4 rounded-xl transition duration-200"
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
