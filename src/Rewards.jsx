import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// imports images 
import compostRanger from "./assets/Rewards/Compost Ranger.png";
import earthsaver from "./assets/Rewards/Earthsaver.png";
import greenThumb from "./assets/Rewards/Green Thumb.png";
import natureLover from "./assets/Rewards/Nature Lover.png";
import recycleWarrior from "./assets/Rewards/Recycle Warrior.png";
import locked from "./assets/Rewards/Locked.png";

export default function Rewards() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // gets current user and rewards earned
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (!currentUser || !currentUser.username) {
        console.warn("No current user found in localStorage");
        return;
      }

      const user = allUsers.find(
        (u) => u.username === currentUser.username
      ) || currentUser;

      const unlocked = Array.isArray(user.achievements)
        ? user.achievements
        : [];

      setAchievements(unlocked);
      console.log("Unlocked achievements:", unlocked);
    } catch (err) {
      console.error("Error loading rewards:", err);
    }
  }, []);

  // Sets up rewards
  const rewards = [
    { id: 1, label: "Compost Ranger", image: compostRanger },
    { id: 2, label: "Earthsaver", image: earthsaver },
    { id: 3, label: "Green Thumb", image: greenThumb },
    { id: 4, label: "Nature Lover", image: natureLover },
    { id: 5, label: "Recycle Warrior", image: recycleWarrior },
  ];

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#F8F8F8]">
      <Header title="Rewards" />

      <main
        className="
          flex-grow
          grid grid-cols-3 justify-items-center
          px-[1vw] pt-4 pb-[70px]
          gap-x-[0.3vw] gap-y-[0.4vw]
        "
      >
        {/* maps through rewards to make boxes and displays images for unlocked and lock icon for locked */}
        {rewards.map((reward) => {
          const unlocked = achievements.includes(reward.label);

          return (
            <div
              key={reward.id}
              className="
                bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300
                flex flex-col justify-between text-center
                transition-all duration-200
              "
              style={{
                width: "clamp(200px, 30vw, 300px)",
                height: "clamp(130px, 16vw, 190px)",
                opacity: unlocked ? 1 : 0.5,
              }}
            >
              <img
                src={unlocked ? reward.image : locked}
                alt={reward.label}
                className="w-full h-[65%] object-contain"
              />
              <div className="flex-grow flex items-center justify-center p-1 font-semibold text-sm md:text-base lg:text-lg text-gray-800">
                {reward.label}
              </div>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
