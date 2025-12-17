import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DefaultIcon from "./assets/default icon.png";

export default function Account() {
  // Sets up use states
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdowns, setDropdowns] = useState({});
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");
  const [newLeaderboard, setNewLeaderboard] = useState("");

  // Gets user from local storage and sends error if not
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      if (userData) setCurrentUser(userData);
    } catch (err) {
      console.error("Failed to get user:", err);
    }
  }, []);

  // Logout
  // removes user from current user and session token
  // redirects user to login screen
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("sessionToken");
    window.location.href = "/kv6014/Waste-not/login";
  };

  // Sets up the dropdowns
  const toggleDropdown = (key) =>
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));

  // Sets ups the link child for parents
  // handles errors for incorrect user name or empty username
  // appends the data to the local storage when linked
  const handleLinkChild = () => {
    if (!linkInput.trim()) return setLinkError("Please enter a username");
    setLinkError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.username.toLowerCase() === linkInput.toLowerCase()
    );

    if (!found) return setLinkError("No user found with that username");
    if (found.role !== "student")
      return setLinkError("Only student accounts can be linked");

    const parentIndex = users.findIndex(
      (u) => u.username === currentUser.username
    );
    if (parentIndex === -1) return setLinkError("Parent not found");

    const parent = users[parentIndex];
    parent.linkedAccounts = parent.linkedAccounts || [];

    if (parent.linkedAccounts.includes(found.username))
      return setLinkError("That account is already linked");

    parent.linkedAccounts.push(found.username);

    users[parentIndex] = parent;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(parent));
    setCurrentUser(parent);
    setLinkInput("");
  };

  // Sets up the join leaderboard for students
  // handles errors for invalid code, empty code or already in leaderboard
  // appends leaderboard to local storage when student joins
  const handleJoinLeaderboard = () => {
    if (!linkInput.trim()) return;
    setLinkError("");

    const leaderboards = JSON.parse(localStorage.getItem("leaderboards")) || {};
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const joinCodes = leaderboards.joinCodes || {};

    const foundKey = Object.keys(joinCodes).find(
      (key) => joinCodes[key].toLowerCase() === linkInput.toLowerCase()
    );

    if (!foundKey) return setLinkError("Invalid leaderboard code");

    leaderboards[foundKey] = leaderboards[foundKey] || [];
    const exists = leaderboards[foundKey].some(
      (entry) => entry.username === currentUser.username
    );
    if (!exists)
      leaderboards[foundKey].push({ username: currentUser.username, score: 0 });

    const updatedUsers = users.map((u) => {
      if (u.username === currentUser.username) {
        u.leaderboards = u.leaderboards || [];
        if (!u.leaderboards.includes(foundKey)) u.leaderboards.push(foundKey);
        localStorage.setItem("currentUser", JSON.stringify(u));
        setCurrentUser(u);
      }
      return u;
    });

    localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setLinkInput("");
  };

  // Sets up the create leaderboard for teachers
  // Handles errors like empty leaderboard name
  // creates the random leaderboard code and tells the teacher
  const handleCreateLeaderboard = () => {
  if (!newLeaderboard.trim())
    return setLinkError("Enter a leaderboard name");

  const leaderboards = JSON.parse(localStorage.getItem("leaderboards")) || {
    joinCodes: {},
  };
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const joinCodes = leaderboards.joinCodes || {};

  const code =
    newLeaderboard.substring(0, 3).toUpperCase() +np
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const key = newLeaderboard.toLowerCase();

  leaderboards[key] = [];
  joinCodes[key] = code;
  leaderboards.joinCodes = joinCodes;

  const updatedUsers = users.map((u) => {
    if (u.username === currentUser.username) {
      u.leaderboards = u.leaderboards || [];
      if (!u.leaderboards.includes(key)) {
        u.leaderboards.push(key);
      }
      setCurrentUser(u);
      localStorage.setItem("currentUser", JSON.stringify(u));
    }
    return u;
  });

  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  setNewLeaderboard("");
  alert(`Leaderboard "${newLeaderboard}" created! Code: ${code}`);
};


  // Loading if no user
  if (!currentUser)
    return (
      <div className="flex items-center justify-center h-screen bg-[#E8EDF4] text-gray-700">
        Loading account...
      </div>
    );

  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div className="flex flex-col min-h-[100svh] bg-[#E8EDF4] overflow-y-auto pb-[100px]">
      {/* handles the different pages for each type of user */}
      <Header
        title={
          currentUser.role === "parent"
            ? "Parental Controls"
            : currentUser.role === "teacher"
            ? "Teacher Tools"
            : "Account"
        }
      />

      <main className="flex-grow flex flex-col items-center w-full">
        <section className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl text-center mb-6 mt-4">
          <div className="w-28 h-28 rounded-full border-2 border-[#7388ba] bg-cover bg-center mx-auto mb-4">
            <img
              src={currentUser.avatar || DefaultIcon}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold">{currentUser.username}</h2>
          <p className="text-gray-600 capitalize text-lg">{currentUser.role}</p>

          {/* logout button */}
          <button
            onClick={handleLogout}
            className="mt-5 bg-[#c2185b] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#a0154a] transition text-lg"
          >
            Log Out
          </button>
        </section>
        
        {/* Parent page */}
        {currentUser.role === "parent" && (
          <>
            <section className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Linked Accounts</h2>

              <div className="flex justify-center items-center gap-8 flex-wrap mb-6">
                {currentUser.linkedAccounts?.length > 0 ? (
                  currentUser.linkedAccounts.map((child) => {
                    const found = users.find((u) => u.username === child);
                    const avatar = found?.avatar || DefaultIcon;
                    return (
                      <div
                        key={child}
                        className="flex flex-col items-center text-center"
                      >
                        <img
                          src={avatar}
                          alt={child}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#7388ba] shadow-md"
                        />
                        <p className="mt-2 font-semibold text-base">{child}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-lg">No linked accounts yet</p>
                )}
              </div>

              <div className="flex justify-center items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Enter child username"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="border-2 border-[#7388ba] rounded-lg px-3 py-2 text-center w-60"
                />
                <button
                  onClick={handleLinkChild}
                  className="bg-[#43a047] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#388e3c] transition"
                >
                  Link
                </button>
              </div>

              {linkError && <p className="text-red-600 mt-2">{linkError}</p>}
            </section>

            <DropdownSection
              title="Parent Options"
              items={[
                "View Your Child’s Progress",
                "Set Learning Preferences",
                "Set Screen Time",
              ]}
              dropdowns={dropdowns}
              toggleDropdown={toggleDropdown}
            />
          </>
        )}

        {/* Teacher page */}
        {currentUser.role === "teacher" && (
          <>
            <section className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Create a Leaderboard</h2>

              <div className="flex justify-center items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Enter leaderboard name"
                  value={newLeaderboard}
                  onChange={(e) => setNewLeaderboard(e.target.value)}
                  className="border-2 border-[#7388ba] rounded-lg px-3 py-2 text-center w-60"
                />
                <button
                  onClick={handleCreateLeaderboard}
                  className="bg-[#43a047] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#388e3c] transition"
                >
                  Create
                </button>
              </div>
            </section>

            <DropdownSection
              title="Teacher Tools"
              items={[
                "Manage Class Leaderboards",
                "View Student Reports",
                "Create Assignments",
              ]}
              dropdowns={dropdowns}
              toggleDropdown={toggleDropdown}
            />
          </>
        )}

        {/* Student Page */}
        {currentUser.role === "student" && (
          <>
            <section className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Join a Leaderboard</h2>

              <div className="flex justify-center items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Enter leaderboard code"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="border-2 border-[#7388ba] rounded-lg px-3 py-2 text-center w-60"
                />
                <button
                  onClick={handleJoinLeaderboard}
                  className="bg-[#43a047] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#388e3c] transition"
                >
                  Join
                </button>
              </div>

              {linkError && <p className="text-red-600 mt-2">{linkError}</p>}
            </section>

            <DropdownSection
              title="Student Options"
              items={["View Progress", "See Rewards", "Learning Tips"]}
              dropdowns={dropdowns}
              toggleDropdown={toggleDropdown}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function DropdownSection({ title, items, dropdowns, toggleDropdown }) {
  return (
    <section className="bg-[#7388ba] text-white w-full max-w-3xl rounded-2xl mt-6 p-6 text-left text-lg font-medium">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      {items.map((label, index) => {
        const key = `${title}-${index}`;
        const isOpen = dropdowns[key];
        return (
          <div key={key} className="border-b border-white/40 py-3">
            <button
              onClick={() => toggleDropdown(key)}
              className="w-full flex justify-between items-center text-xl font-medium"
            >
              {label}
              <span className="text-2xl font-bold">{isOpen ? "−" : "+"}</span>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <div className="text-white/90 text-base px-2">
                Placeholder content for <strong>{label}</strong>.
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
