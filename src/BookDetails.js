import React, { useState } from 'react';
import axios from 'axios';

const BookDetails = ({ book, closeDetails }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [altAuthor, setAltAuthor] = useState(book.altAuthor);
  const [publisher, setPublisher] = useState(book.publisher);
  const [version, setVersion] = useState(book.version);
  const [year, setYear] = useState(book.year);
  const [isbn, setIsbn] = useState(book.isbn);

  const [readDate, setReadDate] = useState(book.readedDate);
  const [addedDate, setAddedDate] = useState(book.addedData);
  const [pageCount, setPageCount] = useState(book.page);
  const [description, setDescription] = useState(book.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await axios.post('https://test.test', {
        ...book,
        title,
        author,
        altAuthor,
        publisher,
        version,
        readDate,
        addedDate,
        page: pageCount,
        description,
      });
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
            {book.genres.map((genre) => (
              <div key={genre.id} className="category-item">
                {genre.name}
              </div>
            ))}
          </div>
        </div>
        <div className="book-info">
          <h2>{ title}</h2>
          
          <p>
            <span style={{ fontWeight: 'bold' }}>Author:</span> 
            {isEditing ? <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /> : author}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Alt Author:</span> 
            {isEditing ? <input type="text" value={altAuthor} onChange={(e) => setAltAuthor(e.target.value)} /> : altAuthor}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Publisher:</span> 
            {isEditing ? <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} /> : publisher}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Version:</span> 
            {isEditing ? <input type="number" value={version} onChange={(e) => setVersion(Number(e.target.value))} /> : version}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Year:</span> 
            {isEditing ? <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} /> : year}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Isbn:</span> 
            {isEditing ? <input type="text" value={isbn} onChange={(e) => setIsbn(Number(e.target.value))} /> : isbn}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Read Date:</span> 
            {isEditing ? <input type="date" value={readDate} onChange={(e) => setReadDate(e.target.value)} /> : readDate}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Added Date:</span> 
            {isEditing ? <input type="date" value={addedDate} onChange={(e) => setAddedDate(e.target.value)} /> : addedDate}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Page Count:</span> 
            {isEditing ? <input type="number" value={pageCount} onChange={(e) => setPageCount(Number(e.target.value))} /> : pageCount}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Description:</span> 
            {isEditing ? (
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" cols="30" />
            ) : (
              description
            )}
          </p>
          
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
