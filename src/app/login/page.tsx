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
    password: "",
  });

  const [disabledBtn, setDisabledBtn] = useState(true);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      setDisabledBtn(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login Successfully");
      setTimeout(() => {
        router.push("/profile");
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
      user.password.length > 0 
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
        onClick={() => !disabledBtn && onLogin()}
        className={
          disabledBtn
            ? "p-2 m-2 bg-slate-400 hover:cursor-not-allowed rounded-md"
            : "p-2 m-2 bg-slate-600 hover:cursor-pointer rounded-md"
        }
      >
        {disabledBtn ? "No Login" : "Login"}
      </button>
      <Link
        href="/signup"
        className="p-2 m-2 bg-slate-600 hover:cursor-pointer rounded-md"
      >
        SignUp Page
      </Link>
    </div>
  );
}
