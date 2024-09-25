import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles/register.css';
import logo from './covers/shelfLogo.png';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const headers = {
        'Content-Type': 'application/json',
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }
        
        axios.post('http://localhost:5193/api/Auth/login', { username, password }, {
            headers: headers,
        })
        .then(response => {            
            const token = response.data.data.accessToken; 
            localStorage.setItem('token', token); 
            alert('Login successful!');
            navigate('/library'); 
        })
        .catch(error => {
            setErrorMessage('Login failed. Please try again.');
        });
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        axios.post('http://localhost:5193/api/Auth/register', { username, password }, {
            headers: headers,
        })
        .then(response => {
            alert('Registration successful!');
        })
        .catch(error => {
            setErrorMessage('Registration failed. Please try again.');
        });
    };

    return (
        <div className="register-wrapper">
            <div className="register-header">
                <img src={logo} alt="Logo" className="register-logo" />
                <h2>Welcome To ShelfSync</h2>
                
            </div>
            <div className="register-form">
                <form>
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
                    <div className="button-group">
                        <button type="button" onClick={handleLoginSubmit}>Login</button>
                        <button type="button" onClick={handleRegisterSubmit}>Register</button>
                    </div>
                    {errorMessage && <div id="errorMessage" className="error-message">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;


