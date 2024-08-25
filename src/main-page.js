import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './material-dashboard.css';
import BookList from './BookList';
import BookListView from './BookListView';



const MainPage = () =>{
    const [Books, setBooks] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [listActive, setListActive] = useState(false);
    const [User, setUser] = useState(null);
    const [showBookView, setShowBookView] = useState(false);
    const [showListView, setListView] = useState(false);

    const books = [
      {
        id: 1,
        title: "Aristoteles'in Etik Kitapları",
        readDate: "2022-01-15",
        addedDate: "2022-01-16",
        cover: '1',
        description: 'Aristoteles’in etik düşünceleri üzerine bir inceleme.',
        author: "John Smith",
        altAuthor: "Emily Johnson",
        publisher: "Oxford University Press",
        version: "2",
        year: "2022",
        page: "350",
        categories: ["Felsefe", "Etik", "Klasik"]
      },
      {
        id: 2,
        title: "Bilim ve Teknoloji Tarihi",
        readDate: "2023-05-12",
        addedDate: "2023-05-14",
        cover: '2',
        description: 'Bilim ve teknolojinin tarihsel gelişimini anlatan bir çalışma.',
        author: "Alice Williams",
        altAuthor: "Robert Brown",
        publisher: "Cambridge University Press",
        version: "1",
        year: "2023",
        page: "420",
        categories: ["Bilim", "Teknoloji", "Tarih"]
      },
      {
        id: 3,
        title: "Orta Çağ Felsefesi",
        readDate: "2022-11-23",
        addedDate: "2022-11-25",
        cover: '3',
        description: 'Orta Çağ felsefesinin önemli düşünürleri ve teorileri.',
        author: "Sarah Davis",
        altAuthor: "Michael Clark",
        publisher: "Harvard University Press",
        version: "3",
        year: "2022",
        page: "280",
        categories: ["Felsefe", "Orta Çağ", "Teori"]
      },
      {
        id: 4,
        title: "Modern Sanatın Temelleri",
        readDate: "2023-02-09",
        addedDate: "2023-02-10",
        cover: '4',
        description: 'Modern sanat akımlarının gelişimi ve etkileri.',
        author: "David Wilson",
        altAuthor: "Linda Martinez",
        publisher: "Princeton University Press",
        version: "1",
        year: "2023",
        page: "350",
        categories: ["Sanat", "Modern", "Tarih"]
      },
      {
        id: 5,
        title: "Dijital Çağ ve Toplum",
        readDate: "2024-06-18",
        addedDate: "2024-06-20",
        cover: '5',
        description: 'Dijital teknolojilerin toplum üzerindeki etkileri ve değişimleri.',
        author: "Laura Taylor",
        altAuthor: "James Anderson",
        publisher: "MIT Press",
        version: "2",
        year: "2024",
        page: "400",
        categories: ["Sosyoloji", "Dijital Teknoloji", "Toplum"]
      },
      {
        id: 6,
        title: "Kültürel Çalışmalar ve Medya",
        readDate: "2023-07-30",
        addedDate: "2023-08-01",
        cover: '6',
        description: 'Kültürel çalışmaların medya üzerindeki etkileri ve yansımaları.',
        author: "Emma Wilson",
        altAuthor: "Daniel Lee",
        publisher: "University of Chicago Press",
        version: "1",
        year: "2023",
        page: "320",
        categories: ["Medya", "Kültürel Çalışmalar", "Sosyoloji"]
      },
      {
        id: 7,
        title: "Tarihsel Psikoloji",
        readDate: "2024-01-25",
        addedDate: "2024-01-26",
        cover: '7',
        description: 'Psikolojinin tarihsel gelişimi ve önemli teorileri.',
        author: "William Green",
        altAuthor: "Jessica White",
        publisher: "Stanford University Press",
        version: "2",
        year: "2024",
        page: "330",
        categories: ["Psikoloji", "Tarih", "Teori"]
      },
      {
        id: 8,
        title: "Ekonomi ve Siyaset",
        readDate: "2024-03-10",
        addedDate: "2024-03-12",
        cover: '8',
        description: 'Ekonomik teorilerin siyaset üzerindeki etkileri.',
        author: "Sophia Brown",
        altAuthor: "Liam Harris",
        publisher: "Yale University Press",
        version: "1",
        year: "2024",
        page: "360",
        categories: ["Ekonomi", "Siyaset", "Teori"]
      },
      {
        id: 9,
        title: "Bilimsel Araştırma Yöntemleri",
        readDate: "2023-12-05",
        addedDate: "2023-12-06",
        cover: '9',
        description: 'Bilimsel araştırma yöntemlerinin kapsamlı bir incelemesi.',
        author: "Olivia Martin",
        altAuthor: "Noah Clark",
        publisher: "University of California Press",
        version: "3",
        year: "2023",
        page: "380",
        categories: ["Bilim", "Araştırma", "Metodoloji"]
      }
    ];
    


    const handleLibraryClick = () => {
      setIsActive(!isActive);  // Aktif durumu tersine çevirir
      if(!isActive){
        setListActive(false);
        setShowBookView(true);
      } else if (isActive){ setShowBookView(false); }
      
    };

    

    const handleListViewClick = () => {
      setShowBookView(false);
      setListActive(!listActive);  // Aktif durumu tersine çevirir
      if(!listActive){setListView(true);}
      else if (listActive){setListView(false);}
      
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
                <i class="material-icons">coffee</i>
    
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
                {showBookView ? <BookList books = {books} /> : ''}
                {showListView ? <BookListView books = {books} /> : ''}
            </div>
          </div>
          </div>
          </div>
    );


};


export default MainPage;