import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            {token && (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/tictactoe">Tic Tac Toe</Link>
                    <Link to="/connect4">Connect 4</Link>
                    <Link to="/minesweeper">Minesweeper</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}

            {!token && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
}
