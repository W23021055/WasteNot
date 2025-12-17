import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// imports images
import binDrop from "./assets/Games/Bin Drop.png";
import compost from "./assets/Games/Compost Compromise.png";
import landfill from "./assets/Games/Landfill Rush.png";
import pantry from "./assets/Games/Pantry Sorting.png";
import rat from "./assets/Games/Rat Race.png";
import veg from "./assets/Games/Vegetable Gardening.png";

export default function Games() {
  const navigate = useNavigate();
  // sets up game tabs
  const gameItems = [
    { id: "bin-drop", label: "Bin Drop", image: binDrop },
    { id: "compost", label: "Compost Compromise", image: compost },
    { id: "landfill", label: "Landfill Rush", image: landfill },
    { id: "pantry", label: "Pantry Sorting", image: pantry },
    { id: "rat", label: "Rat Race", image: rat },
    { id: "veg", label: "Vegetable Gardening", image: veg },
  ];

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#F8F8F8]">
      <Header title="Games" />

      <main
        className="
          flex-grow
          grid grid-cols-3 justify-items-center
          px-[1vw] pt-6 pb-[70px]
          gap-x-[0.3vw] gap-y-[0.4vw]
        "
      >
        {/* maps through games to create the buttons*/}
        {gameItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/games/${item.id}`)}
            className="
              bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300
              flex flex-col justify-between text-center
              hover:scale-[1.03] transition-transform duration-200
            "
            style={{
              width: "clamp(200px, 30vw, 300px)",
              height: "clamp(130px, 16vw, 190px)",
            }}
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-[65%] object-contain"
            />
            <div className="flex-grow flex items-center justify-center p-1 font-semibold text-sm md:text-base lg:text-lg text-gray-800">
              {item.label}
            </div>
          </button>
        ))}
      </main>

      <Footer />
    </div>
  );
}
