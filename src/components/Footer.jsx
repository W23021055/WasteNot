import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Award, User } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sets up the redirects
  const links = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "rewards", label: "Rewards", icon: Award, path: "/rewards" },
    { id: "account", label: "Account", icon: User, path: "/account" },
  ];

  return (
    <footer
      className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 sm:py-3"
      style={{
        backgroundColor: "#7388ba",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.25)",
        zIndex: 50,
      }}
    >
      {/* Maps the list of links to create the buttons */}
      {links.map(({ id, label, icon: Icon, path }) => {
        const active = location.pathname === path;
        return (
          <button
            key={id}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center focus:outline-none"
          >
            <Icon
              size={26}
              color={active ? "#FFFFFF" : "#000000"}
              className={`transition-all duration-200 ${
                active ? "scale-110" : "opacity-90 hover:opacity-100"
              }`}
            />
            <span
              className={`text-xs sm:text-sm font-medium mt-1 ${
                active ? "text-white" : "text-black"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </footer>
  );
}
