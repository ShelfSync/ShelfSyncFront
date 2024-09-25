import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';
import './BookStyles.css';
import Layout from './Layout';



const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5193/api/Books', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setBooks(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);
  

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeDetails = () => {
    setSelectedBook(null);
  };

  return (
    <Layout>
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book" onClick={() => handleBookClick(book)}>
          <img src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt={book.title} />
          <h3>{book.title}</h3>
        </div>
      ))}
      {selectedBook && <BookDetails book={selectedBook} closeDetails={closeDetails} />}
    </div>
    </Layout>
  );
};

export default BookList;
