import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Grid({ title, items, basePath }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#F8F8F8]">
      <Header title={title} />

      {/* Maps through item list and displays them in a grid with an image */}
      <main className="flex-grow p-4 pb-[90px] grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`${basePath}/${item.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 w-full max-w-[200px] text-center hover:scale-105 transition"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-32 object-cover"
            />
            <div className="p-2 font-semibold text-lg text-gray-800">
              {item.label}
            </div>
          </button>
        ))}
      </main>

      <Footer />
    </div>
  );
}
