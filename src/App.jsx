import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Connect4 from "./pages/Connect4";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <>
            <Navbar />

            <Routes>
                {/* public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

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
