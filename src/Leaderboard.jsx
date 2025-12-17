import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DefaultIcon from "./assets/default icon.png";

export default function Leaderboard() {
  // sets up use states
  const [leaderboardData, setLeaderboardData] = useState({});
  const [selectedBoard, setSelectedBoard] = useState("");
  const [entries, setEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [availableBoards, setAvailableBoards] = useState([]);
  const [isViewOnly, setIsViewOnly] = useState(false);

  useEffect(() => {
    // sets up the leaderboards viewable by users
    // removes the leaderboard codes from the possible leaderboards
    // sorts out the leaderboards the user isnt a part of
    try {
      const storedBoards = JSON.parse(localStorage.getItem("leaderboards")) || {};
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];

      const validBoards = Object.keys(storedBoards)
        .filter((key) => Array.isArray(storedBoards[key]))
        .reduce((obj, key) => {
          obj[key] = storedBoards[key];
          return obj;
        }, {});

      setLeaderboardData(validBoards); 
      setCurrentUser(storedUser);

      if (!storedUser) return;

      let viewableBoards = [];
      
      // for students and teachers they view leaderboards they are apart of 
      if (storedUser.role === "student" || storedUser.role === "teacher") {
        if (Array.isArray(storedUser.leaderboards)) {
          viewableBoards = storedUser.leaderboards.filter(
            (lb) => typeof lb === "string" && validBoards[lb]
          );
        }
      // for parents they view leaderboards their linked children are on
      } else if (storedUser.role === "parent") {
        if (Array.isArray(storedUser.linkedAccounts)) {
          const childBoards = new Set();
          storedUser.linkedAccounts.forEach((childUsername) => {
            const child = allUsers.find((u) => u.username === childUsername);
            if (child && Array.isArray(child.leaderboards)) {
              child.leaderboards.forEach((lb) => {
                if (validBoards[lb]) childBoards.add(lb);
              });
            }
          });
          viewableBoards = Array.from(childBoards);
        }
      }

      // teachers and parents a view only they arent on the leaderboards
      if (storedUser.role === "teacher" || storedUser.role === "parent") {
        setIsViewOnly(true);
      }

      setAvailableBoards(viewableBoards);
    } catch (err) {
      console.error("Error loading leaderboard data:", err);
    }
  }, []);

  useEffect(() => {
    if (selectedBoard && leaderboardData[selectedBoard]) {
      const sorted = [...leaderboardData[selectedBoard]]
        .filter((entry) => {
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const user = users.find((u) => u.username === entry.username);
          return user && user.role === "student";
        })
        .sort((a, b) => b.score - a.score);

      setEntries(sorted);
    } else {
      setEntries([]);
    }
  }, [selectedBoard, leaderboardData]);

  // gets users avatar or displays default 
  const getUserAvatar = (username) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.username === username);
    return found?.avatar || DefaultIcon;
  };

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#E6EDF4]">
      <Header title="Leaderboard" />

      <main className="flex flex-col items-center flex-grow pt-6 pb-[80px]">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0E3386] mb-2">
          Leaderboard
        </h1>

        {isViewOnly && (
          <p className="text-sm text-gray-600 mb-4 italic">
            (View-only access — you are not ranked)
          </p>
        )}
        
        {/* gives user dropdown for selection of leaderboard */}
        <select
          className="rounded-lg border border-gray-400 px-4 py-2 mb-8 bg-white shadow-sm text-gray-800 focus:outline-none"
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
        >
          <option value="">Select Leaderboard</option>
          {availableBoards.length > 0 ? (
            availableBoards.map((board) => (
              <option key={board} value={board}>
                {board.charAt(0).toUpperCase() + board.slice(1)}
              </option>
            ))
          ) : (
            <option value="">No leaderboards available</option>
          )}
        </select>
        
        {/* displays the leaderboard top 2 */}
        {selectedBoard && entries.length > 0 ? (
          <>
            <section className="flex flex-col items-center w-full mb-8">
              <div className="flex justify-center items-end gap-4">
                {entries.slice(0, 2).map((entry, index) => (
                  <div
                    key={entry.username}
                    className={`flex flex-col items-center justify-end rounded-xl p-4 shadow-lg bg-white transition-all ${
                      currentUser?.username === entry.username
                        ? "ring-4 ring-[#0E3386]"
                        : "ring-2 ring-gray-300"
                    }`}
                    style={{
                      width: "150px",
                      height: index === 0 ? "200px" : "170px",
                      transform: index === 0 ? "translateY(-10px)" : "none",
                    }}
                  >
                    <img
                      src={getUserAvatar(entry.username)}
                      alt={entry.username}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#7388ba] mb-2"
                    />
                    <div className="font-semibold text-lg text-gray-800">
                      {entry.username}
                    </div>
                    <div className="text-3xl font-bold text-[#0E3386] mt-1">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* rest of the leaderboard*/}
            <section className="bg-white rounded-2xl p-4 shadow-md w-[90%] max-w-[600px]">
              <div className="flex flex-col gap-3">
                {entries.slice(2).map((entry, index) => (
                  <div
                    key={entry.username}
                    className="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold w-6 text-right">
                        {index + 3}.
                      </span>
                      <img
                        src={getUserAvatar(entry.username)}
                        alt={entry.username}
                        className="w-10 h-10 rounded-full border border-[#7388ba] object-cover"
                      />
                      <span className="text-gray-800 font-medium">
                        {entry.username}
                      </span>
                    </div>
                    <span className="text-[#0E3386] font-semibold">
                      {entry.score}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          
          <p className="text-gray-500 mt-8">
            {/* if no scores displays no leaderboard */}
            {selectedBoard
              ? "No student scores yet for this leaderboard"
              : "Choose a leaderboard above"}
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
