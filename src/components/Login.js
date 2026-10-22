
import React, { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess, onShowRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(sessionStorage.getItem("token"))
    );

    // 1. Handle customer login
    const handleLogin = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Login failed.");
                return;
            }

            // 2. Check that the backend returned a token
            if (!data.token) {
                setMessage(
                    "Login succeeded, but no token was returned."
                );
                return;
            }

            // 3. Save the token and user information
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setIsLoggedIn(true);
            setMessage("Welcome, " + data.user.name + "!");
            onLoginSuccess();

        } catch (error) {
            setMessage("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    // 4. Test the protected backend route
    const handleProtectedRequest = async () => {
        setMessage("Testing protected route...");

        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                setIsLoggedIn(false);
                setMessage("No token found. Please log in again.");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/protected",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Access denied.");
                return;
            }

            setMessage(data.message);

        } catch (error) {
            setMessage("Could not connect to the server.");
        }
    };

    // 5. Display the login form and test button
    return (
        <div className="login-container" >
            <h2>Login to Arnold Tech Store</h2>

            <form className="login-form" onSubmit={handleLogin}>
                <div className="login-field">
                    <label htmlFor="login-email">
                        Email Address
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="login-password">
                        Password
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="login-register-prompt">
                New to Arnold Tech Store?
            </p>
            <button type="button" onClick={onShowRegister}>
                Create an account
            </button>

            {isLoggedIn && (
                <button
                    type="button"
                    onClick={handleProtectedRequest}
                >
                    Test Protected Route
                </button>
            )}

            {message && (
                <p className="login-message" role="status">
                    {message}
                </p>
            )}
        </div>
    );
}

export default Login;
