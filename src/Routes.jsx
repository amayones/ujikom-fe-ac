import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/User/Home'
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";
import History from "./pages/User/History";
import NowPlaying from "./pages/User/NowPlaying";
import ComingSoon from "./pages/User/ComingSoon";

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User */}
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/play-now" element={<NowPlaying />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </div>
    )
}
