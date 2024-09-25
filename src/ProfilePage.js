import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/profile.css';
import defaultProfilePic from './covers/nidarda.JPG'; 
import axios from 'axios';

const ProfilePage = () => {
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [user, setUsers] = useState({});
    const [bookCount, setBookCount] = useState(); 
    const [isPrivate, setIsPrivate] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5193/api/Books', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
            const bookCount = response.data.data.length;
            setBookCount(bookCount);
            
        })
        .catch(error => {
            console.error("There was an error fetching the books!", error);
        });
    }, []);

   

    function parseJWT(token) {
        const base64Url = token.split('.')[1];
      
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      }

     const token = localStorage.getItem('token');
     const username = parseJWT(token).username;
    const navigate = useNavigate(); 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePasswordChange = async  (event) => {
        event.preventDefault();
        if (!currentPassword || !newPassword) {
            setPasswordError('Please fill out all fields.');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters long.');
            return;
        }
        try {
            const username = "nidos";
            const response = await axios.post('http://localhost:5193/api/Auth/changePassword', {
                currentPassword,
                newPassword,
                username
            });
            if (response.status === 200) {
                alert('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setPasswordError('');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError('Failed to change password. Please try again.');
        }
    };

    const handlePrivacyChange = (event) => {
        setIsPrivate(event.target.checked);
        axios.post('/updatePrivacy', { isPrivate: event.target.checked })
            .then(response => {
                console.log('Privacy setting updated');
            })
            .catch(error => {
                console.error("There was an error updating privacy setting!", error);
            });
    };

    const goToHomePage = () => {
        navigate('/library'); 
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <button className="back-to-home" onClick={goToHomePage}>
                    &larr; 
                </button>
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <h1>{username}</h1>
                <label className="upload-button">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    Change Profile Picture
                </label>
            </div>
            <div className="profile-info">
                <h2>Profile Information</h2>
                <div className="profile-info-item">
                    <label>Username:</label>
                    <p>{username}</p>
                </div>
                <div className="profile-info-item">
                    <label>Book Count:</label>
                    <p>{bookCount}</p>
                </div>
                <div className="profile-info-item">
                    <label>Private Profile:</label>
                    <input 
                        style= {{color: "red"}}
                        type="checkbox" 
                        checked={isPrivate} 
                        onChange={handlePrivacyChange} 
                    />
                </div>
            </div>
            <div className="password-change">
                <h2>Change Password</h2>
                <form onSubmit={handlePasswordChange}>
                    <div className="password-change-item">
                        <label>Current Password:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="password-change-item">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
