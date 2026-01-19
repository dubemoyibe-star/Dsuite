import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading({ message, margin }){
  return (
  <div className={`text-center ${margin ? `my-${margin}` : 'my-48'} flex gap-4 justify-center`}>
    <AiOutlineLoading3Quarters className="text-yellow-700 animate-spin text-3xl" />
    <p className="text-2xl font-bold">{message}</p>
  </div>
      )
}