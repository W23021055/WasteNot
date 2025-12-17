import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// imports all pages
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Home";
import Otp from "./Otp";
import Games from "./Games";
import Education from "./Education";
import Leaderboard from "./Leaderboard";
import Account from "./Account";
import Rewards from "./Rewards";
import GamePage from "./components/GamePage";
import EducationPage from "./components/EducationPage";
import PreSelect from "./Preselect";

import "./index.css";

// Sets up redirects so they all go to the right page 
const RootApp = () => (
  <React.StrictMode>
    <BrowserRouter basename="/kv6014/Waste-not">
      <Routes>
        <Route path="/" element={<PreSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/games" element={<Games />} />
        <Route path="/education" element={<Education />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/education/:lessonId" element={<EducationPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<RootApp />);


