import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./utils/authService";
import { isLocked, registerFailure, registerSuccess, lockInfo } from "./utils/lockout";
import { initializeLocalStorage } from "./utils/initLocalStorage";
import LightBackground from "./assets/Light Background.png";

export default function Login() {
  // Sets up use states
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if account locked user cant log in 
    if (isLocked()) {
      const info = lockInfo();
      alert(`Account locked until ${new Date(info.unlockAt).toLocaleTimeString()}`);
      return;
    }
    //login attempt 
    try {
      const res = await login(username, password);
      registerSuccess();
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const fullUser = users.find((u) => u.username === username);

      if (fullUser) {
        // sets current user
        localStorage.setItem("currentUser", JSON.stringify(fullUser));
      } else {
        localStorage.setItem("currentUser",JSON.stringify({ username, role: "student", linkedAccounts: [] })
        );
      }
      //navigates to OTP or home depending on requirement 
      if (res.status === "MFA_REQUIRED") {
        navigate("/otp");
      } else {
        navigate("/home");
      }
      {/* Catches failures */}
    } catch (err) {
      registerFailure();
      alert(err.message);
    }
  };

  // Demo button for data reset for testing purposes 
  const handleResetData = () => {
    if (
      window.confirm(
        "This will erase all progress and restore default demo data.\nAre you sure you want to continue?"
      )
    ) {
      initializeLocalStorage(true);
      alert("Data has been reset to default!");
      window.location.reload();
    }
  };

  return (
    <div
      className="h-[100svh] w-[100vw] flex flex-col items-center justify-center px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${LightBackground})` }}
    >
      {/* Input fields and submit button */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md text-center"
      >
        <input
          type="text"
          placeholder="enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-4 border-[#0d47a1] rounded-xl px-4 py-3 text-lg text-center placeholder-gray-400 font-medium"
          required
        />

        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-4 border-[#c2185b] rounded-xl px-4 py-3 text-lg text-center placeholder-gray-400 font-medium"
          required
        />

        <button
          type="submit"
          className="mt-2 bg-[#43a047] text-black font-bold text-xl rounded-xl py-3 border border-black hover:scale-105 transition"
        >
          Sign In
        </button>
      </form>

      {/* Navigate to create account */}
      <button
        onClick={() => navigate("/create-account")}
        className="mt-6 text-lg font-semibold text-black bg-white/80 border border-black rounded-xl py-2 px-6 hover:scale-105 transition"
      >
        Create Account
      </button>

      <button
        onClick={handleResetData}
        className="mt-8 text-lg font-semibold text-white bg-[#c2185b] border border-black rounded-xl py-2 px-6 hover:bg-[#a0154a] hover:scale-105 transition"
      >
        Reset App Data
      </button>
    </div>
  );
}
