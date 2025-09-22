import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )
}
