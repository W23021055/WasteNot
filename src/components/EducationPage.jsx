import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import landfillsImg from "../assets/Education/Landfills.png";
import compostingImg from "../assets/Education/Composting.png";
import greenhouseImg from "../assets/Education/Greenhouse Gases.jpg";
import recyclingImg from "../assets/Education/Recycling.png";
import sustainabilityImg from "../assets/Education/Sustainability.png";
import foodImg from "../assets/Education/Types of food.png";

export default function EducationPage() {
  const { lessonId } = useParams();

  // Define lessons and content
  const lessons = {
    landfills: {
      title: "Landfills",
      summary:
        "Landfills are large, carefully managed areas where our waste is stored. Learn how they work, what problems they cause, and what we can do to reduce landfill waste.",
      content: [
        "When we throw something away, it often ends up in a landfill. Modern landfills are lined with protective layers to prevent toxic liquids from leaking into the ground. They also use pipes to collect gases like methane.",
        "Even with these safety measures, landfills can harm the environment. Methane is a powerful greenhouse gas that contributes to climate change, and valuable materials are lost when items are buried instead of reused or recycled.",
        "You can help by recycling more, composting food scraps, and buying products with less packaging. Every small action reduces how much ends up in landfills — and helps keep our planet clean and healthy!",
      ],
      image: landfillsImg,
    },
    composting: {
      title: "Composting",
      summary: "Composting turns organic waste into natural fertilizer for soil.",
      content: [
        "Placeholder content for composting. This will be replaced with real educational information later.",
      ],
      image: compostingImg,
    },
    "greenhouse-gases": {
      title: "Greenhouse Gases",
      summary: "Greenhouse gases trap heat in the atmosphere and affect Earth’s climate.",
      content: [
        "Placeholder content for greenhouse gases. This will be replaced with real educational information later.",
      ],
      image: greenhouseImg,
    },
    recycling: {
      title: "Recycling",
      summary: "Recycling helps turn old materials into new products.",
      content: [
        "Placeholder content for recycling. This will be replaced with real educational information later.",
      ],
      image: recyclingImg,
    },
    sustainability: {
      title: "Sustainability",
      summary: "Sustainability means meeting our needs without harming future generations.",
      content: [
        "Placeholder content for sustainability. This will be replaced with real educational information later.",
      ],
      image: sustainabilityImg,
    },
    "types-of-food": {
      title: "Types of Food",
      summary: "Learn about different types of food and how they affect waste.",
      content: [
        "Placeholder content for types of food. This will be replaced with real educational information later.",
      ],
      image: foodImg,
    },
  };

  // Lesson Set
  // Looks up lesson by lesson id and set the data
  // if not found displays the not found data
  const lesson = lessons[lessonId] || {
    title: "Lesson Not Found",
    summary: "This topic doesn’t exist yet.",
    content: [],
    image: null,
  };

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#F8F8F8]">
      <Header title={lesson.title} />
      {/* Displays title, summary and content */}
      <main className="flex flex-col items-center px-6 py-8 flex-grow text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0E3386]">
          {lesson.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-[700px] mb-6">
          {lesson.summary}
        </p>
        <div className="text-gray-800 text-base md:text-lg max-w-[800px] text-left mb-8">
          {lesson.content.map((para, i) => (
            <p key={i} className="mb-4">
              {para}
            </p>
          ))}
        </div>

        {/* Displasy lesson image */}
        {lesson.image && (
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full max-w-[500px] rounded-2xl shadow-md mt-6"
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
