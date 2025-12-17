import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function GamePage() {
  const { gameId } = useParams();

  // Sets up game data to be displayed
  const games = {
    "bin-drop": {
      title: "Bin Drop",
      description:
        "Sort waste items into the correct bins as quickly as possible — improve your recycling reflexes!",
    },
    "compost": {
      title: "Compost Compromise",
      description:
        "Learn what can be composted and test your eco-knowledge by sorting food waste properly.",
    },
    "landfill": {
      title: "Landfill Rush",
      description:
        "Avoid sending items to landfill! Make fast decisions to reduce your waste footprint.",
    },
    "pantry": {
      title: "Pantry Sorting",
      description:
        "Organize your pantry and minimize waste — spot expired goods before they spoil.",
    },
    "rat": {
      title: "Rat Race",
      description:
        "Keep the environment clean and chase down waste! Help our rat mascot clear the streets.",
    },
    "veg": {
      title: "Vegetable Gardening",
      description:
        "Grow your own garden! Learn about composting, soil, and sustainability through play.",
    },
  };

  // Sets content if game isnt found
  const content = games[gameId] || {
    title: "Game Not Found",
    description: "The game you're looking for does not exist.",
  };

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#F8F8F8]">
      <Header title={content.title} />
       
      {/* Displays the game content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0E3386]">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-[600px] leading-relaxed">
          {content.description}
        </p>
      </main>
      <Footer />
    </div>
  );
}
