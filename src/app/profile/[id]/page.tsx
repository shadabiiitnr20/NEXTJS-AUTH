"use client";

import React from "react";

export default function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile Page</h1>
      <h2 className="p-2 m-2 bg-red-600 hover:cursor-pointer rounded-md">{params.id}</h2>
    </div>
  );
}
