import React from "react";
import { useNavigate } from "react-router-dom";
import { initializeLocalStorage } from "./utils/initLocalStorage";
import LightBackground from "./assets/Light Background.png";

export default function PreSelect() {
  const navigate = useNavigate();

  // Handles redirects for what the user chooses
  // both redirect to login for demo purposes
  const handleSelect = (choice) => {
    localStorage.setItem("useMode", choice);
    if (choice === "home"){
      navigate("/login"); 
    }
    else if (choice === "school"){
      navigate("/login"); 
    }
  };

  return (
    <div
      className="h-[100svh] w-[100vw] flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${LightBackground})` }}
    >
      {/* Welcomes user to app and asks them at home or at school use*/}
      <div className="text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
          Welcome to <span className="text-[#fff]">WasteNot</span>
        </h1>
        <p className="text-xl mb-8 font-medium">Are you using this:</p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => handleSelect("school")}
            className="bg-[#7bb241] text-white font-semibold text-xl px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            At school
          </button>
          <button
            onClick={() => {
              handleSelect("home");
              initializeLocalStorage();
            }}
            className="bg-[#d81b60] text-white font-semibold text-xl px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            At home
          </button>
        </div>
      </div>
    </div>
  );
}
