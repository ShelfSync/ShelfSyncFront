import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './material-dashboard.css';
import BookList from './BookList';
import BookListView from './BookListView';
import AddBook from './AddBook';
import defaultProfilePic from './covers/nidarda.JPG'; 
import BuyCoffee from './BuyCoffeePage';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [listActive, setListActive] = useState(false);
  const [addBookView, setAddBookView] = useState(false);
  const [addBookActive, setAddBookActive] = useState(false);
  const [showBookView, setShowBookView] = useState(false);
  const [showListView, setListView] = useState(false);
  const [showCoffeeView, setCoffeeView] = useState(false);

  useEffect(() => {
    axios.get('./Books.json')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  const handleLibraryClick = () => {
    setIsActive(!isActive);
    if (isActive) {
      setListActive(false);
      setAddBookActive(false);
      setCoffeeView(false);
      setShowBookView(true);
    } else {
      setShowBookView(false);
    }
  };

  const handleProfileClick = () => {
    window.location.href = '/profile';
  };

  const handleListViewClick = () => {
    setListActive(!listActive);
    if (listActive) {
      setListView(true);
      setShowBookView(false);
      setAddBookView(false);
      setCoffeeView(false);
    } else {
      setListView(false);
    }
  };

  const handleAddBookClick = () => {
    setAddBookActive(!addBookActive);
    if (addBookActive) {
      setAddBookView(true);
      setListView(false);
      setCoffeeView(false);
      setShowBookView(false);
    } else {
      setAddBookView(false);
    }
  };

  const handleCoffeeClick = () => {
    setCoffeeView(!showCoffeeView);
    if (showCoffeeView) {
      setListView(false);
      setShowBookView(false);
      setShowBookView(false);
      setAddBookView(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="sidebar" data-background-color="black" data-image="./assets/img/sidebar-2.jpg">
        <div className="logo">
          <a className="simple-text logo-normal">
            ShelfSync
          </a>
          <a className="nav-link" href="#" onClick={handleProfileClick}>
            <img style={{ width: '80px', height: '80px', marginLeft: '32%' }} src={defaultProfilePic} alt="Profile" className="profile-pic" />
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className={`nav-link ${isActive ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={handleLibraryClick}>
                <i className="material-icons">library_books</i>
                <p>Library</p>
              </a>
            </li>
            <li className={`nav-link ${listActive ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={handleListViewClick}>
                <i className="material-icons">format_list_bulleted</i>
                <p>List View</p>
              </a>
            </li>
            <li className={`nav-link ${addBookActive ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={handleAddBookClick}>
                <i className="material-icons">add</i>
                <p>Add New</p>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <i className="material-icons">analytics</i>
                <p>Statistics</p>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#" onClick={handleCoffeeClick}>
                <i className="material-icons">coffee</i>
                <p>Buy us a coffee</p>
              </a>
            </li>
            <li style={{ listStyle: 'none', marginTop: '30%' }}>
              <a className="nav-link" href="#">
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
          <div className="container-fluid">
            {showBookView && <BookList books={books} />}
            {showListView && <BookListView books={books} />}
            {addBookView && <AddBook />}
            {showCoffeeView && <BuyCoffee />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
