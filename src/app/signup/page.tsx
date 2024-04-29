"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      setDisabledBtn(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signed Up Successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1000 * 2);
      setLoading(false);
      setDisabledBtn(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <h1 className="underline font-bold text-2xl">
        {loading ? "Processing" : "Sign Up"}
      </h1>
      <hr />
      <label htmlFor="username">UserName</label>
      <input
        className="p-2 m-2 rounded-md w-64 text-black"
        type="text"
        placeholder="username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 m-2 rounded-md w-64  text-black"
        type="text"
        placeholder="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 m-2 rounded-md w-64  text-black"
        type="password"
        placeholder="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={() => !disabledBtn && onSignUp()}
        className={
          disabledBtn
            ? "p-2 m-2 bg-slate-400 hover:cursor-not-allowed rounded-md"
            : "p-2 m-2 bg-slate-600 hover:cursor-pointer rounded-md"
        }
      >
        {disabledBtn ? "No Sign Up" : "Sign Up"}
      </button>
      <Link
        href="/login"
        className="p-2 m-2 bg-slate-600 hover:cursor-pointer rounded-md"
      >
        Login Page
      </Link>
    </div>
  );
}
