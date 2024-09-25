import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBook.css';
import Layout from './Layout';


const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    readDate: '',
    cover: '',
    description: '',
    author: '',
    altAuthor: '',
    publisher: '',
    isbn: '',
    version: '',
    year: '',
    page: '',
    categories: '',
    readingStatus: '0' //default value is not readed
  });
  
  const [books, setBooks] = useState([]);
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [authorSuggestions, setAuthorSuggestions] = useState([]);
  const [altAuthorSuggestions, setAltAuthorSuggestions] = useState([]);
  const [publisherSuggestions, setPublisherSuggestions] = useState([]);
  useEffect(() => {
    axios.get('/Books.json')  
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'title') {
      const filteredTitleSuggestions = books.filter(book =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setTitleSuggestions(filteredTitleSuggestions);
    }

    if (name === 'author') {
      const filteredAuthorSuggestions = books
        .map(book => book.author)
        .filter((author, index, self) =>
          author.toLowerCase().includes(value.toLowerCase()) && self.indexOf(author) === index
        );
      setAuthorSuggestions(filteredAuthorSuggestions);
    }

    if (name === 'altAuthor') {
      const filteredAltAuthorSuggestions = books
        .map(book => book.altAuthor)
        .filter((altAuthor, index, self) =>
          altAuthor.toLowerCase().includes(value.toLowerCase()) && self.indexOf(altAuthor) === index
        );
      setAltAuthorSuggestions(filteredAltAuthorSuggestions);
    }

    if (name === 'publisher') {
      const filteredPublisherSuggestions = books
        .map(book => book.publisher)
        .filter((publisher, index, self) =>
          publisher.toLowerCase().includes(value.toLowerCase()) && self.indexOf(publisher) === index
        );
      setPublisherSuggestions(filteredPublisherSuggestions);
    }
  };

  const handleSuggestionClick = (value, fieldName) => {
    setBookData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));

    // Clear suggestions for the relevant field
    if (fieldName === 'title') {
      setTitleSuggestions([]);
    } else if (fieldName === 'author') {
      setAuthorSuggestions([]);
    } else if (fieldName === 'altAuthor') {
      setAltAuthorSuggestions([]);
    } else if (fieldName === 'publisher') {
      setPublisherSuggestions([]);
    }
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookText = `
      Title: ${bookData.title}
      Read Date: ${bookData.readDate}
      Cover: ${bookData.cover}
      Description: ${bookData.description}
      Author: ${bookData.author}
      Alt Author: ${bookData.altAuthor}
      Isbn: ${bookData.isbn}
      Publisher: ${bookData.publisher}
      Version: ${bookData.version}
      Year: ${bookData.year}
      Page: ${bookData.page}
      Categories: ${bookData.categories.split(',').join(', ')}
      Reading Status: ${bookData.readingStatus === '0' ? 'Okunmadı' : bookData.readingStatus === '1' ? 'Okuyor' : 'Okundu'}
    `;


    
    

    // Reset form after submit
    setBookData({
      title: '',
      readDate: '',
      cover: '',
      description: '',
      author: '',
      altAuthor: '',
      publisher: '',
      version: '',
      year: '',
      page: '',
      categories: ''
    });
  };

  const [selectedCover, setSelectedCover] = useState('');
  const [uploadedCover, setUploadedCover] = useState(null);

  const coverImages = [
    { id: '1', src: 'https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg', alt: 'Kapak 1' },
    { id: '2', src: 'https://content.wepik.com/statics/90897927/preview-page0.jpg', alt: 'Kapak 2' },
    { id: '3', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKm-kN6SwgdZumonm7WhwrQofo8b9_kfxf-A&s', alt: 'Kapak 3' }
  ];
  const handleCoverSelect = (coverId) => {
    setSelectedCover(coverId);
    setUploadedCover(null);
    setBookData((prevState) => ({
      ...prevState,
      cover: coverId,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedCover(file);
    setSelectedCover('');
    setBookData((prevState) => ({
      ...prevState,
      cover: file.name,
    }));
  };

  return (
    <Layout>
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
        {titleSuggestions.length > 0 && (
          <ul className="suggestions">
            {titleSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion.title, 'title')}
                style={{ cursor: 'pointer' }}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
        <label>Read Date</label>
        <input
          type="date"
          name="readDate"
          placeholder="Read Date"
          value={bookData.readDate}
          onChange={handleChange}
        />
        
        
        <label>Author</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
        {authorSuggestions.length > 0 && (
          <ul className="suggestions">
            {authorSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, 'author')}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <label>Alt Author</label>
        <input
          type="text"
          name="altAuthor"
          placeholder="Alt Author"
          value={bookData.altAuthor}
          onChange={handleChange}
        />
        {altAuthorSuggestions.length > 0 && (
          <ul className="suggestions">
            {altAuthorSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, 'altAuthor')}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

<label>Isbn</label>
        <input
          type="text"
          name="isbn"
          placeholder="Isbn"
          value={bookData.isbn}
          onChange={handleChange}
        />
        

        <label>Publisher</label>
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={bookData.publisher}
          onChange={handleChange}
          required
        />
        {publisherSuggestions.length > 0 && (
          <ul className="suggestions">
            {publisherSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, 'publisher')}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <label>Version</label>
        <input
          type="number"
          name="version"
          placeholder="Version"
          value={bookData.version}
          onChange={handleChange}
        />
        <label>Year</label>
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={bookData.year}
          onChange={handleChange}
        />
        <label>Page Count</label>
        <input
          type="number"
          name="page"
          placeholder="Page Count"
          value={bookData.page}
          onChange={handleChange}
        />
        <label>Reading Status</label>
        <select
          name="readingStatus"
          value={bookData.readingStatus}
          onChange={handleChange}
        >
          <option value="0">To Read</option>
          <option value="1">Reading</option>
          <option value="2">Read</option>
        </select>

        <label>Genres</label>
        <input
          type="text"
          name="categories"
          placeholder="Genres (comma separated)"
          value={bookData.categories}
          onChange={handleChange}
        />

        <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={bookData.description}
            onChange={handleChange}
        />

        <div className="cover-selection">
          <h3>Select Cover</h3>
          <div className="cover-images">
            {coverImages.map((cover) => (
              <img
                key={cover.id}
                src={cover.src}

                alt={cover.alt}
                onClick={() => handleCoverSelect(cover.id)}
                style={{
                  border: selectedCover === cover.id ? '2px solid blue' : '2px solid transparent',
                  cursor: 'pointer',
                  width: '100px',
                  height: '150px',
                }}
              />
            ))}
          </div>
          <div >
            <label>Or upload your own cover:</label>
            <br></br>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </div>
        <button type="submit">Save Book</button>
      </form>
    </div>
    </Layout>
  );
};

export default AddBook;
