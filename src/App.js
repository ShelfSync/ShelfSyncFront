import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './register-page';
import MainPage from './main-page'; 
import ProfilePage from './ProfilePage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        {/* Diğer rotalar buraya eklenebilir */}
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/profile" element={<ProfilePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
