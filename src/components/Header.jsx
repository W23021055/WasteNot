import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

//Gets the page name from the title
export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <header
      className="w-full flex items-center justify-between px-4 py-3 text-white"
      style={{
        backgroundColor: "#7388ba",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center hover:opacity-80"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold flex-grow text-center">
        {title}
      </h1>
      <div className="w-6" /> 
    </header>
  );
}
