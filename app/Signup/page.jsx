'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Link from "next/link";
import { useRouter } from "next/navigation";


const signupSchema = z.object({
  username:z.string()
    .min(5,"Name must have atleast 5 characters")
    .max(50,"Name must have atmost 50 characters"),
  
  email:z.email({message:"Please enter valid email address"}),

  password :z.string()
    .min(7,"password must have atleast 7 characters")
    .regex(/[A-Z]/,{message:"password must have atleast one uppercase letter"})
    .regex(/[a-z]/,{message:"password must have atleast one lowercase letter"})
    .regex(/[0-9]/,{message:"password must have atleast one number"})
    .regex(/[^A-Za-z0-9]/,{message:"password must have atleast one special character"}),

  confirmPassword : z.string()

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
})


export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit,formState:{errors} } = useForm({
    resolver:zodResolver(signupSchema)
  });

  const onSubmit = async(data) => {
    try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result =await response.json()
    if(response.ok){
      console.log(result);
      router.push("/protected/quiz");
    }
    else{
      console.error(result.message);
      alert(result.message);
      return ;
    }
  }
  catch (error) {
    console.error("An unexpected error occurred:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
  }
  return (
  <div className="absolute min-h-screen w-full flex overflow-hidden">
    {/* Left panel */}
    <div className="min-h-screen w-1/3 flex-col bg-amber-300 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Welcome to recomVerse</h1>
      <p className="mt-4 text-center px-6 pt-2">Join us and explore personalized recommendations for books, movies, and games tailored just for you!</p>
      <p className="mt-2 text-center px-6 pt-5">Already have an account? </p>
      <button className="mt-2 bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
        <Link href="/Login">Login</Link>
      </button>
    </div>

    {/* Right panel - Form */}
    <div className="relative min-h-screen w-2/3 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-10 rounded-lg shadow-lg w-1/2 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold text-center mb-5">Sign Up</h2>

        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("username")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button 
          type="submit" 
          className="bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>

  );
}
