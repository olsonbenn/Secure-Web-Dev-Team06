import React, { useState } from "react";
import { BASE_URL } from "../config.js";
import "../styles.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!email.trim() || !password.trim()) {
            setMessage("Email and password are required.");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json().catch(() => null);

            if (res.ok) {
                setMessage("Signup successful! ✔ You can now log in.");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data?.detail || "Signup failed.");
            }
        } catch (err) {
            setMessage("Network error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>

                <form onSubmit={handleSignup} className="auth-form">
                    <input
                        type="email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                <p className="auth-switch">
                    Already have an account?{" "}
                    <a href="/login" className="auth-link">Log In</a>
                </p>
            </div>
        </div>
    );
}
