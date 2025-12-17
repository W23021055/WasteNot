import React from "react";
import { useNavigate } from "react-router-dom";
import ColourBackground from "./assets/Colour Background.png";
import Footer from "./components/Footer";
import Logo from "./assets/logo.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="h-[100svh] w-[100vw] flex flex-col bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${ColourBackground})` }}
    >

      <div className="absolute top-3 left-4 sm:top-5 sm:left-6 flex items-center gap-2 sm:gap-3">
        <h1 className="font-bold text-[#0E3386] drop-shadow-md text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          WasteNot
        </h1>
        <img
          src={Logo}
          alt="WasteNot logo"
          className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 pb-[60px] sm:pb-[70px] md:pb-[80px]">
        <div
          className="flex flex-col w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw]"
          style={{
            gap: "0.75rem", 
            marginTop: "4rem",
          }}
        >
          {/* creates games button to redirect to games page */}
          <button
            onClick={() => navigate("/games")}
            className="w-full py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white bg-[#f4511e] rounded-lg border border-black hover:scale-105 transition"
          >
            Games
          </button>

          {/* Creates education button to redirect to education page*/}
          <button
            onClick={() => navigate("/education")}
            className="w-full py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white bg-[#d81b60] rounded-lg border border-black hover:scale-105 transition"
          >
            Learn
          </button>

          {/* creates leaderboard button to redirect to leaderboard page */}
          <button
            onClick={() => navigate("/leaderboard")}
            className="w-full py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white bg-[#43a047] rounded-lg border border-black hover:scale-105 transition"
          >
            Leaderboard
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
