import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StrengthBar from "./components/StrengthBar";
import { evaluatePasswordStrength, meetsPolicy } from "./utils/password";
import { registerAccount } from "./utils/authService";
import LightBackground from "./assets/Light Background.png";

export default function CreateAccount() {
  // Sets up use states
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("too-short");
  const [role, setRole] = useState("");

  // Input handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    // checks all fields are filled
    if (!email || !username || !password || !role) {
      alert("Please fill all fields and select your role.");
      return;
    }

    // checks password is strong enough
    if (!meetsPolicy(password)) {
      alert("Password does not meet policy (≥8 chars, upper/lower, number, symbol)");
      return;
    }

    // register check
    try {
      await registerAccount(email, username, password, role);
      navigate("/otp");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center overflow-y-auto"
      style={{
        backgroundImage: `url(${LightBackground})`,
        backgroundAttachment: "fixed",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full px-6 py-8 max-w-md">
        {/* Submit button */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full text-center"
        >
          {/* Input Boxes */}
          <input
            type="email"
            placeholder="enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-4 border-[#0d47a1] rounded-xl px-4 py-3 text-lg text-center placeholder-gray-400 font-medium"
            required
          />

          <input
            type="text"
            placeholder="create username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-4 border-[#0d47a1] rounded-xl px-4 py-3 text-lg text-center placeholder-gray-400 font-medium"
            required
          />

          <input
            type="password"
            placeholder="create password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setStrength(evaluatePasswordStrength(e.target.value));
            }}
            className="border-4 border-[#c2185b] rounded-xl px-4 py-3 text-lg text-center placeholder-gray-400 font-medium"
            required
          />

          {/* gets strength bars */}
          <StrengthBar strength={strength} />

          {/* Account type selection */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {["parent", "teacher", "student"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`min-w-[110px] px-6 py-2 rounded-full font-semibold text-lg border transition-all ${
                  role === r
                    ? r === "parent"
                      ? "bg-[#e53935] text-white border-black scale-105"
                      : r === "teacher"
                      ? "bg-[#ef6c00] text-white border-black scale-105"
                      : "bg-[#7bb241] text-white border-black scale-105"
                    : "bg-white/80 text-black border-gray-400 hover:scale-105"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Create account button */}
          <button
            type="submit"
            className="mt-4 bg-[#43a047] text-black font-bold text-xl rounded-xl py-3 border border-black hover:scale-105 transition"
          >
            Create Account
          </button>

          {/* Redirect to sign in */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-4 bg-white/80 text-black font-semibold text-lg rounded-xl py-2 border border-black hover:scale-105 transition"
          >
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
