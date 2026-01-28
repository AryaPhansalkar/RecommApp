'use client';

import { useEffect, useState } from "react";
import { genreMeta } from "@/data/genreMeta";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const API = process.env.NEXT_PUBLIC_RECOMMENDER_API;

  useEffect(() => {
    const loadData = async () => {
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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST"
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

  {/* Header */}
  <div className="flex justify-between items-center mb-10">
    <h1 className="text-4xl font-bold">
      Welcome back,{" "}
      <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {user.name}
      </span>{" "}
      👋
    </h1>

    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white px-5 py-2 rounded-lg font-semibold transition shadow-lg shadow-purple-500/30"
    >
      Logout
    </button>
  </div>

  <p className="text-gray-400 mb-10">
    Based on your quiz, your taste is mostly inclined towards:
  </p>

  {/* Top Genre Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    {topGenres.map((genre) => (
      <div
        key={genre}
        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition"
      >
        <h2 className="text-2xl font-semibold mb-3 text-purple-300">
          {genreMeta[genre]?.title || genre}
        </h2>
        <p className="text-gray-400">
          {genreMeta[genre]?.description || "A genre you seem to enjoy."}
        </p>
      </div>
    ))}
  </div>

  {/* Recommendations */}
  <h2 className="text-3xl font-semibold mb-8">
    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
      Recommended for you
    </span>
  </h2>

  {recommendations.length === 0 ? (
    <p className="text-gray-500">
      No recommendations found.
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {recommendations.map((game, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition flex flex-col"
        >
          <h3 className="text-lg font-semibold mb-4 text-purple-200">
            {game.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {game.genres.map((g, i) => (
              <span
                key={i}
                className="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full text-gray-300"
              >
                {g}
              </span>
            ))}
          </div>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(game.title)}`}
            target="_blank"
            className="mt-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg text-center transition shadow-md shadow-purple-500/30"
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
