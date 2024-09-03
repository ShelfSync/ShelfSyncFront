import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './material-dashboard.css';
import BookList from './BookList';
import BookListView from './BookListView';
import AddBook from './AddBook';
import defaultProfilePic from './covers/nidarda.JPG'; 




const MainPage = () =>{
    const [books, setBooks] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [listActive, setListActive] = useState(false);
    const [addBookView, setAddBookView] = useState(false);
    const [addBookActive , setAddBookActive] = useState(false);
    const [showBookView, setShowBookView] = useState(false);
    const [showListView, setListView] = useState(false);

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
      if(isActive){
        setListActive(false);
        setAddBookActive(false);
        setShowBookView(true);
      } else if (!isActive){ setShowBookView(false); }
      
    };

    const handleProfileClick = () => {
      window.location.href = '/profile';
    }

    

    const handleListViewClick = () => {
      
      setListActive(!listActive);  
      if(listActive){setListView(true);setShowBookView(false);setAddBookView(false);}
      else if (!listActive){setListView(false);}
      
    };

    const handleAddBookClick = () => {
      setAddBookActive(!addBookActive);
      if(addBookActive){setAddBookView(true);setListView(false);setShowBookView(false);}
      else if(!addBookActive){setAddBookView(false);}
    }

   
    return(
        <div class="wrapper ">
        <div class="sidebar"  data-background-color="black" data-image="./assets/img/sidebar-2.jpg">
          <div class="logo">
            <a class="simple-text logo-normal">
              ShelfSync
            </a>
                  <a className="nav-link" href="javascript:void(0)" onClick={handleProfileClick}>
            <img style={{width: '80px', height: '80px' , marginLeft: '32%'}} src={defaultProfilePic} alt="Profile" className="profile-pic" />
        </a>
          </div>
          <div class="sidebar-wrapper">
            <ul class="nav">
              <li className={`nav-link.active ${isActive ? 'nav-link.active' : ''}`}>
                <a class="nav-link"  href = 'javascript:void(2)' onClick={handleLibraryClick}>
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
                <a class="nav-link" href="javascript:void(2)" onClick = {handleAddBookClick}>
                  <i class="material-icons">add</i>
                  <p>Add New</p>
                </a>
              </li>
              <li>
                <a class="nav-link" href="javascript:void(3)">
                  <i class="material-icons">analytics</i>
                  <p>Statistics</p>
                </a>
              </li>
              <li>
                <a class="nav-link" href="javascript:void(3)">
                  <i class="material-icons">coffee</i>
                  <p>Buy us a coffee</p>
                </a>
              </li>
              <li style={{listStyle: 'none', marginTop: '80%'}}>
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
              
              <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span class="sr-only">Toggle navigation</span>
              </button>
              <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
               
                </ul>
              </div>
            </div>
          </nav>
          <div class="content">
            <div class="container-fluid">
             
                {showBookView ? <BookList books = {books} /> : ''}
                {showListView ? <BookListView books = {books} /> : ''}
                {addBookView ? <AddBook /> : ''}
            </div>
          </div>
          </div>
          </div>
    );


};


export default MainPage;