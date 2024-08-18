import React, { useState } from 'react';
import axios from 'axios';

const BookDetails = ({ book, closeDetails }) => {
  const [description, setDescription] = useState(book.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post('https://test.test', { ...book, description });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving book details', error);
    }
  };

  return (
    <div className="book-details">
      <div className="details-content">
        <span className="close" onClick={closeDetails}>&times;</span>
        <div>
          <div className="book-image-container">
            <img className="book-image" src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt="Book Cover" />
            <div className="book-onTitle">{book.title}</div>
          </div>
          <div className="categories-container">
          {book.categories.map((category, index) => (
            <div key={index} className="category-item">
              {category}
            </div>
          ))}
        </div>
        </div>
        <div className="book-info">
          <h2>{book.title}</h2>
          <p>
            <span style={{ fontWeight: 'bold' }}>Author:</span> {book.author}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Alt Author:</span> {book.altAuthor}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Publisher:</span> {book.publisher}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Version:</span> {book.version}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Read Date:</span> {book.readDate}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Added Date:</span> {book.addedDate}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Page Count:</span> {book.page}
          </p>
          
          <p>
            <span style={{ fontWeight: 'bold' }}>Description: </span> 
          </p>
          {isEditing ? (
            <>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                rows="5"
                cols="30"
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <div className="description">
              <p>{description}</p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
