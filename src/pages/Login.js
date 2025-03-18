import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoSection } from '../components/LoginComponent/LogoSection';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BACKEND_URL } from "../config.js";

const LoginPage = ({ loginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(BACKEND_URL + '/api/users/admin/login',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    })
                }
            );

            const result = await response.json();
            console.log(result);
            if (result.isOk) {
                localStorage.setItem('user', JSON.stringify(result.admin));
                loginSuccess(result.admin);

                toast.success('Login successful!');

                navigate('/home'); // Redirect to dashboard after login
            } else {
                setError(result.message);
                if (result.error)
                    toast.error(result.message || "Network Error!");
                else {
                    toast.error(result.message || "Login failed!");
                }
            }
        } catch (error) {
            setError('Error logging in');
            toast.error("Error logging in. Please try again!");
        }
    };

    return (
        <div className="login-container">
            <LogoSection />
            <div className="login-right-side">
                <form
                    style={{ display: "flex", flexDirection: "column", width: "300px" }}
                    onSubmit={handleLogin}
                >
                     <h2 className="text-center mb-4 h4" style={{ color: "#dfdee0" }}>SIGN IN</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="custom-input mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input mb-3"
                    />
                    <button
                        className="custom-btn w-100 rounded"
                        type="submit"
                    >
                        SIGN IN
                    </button>
                    <div className="d-flex justify-content-between mt-3">
                        <a href="/register" style={{ color: "#efeff0" }}>Sign up</a>
                        <a href="#" style={{ color: "#efeff0" }}>Remind Password</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
