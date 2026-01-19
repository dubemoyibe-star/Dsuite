import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading({ message }){
  return (
  <div className="text-center my-100 flex gap-4 justify-center">
    <AiOutlineLoading3Quarters className="text-yellow-700 animate-spin text-3xl" />
    <p className="text-2xl font-bold">{message}</p>
  </div>
      )
}