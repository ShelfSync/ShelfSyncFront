import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    readDate: '',
    addedDate: '',
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
  const [books, setBooks] = useState([]);
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [authorSuggestions, setAuthorSuggestions] = useState([]);
  const [altAuthorSuggestions, setAltAuthorSuggestions] = useState([]);
  const [publisherSuggestions, setPublisherSuggestions] = useState([]);

  useEffect(() => {
    // Kitapları JSON dosyasından çekme
    axios.get('/Books.json')  // JSON dosyanızın yolu
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

    // Öneri sistemini güncelle
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

    // Verileri txt dosyasına kaydetme
    const bookText = `
      Title: ${bookData.title}
      Read Date: ${bookData.readDate}
      Added Date: ${bookData.addedDate}
      Cover: ${bookData.cover}
      Description: ${bookData.description}
      Author: ${bookData.author}
      Alt Author: ${bookData.altAuthor}
      Publisher: ${bookData.publisher}
      Version: ${bookData.version}
      Year: ${bookData.year}
      Page: ${bookData.page}
      Categories: ${bookData.categories.split(',').join(', ')}
    `;

    // Dosya kaydetme işlemi (simülasyon)
    const blob = new Blob([bookText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bookData.txt';
    link.click();

    // Formu sıfırla
    setBookData({
      title: '',
      readDate: '',
      addedDate: '',
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
        <label>Added Date</label>
        <input
          type="date"
          name="addedDate"
          placeholder="Added Date"
          value={bookData.addedDate}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={bookData.description}
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
          type="text"
          name="version"
          placeholder="Version"
          value={bookData.version}
          onChange={handleChange}
        />
        <label>Year</label>
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={bookData.year}
          onChange={handleChange}
        />
        <label>Page</label>
        <input
          type="text"
          name="page"
          placeholder="Page"
          value={bookData.page}
          onChange={handleChange}
        />
        <label>Categories</label>
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma separated)"
          value={bookData.categories}
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
  );
};

export default AddBook;
