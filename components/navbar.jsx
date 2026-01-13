import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      
      <h1 className="text-2xl font-bold tracking-wide">RecomVerse</h1>

      <div className="space-x-6 hidden md:flex">
        <a className="hover:text-purple-300 cursor-pointer">Features</a>
        <a className="hover:text-purple-300 cursor-pointer">About</a>
        <a className="hover:text-purple-300 cursor-pointer">Contact</a>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/Login"
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/Signup"
          className="text-purple-500 bg-white hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg"
        >
          Signup
        </Link>
      </div>

    </nav>
  )
}

export default Navbar

