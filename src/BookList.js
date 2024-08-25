import React, { useState } from 'react';
import BookDetails from './BookDetails';
import './BookStyles.css';

const BookList = ({books}) => {
  

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book" onClick={() => handleBookClick(book)}>
          <img src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt={book.title} />
          <h3>{book.title}</h3>
        </div>
      ))}
      {selectedBook && <BookDetails book={selectedBook} closeDetails={closeDetails} />}
    </div>
  );
};

export default BookList;
