import React, { useState } from 'react';
import './styles/login.css';
import logo from './covers/shelfLogo.png';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const headers = {
        'Content-Type': 'application/json',
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        

        setErrorMessage('');
        alert('Form submitted successfully!');
        
       axios.post('https://', {username, password}, {
        headers: headers
      })
    };

    return (
        <div className="login-wrapper">
            <div className="login-header">
                <img src={logo} alt="Logo" className="login-logo" />
                <h2>Welcome To ShelfSync</h2>
                <h5>
                    Don't have an account? Go To{' '}
                    <button className="text-button">Register Page</button>
                </h5>
            </div>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                    <button type="submit">Login</button>
                    {errorMessage && <div id="errorMessage" className="error-message">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
