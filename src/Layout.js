import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import defaultProfilePic from './covers/nidarda.JPG'; 
import './styles/material-dashboard.css';

const Layout = ({ children }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };


  return (
    <div className="wrapper">
      <div className="sidebar" data-background-color="black" data-image="./assets/img/sidebar-2.jpg">
        <div className="logo">
          <a href="/" className="simple-text logo-normal">
            ShelfSync
          </a>
          <a className="nav-link" href="/profile">
            <img style={{ width: '80px', height: '80px', marginLeft: '32%' }} src={defaultProfilePic} alt="Profile" className="profile-pic" />
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-link">
              <a className="nav-link" href="/library">
                <i className="material-icons">library_books</i>
                <p>Library</p>
              </a>
            </li>
            <li className="nav-link">
              <a className="nav-link" href="/list-view">
                <i className="material-icons">format_list_bulleted</i>
                <p>List View</p>
              </a>
            </li>
            <li className="nav-link">
              <a className="nav-link" href="/add-book">
                <i className="material-icons">add</i>
                <p>Add New</p>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/statistics">
                <i className="material-icons">analytics</i>
                <p>Statistics</p>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/buy-us-coffee">
                <i className="material-icons">coffee</i>
                <p>Buy us a coffee</p>
              </a>
            </li>
            <li style={{ listStyle: 'none', marginTop: '30%' }}>
              <a className="nav-link" href="" onClick={handleLogout}> 
                <i className="material-icons">logout</i>
                <p>Logout</p>
              </a>
            </li>

          </ul>
        </div>
      </div>

      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
              <span className="sr-only">Toggle navigation</span>
            </button>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav"></ul>
            </div>
          </div>
        </nav>

        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
