'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/aboutme");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <h1 className="m-2 p-2">Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link className="p-2 m-4 bg-red-600 hover:cursor-pointer rounded-md" href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr/>
      <button
        className="p-2 m-4 bg-slate-600 hover:cursor-pointer rounded-md"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
      <hr />
      <button
        className="p-2 m-2 bg-slate-600 hover:cursor-pointer rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
