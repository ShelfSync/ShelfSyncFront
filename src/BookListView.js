import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';
import Layout from './Layout';

const BookListView = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  
  const defaultVisibleColumns = {
    title: true, author: true, altAuthor: true, publisher: true,
    year: true, pageCount: true, readedDate: true, addedDate: true,
    version: true, categories: true, description: true
  };
  
  const getStoredColumns = () => JSON.parse(localStorage.getItem('visibleColumns')) || defaultVisibleColumns;
  const [visibleColumns, setVisibleColumns] = useState(getStoredColumns);
  const [activeColumns, setActiveColumns] = useState(getStoredColumns);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5193/api/Books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setBooks(response.data.data))
      .catch(error => console.error("Error fetching books", error));
  }, []);

  const handleBookClick = (book) => setSelectedBook(book);
  const closeDetails = () => setSelectedBook(null);

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => {
      const updatedColumns = { ...prev, [column]: !prev[column] };
      localStorage.setItem('visibleColumns', JSON.stringify(updatedColumns));
      return updatedColumns;
    });
    setActiveColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleCategoryChange = (event) => setSearchCategory(event.target.value);

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    return book[searchCategory]?.toLowerCase().includes(term);
  });

  const columns = [
    'title', 'author', 'altAuthor', 'publisher', 'year', 
    'pageCount', 'readedDate', 'addedDate', 'version', 
    'categories', 'description'
  ];

  return (
    <Layout>
      <div className="book-table-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={searchCategory} onChange={handleCategoryChange}>
            <option value="title">Title</option>
            <option value="publisher">Publisher</option>
            <option value="author">Author</option>
          </select>
        </div>

        <div className="filter-buttons">
          {columns.map(column => (
            <button
              key={column}
              onClick={() => toggleColumn(column)}
              style={{
                backgroundColor: activeColumns[column] ? 'lightGreen' : 'initial',
                color: activeColumns[column] ? 'white' : 'black'
              }}
            >
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </button>
          ))}
        </div>

        <div className="book-table">
          <div className="book-table-header" style={{ fontWeight: 'bold' }}>
            {columns.map(column => (
              visibleColumns[column] && <div key={column} className="book-table-column">{column.charAt(0).toUpperCase() + column.slice(1)}</div>
            ))}
          </div>

          {filteredBooks.map((book) => (
            <div key={book.id} className="book-table-row" onClick={() => handleBookClick(book)}>
              {visibleColumns.title && <div className="book-table-column">{book.title}</div>}
              {visibleColumns.author && <div className="book-table-column">{book.author}</div>}
              {visibleColumns.altAuthor && <div className="book-table-column">{book.altAuthor}</div>}
              {visibleColumns.publisher && <div className="book-table-column">{book.publisher}</div>}
              {visibleColumns.year && <div className="book-table-column">{book.year}</div>}
              {visibleColumns.pageCount && <div className="book-table-column">{book.pageCount}</div>}
              {visibleColumns.readedDate && <div className="book-table-column">{book.readedDate}</div>}
              {visibleColumns.addedDate && <div className="book-table-column">{book.addedDate}</div>}
              {visibleColumns.version && <div className="book-table-column">{book.version}</div>}
              {visibleColumns.categories && (
                <div className="book-table-column categories-column">
                  {book.genres.map((genre) => (
                    <div key={genre.id} className="category">{genre.name}</div>
                  ))}
                </div>
              )}
              {visibleColumns.description && <div className="book-table-column">{book.description}</div>}
            </div>
          ))}
        </div>
        
        {selectedBook && <BookDetails book={selectedBook} closeDetails={closeDetails} />}
      </div>
    </Layout>
  );
};

export default BookListView;
