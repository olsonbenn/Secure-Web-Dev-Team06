import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Connect4 from "./pages/Connect4";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MinesweeperHome from "./pages/MinesweeperHome";
import Minesweeper from "./pages/Minesweeper";

export default function App() {
    //const [dataF,setDataF] = useState({});
    const [viewer,setViewer] = useState(0);

    return (
        <>
            <Navbar />

            <Routes>
                {/* public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/minesweeper-home" element={<MinesweeperHome />} />
                <Route path="/minesweeper" element={<Minesweeper />} />

                {/* protected routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tictactoe"
                    element={
                        <ProtectedRoute>
                            <TicTacToe />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/connect4"
                    element={
                        <ProtectedRoute>
                            <Connect4 />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}
