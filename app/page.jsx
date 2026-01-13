'use client'
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import Navbar from '@/components/navbar.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 pt-20">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold leading-tight">
            Discover Your Next <span className="text-purple-400">Favorite</span><br />
            Book, Movie & Game
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Discover yourself through understanding your interests — every book, every story, every game you love reveals a part of who you truly are.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold">
              Get Started
            </button>
            <button className="border border-purple-400 px-6 py-3 rounded-xl hover:bg-purple-500/20">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 md:mt-0">
          
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 py-24">
        <h3 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-purple-400">RecomVerse?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "AI-Powered",
              desc: "Advanced machine learning models personalize recommendations just for you."
            },
            {
              title: "Multi-Domain",
              desc: "Books, movies, and video games — all in one powerful platform."
            },
            {
              title: "Smart Tracking",
              desc: "We adapt to your preferences as your taste evolves."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <h4 className="text-2xl font-semibold text-purple-300 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center pb-24">
        <h3 className="text-4xl font-bold mb-6">
          Ready to Explore Smarter?
        </h3>
        <p className="text-gray-300 mb-8">
          Join now and let our AI find your next obsession.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 px-10 py-4 rounded-xl font-bold text-lg">
          Start Exploring
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400">
        © 2025 RecomVerse by Arya — All Rights Reserved ✨
      </footer>

    </div>
    
  );
}
