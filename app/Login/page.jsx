'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginSchema = z.object({
    email:z.email({message:"Please enter valid email address"}),
    password:z.string()
            .min(1,"Password is required")
})


export default function Login(){
      const router = useRouter();
      const { register, handleSubmit,formState:{errors} } = useForm({
        resolver:zodResolver(LoginSchema)
      });

      const images = ["/login1.jpg", "/login2.jpg", "/login3.jpg", "/login4.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

      const onSubmit = async(data) =>{
            try{
              const response =await fetch("api/auth/login",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
              })
              const result = await response.json();
              if(response.ok){
                console.log(result);
                router.push("/protected/dashboard");
              }
              else{
                console.error(result.message);
                alert(result.message);
                return ;
              }
            }
            catch(error){
              console.error("An unexpected error occurred:", error);
              alert("An unexpected error occurred. Please try again later.");
            }
      }

      return(
            <div className="min-h-screen w-full flex overflow-hidden bg-black">

  {/* LEFT IMAGE PANEL */}
  <div className="w-1/2 h-screen relative hidden md:block overflow-hidden">
    {images.map((img, index) => (
      <img
        key={img}
        src={img}
        alt="Login Art"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ease-in-out ${
          index === currentImage ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
  </div>

  {/* RIGHT FORM PANEL */}
  <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-black text-white">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md px-10 flex flex-col gap-8"
    >
      <h2 className="text-4xl font-semibold mb-6 text-center">Login</h2>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Email</label>
        <input
          type="email"
          {...register("email")}
          className="bg-transparent border-b-2 border-pink-500 focus:outline-none py-2 text-white"
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Password</label>
        <input
          type="password"
          {...register("password")}
          className="bg-transparent border-b-2 border-indigo-500 focus:outline-none py-2 text-white"
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 py-3 rounded-md font-semibold bg-purple-700 hover:opacity-90 transition"
      >
        Login
      </button>

      {/* Signup link */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Don&apos;t have an account?
        <br />
        <Link
          href="/Signup"
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          Sign up
        </Link>
      </div>

    </form>
  </div>
</div>

      );
}
