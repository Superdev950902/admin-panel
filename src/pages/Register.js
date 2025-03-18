import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

import { LogoSection } from '../components/LoginComponent/LogoSection';

import { BACKEND_URL } from "../config.js"

const Resigter = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(BACKEND_URL + '/api/users/admin/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Sign-up successful! Redirecting...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Error registering user');
        }
    };

    return (
        <div className="login-container">
            <LogoSection />
            <div className="login-right-side">
                <Form style={{ display: "flex", flexDirection: "column", width: "300px" }} onSubmit={handleSignUp}>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <br/>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="custom-input mb-3 w-100"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <br/>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="custom-input mb-3 w-100"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="custom-input mb-3 w-100"
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <br/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="custom-input mb-3 w-100"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-3">
                        <button className="custom-btn w-30 rounded" style={{ width: "40%" }} type="submit">
                            Sign Up
                        </button>
                        <button className="custom-btn w-30 rounded" style={{ width: "40%" }} onClick={() => navigate('/login')} >
                            Back
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Resigter;
