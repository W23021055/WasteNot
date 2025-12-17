import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "./utils/authService";
import LightBackground from "./assets/Light Background.png";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  // Handles verification and navigates to home
  const handleVerify = async () => {
    try {
      const res = await verifyOtp(otp);
      localStorage.setItem("sessionToken", res.token);
      alert("MFA complete. You are logged in!");
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="h-[100svh] w-[100vw] flex flex-col items-center justify-center px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${LightBackground})` }}
    >
      {/* OTP in put and displays the demo code for testing speed */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-white drop-shadow-lg">
          Enter OTP
        </h1>
        <p className="text-lg text-white/90 mb-6 drop-shadow-sm">
          Demo code: <span className="font-semibold text-[#ffeb3b]">123456</span>
        </p>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter 6-digit code"
          className="border-4 border-[#0d47a1] rounded-xl px-4 py-3 text-lg text-center placeholder-gray-400 font-medium mb-6 w-full"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="bg-[#43a047] text-black font-bold text-xl rounded-xl py-3 px-8 border border-black hover:scale-105 transition mb-4 w-full"
        >
          Verify
        </button>

        {/* Navigate back to log in */}
        <button
          onClick={() => navigate("/login")}
          className="bg-white/80 text-black font-semibold text-lg rounded-xl py-2 px-6 border border-black hover:scale-105 transition"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
