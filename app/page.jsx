'use client'
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import Navbar from '@/components/navbar.jsx';

export default function Home() {
  return (
   <div className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-36">
        
        <h1 className="text-5xl md:text-6xl font-bold">
          Find Your Next{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
            Favorite Game
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          RecomVerse is an AI-powered game recommendation platform that understands your taste and suggests games you’ll actually enjoy.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/Signup">
            <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/30">
              Get Started
            </button>
          </Link>

          <Link href="/Login">
            <button className="border border-purple-500 text-purple-400 px-8 py-3 rounded-lg hover:bg-purple-500/10 transition">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-10 py-28">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            RecomVerse?
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "AI Powered",
              desc: "Smart recommendations based on your real gaming preferences."
            },
            {
              title: "Personalized",
              desc: "Your feed evolves as your taste in games changes."
            },
            {
              title: "No Random Noise",
              desc: "Only games that actually match what you like."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-purple-400 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-500">
        © 2025 RecomVerse by Arya — All Rights Reserved
      </footer>

    </div>

    
  );
}
