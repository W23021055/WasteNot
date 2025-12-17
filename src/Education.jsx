import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// imports images
import composting from "./assets/Education/Composting.png";
import greenhouse from "./assets/Education/Greenhouse Gases.jpg";
import landfills from "./assets/Education/Landfills.png";
import recycling from "./assets/Education/Recycling.png";
import sustainability from "./assets/Education/Sustainability.png";
import food from "./assets/Education/Types of food.png";

export default function Education() {
  const navigate = useNavigate();
  //Sets up education tabs
  const educationItems = [
    { id: "landfills", label: "Landfills", image: landfills },
    { id: "composting", label: "Composting", image: composting },
    { id: "greenhouse-gases", label: "Greenhouse Gases", image: greenhouse },
    { id: "recycling", label: "Recycling", image: recycling },
    { id: "types-of-food", label: "Types of Food", image: food },
    { id: "sustainability", label: "Sustainability", image: sustainability },
  ];

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#F8F8F8]">
      <Header title="Learn to WasteNot" />

      <main
        className="
          flex-grow
          grid grid-cols-3 justify-items-center
          px-[1vw] pt-6 pb-[70px]
          gap-x-[0.3vw] gap-y-[0.4vw]
        "
      >
        {/* Maps through education items to create the buttons */}
        {educationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/education/${item.id}`)}
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
