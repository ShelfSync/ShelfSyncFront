import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './register-page';
import MainPage from './main-page'; 
import ProfilePage from './ProfilePage'; 
import BookListView from './BookListView';
import BookList from './BookList';
import BuyCoffee from './BuyCoffeePage';  
import AddBook from './AddBook';
import PrivateRoute from './PrivateRoute'; // PrivateRoute'ı import et

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/main" element={<PrivateRoute element={<MainPage />} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} /> 
        <Route path="/library" element={<PrivateRoute element={<BookList />} />} /> 
        <Route path="/add-book" element={<PrivateRoute element={<AddBook />} />} /> 
        <Route path="/list-view" element={<PrivateRoute element={<BookListView/>} />} /> 
        <Route path="/buy-us-coffee" element={<PrivateRoute element={<BuyCoffee />} />} /> 
        <Route path="/logout" element={<PrivateRoute element={<ProfilePage />} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
