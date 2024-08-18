import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './material-dashboard.css';
import BookList from './BookList';



const MainPage = () =>{
    const [Books, setBooks] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [User, setUser] = useState(null);
    const [showBookView, setShowBookView] = useState(false);
    const [listView, setListView] = useState(false);


    const handleLibraryClick = () => {
      setIsActive(!isActive);  // Aktif durumu tersine çevirir
      setShowBookView(true);
    };

    const handleListViewClick = () => {
      setIsActive(!isActive);  // Aktif durumu tersine çevirir
      setListView(true);
    };

    useEffect(() => {
            const fetchBooks = async () => {
                try {
                    const response = await axios.get('');
                    setBooks(response);
                    
                  } catch (error) {
                    console.error('Error fetching books', error);
                  }
    
            }

            const fetchUser = async () => {
              try {
                  const response = await axios.get('');
                  setUser(response);
                  
                } catch (error) {
                  console.error('Error fetching user data', error);
                }
  
          }
        

        fetchBooks();
        fetchUser();
    }, []);

    if (!Books) return <p> Loading.. </p>;

    return(
        <div class="wrapper ">
        <div class="sidebar"  data-background-color="black" data-image="./assets/img/sidebar-2.jpg">
          <div class="logo">
            <a class="simple-text logo-normal">
              ShelfSync
            </a>
          </div>
          <div class="sidebar-wrapper">
            <ul class="nav">
              <li className={`nav-link.active ${isActive ? 'nav-link.active' : ''}`}>
                <a class="nav-link"  href = '#' onClick={handleLibraryClick}>
                  <i class="material-icons">library_books</i>
                  <p>Library</p>
                </a>       
              </li>
              <li>
                <a class="nav-link"  href="javascript:void(2)" onClick={handleListViewClick}>
                  <i class="material-icons">format_list_bulleted</i>
                  <p>List View</p>
                </a>
              </li>
              <li>
                <a class="nav-link" href="javascript:void(2)">
                  <i class="material-icons">add</i>
                  <p>Add New</p>
                </a>
              </li>
              <li>
                <a class="nav-link" href="javascript:void(3)">
                  <i class="material-icons">person</i>
                  <p>Settings</p>
                </a>
              </li>
              <li style={{listStyle: 'none', marginTop: '110%'}}>
                <a class="nav-link" href="javascript:void(3)">
                  <i class="material-icons">logout</i>
                  <p>Logout</p>
                </a>
            </li>
            </ul>
            
            
          </div>
          
        </div>
        <div class="main-panel">
          <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div class="container-fluid">
              <div class="navbar-wrapper">
                <a class="navbar-brand" href="javascript:void(0)">Buy us a coffee</a>
    
              </div>
              <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">
                      <p >asd</p>
                      <i class="material-icons">person</i>
                      <p class="d-lg-none d-md-block">
                        
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="content">
            <div class="container-fluid">
                {/* <div class="book-card">
                    <a href = "">
                        <div class="book-card-image">
                            <img src="https://via.placeholder.com/150" alt="Book Cover"/>
                        </div>
                        <div class="book-card-header">
                            <h2>Book Title</h2>
                        </div>
                    </a>
                </div> */}
                {showBookView ? <BookList /> : ''}
            </div>
          </div>
          </div>
          </div>
    );


};


export default MainPage;