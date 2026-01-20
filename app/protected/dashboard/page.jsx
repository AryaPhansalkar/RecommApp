'use client';

import { useEffect, useState } from "react";
import { genreMeta } from "@/data/genreMeta";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const API = process.env.NEXT_PUBLIC_RECOMMENDER_API;

  useEffect(() => {
    const loadData = async () => {
      // 1️⃣ Load user
      const res = await fetch("/api/user/me");
      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        return;
      }

      const userData = data.data;
      setUser(userData);

      const preferences = userData.gamePreferences || {};

      if (Object.keys(preferences).length === 0) {
        setLoading(false);
        return;
      }

      // 2️⃣ Call Python recommender
      const recRes = await fetch(`${API}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          profile: preferences
        })
      });

      const recData = await recRes.json();
      setRecommendations(recData.recommendations || []);

      setLoading(false);
    };

    loadData();
  }, [API]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!user) {
    return <div className="text-white p-10">Not logged in</div>;
  }

  const preferences = user.gamePreferences || {};
  const scoresArray = Object.values(preferences);

  if (scoresArray.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0c29] text-white p-10">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-300 mt-4">
          You haven’t taken the preference quiz yet.
        </p>
      </div>
    );
  }

  // 🔥 Find highest score
  const maxScore = Math.max(...scoresArray);

  // 🔥 Handle ties
  const topGenres = Object.entries(preferences)
    .filter(([_, score]) => score === maxScore)
    .map(([genre]) => genre);

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-10">

      <h1 className="text-4xl font-bold mb-2">
        Welcome back, {user.name} 👋
      </h1>

      <p className="text-gray-300 mb-8">
        Based on your quiz, your taste is mostly inclined towards:
      </p>

      {/* Top Genre Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {topGenres.map((genre) => (
          <div
            key={genre}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {genreMeta[genre]?.title || genre}
            </h2>
            <p className="text-gray-300">
              {genreMeta[genre]?.description || "A genre you seem to enjoy."}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <h2 className="text-3xl font-semibold mb-6">
        Recommended for you
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-gray-400">
          No recommendations found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recommendations.map((game, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-3">
                {game.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.map((g, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/20 px-2 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(game.title)}`}
                target="_blank"
                className="mt-auto bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg text-center"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
