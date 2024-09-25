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

  // Sıralama durumu
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

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

  // Filtreleme
  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    return book[searchCategory]?.toLowerCase().includes(term);
  });

  // Sıralama
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const columns = [
    'title', 'author', 'altAuthor', 'publisher', 'year', 
    'pageCount', 'readedDate', 'addedDate', 'version', 
    'categories', 'description'
  ];

  // Tıklama işlevi
  const handleHeaderClick = (column) => {
    if (sortField === column) {
      // Sıralama yönünü değiştir
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(column);
      setSortDirection('asc'); 
    }
  };

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
            <option value="description">Description</option>
          </select>
        </div>

        <div>
          <h3>{sortedBooks.length} results</h3>
        </div>

        <div className="filter-buttons">
          {columns.map(column => (
            <button
              key={column}
              onClick={() => toggleColumn(column)}
              style={{
                backgroundColor: activeColumns[column] ? 'grey' : 'initial',
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
              visibleColumns[column] && (
                <div 
                  key={column} 
                  className="book-table-column" 
                  onClick={() => handleHeaderClick(column)} // Tıklama işlevi ekleyin
                  style={{ cursor: 'pointer' }} // İmleçin tıklanabilir olduğunu göstermek için
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </div>
              )
            ))}
          </div>

          {sortedBooks.map((book) => (
            <div key={book.id} className="book-table-row" onClick={() => handleBookClick(book)}>
              {visibleColumns.title && <div className="book-table-column">{book.title}</div>}
              {visibleColumns.author && <div className="book-table-column">{book.author}</div>}
              {visibleColumns.altAuthor && <div className="book-table-column">{book.altAuthor}</div>}
              {visibleColumns.publisher && <div className="book-table-column">{book.publisher}</div>}
              {visibleColumns.year && <div className="book-table-column">{book.year}</div>}
              {visibleColumns.pageCount && <div className="book-table-column">{book.page}</div>}
              {visibleColumns.readedDate && <div className="book-table-column">{book.readedDate}</div>}
              {visibleColumns.addedDate && <div className="book-table-column">{book.addedData}</div>}
              {visibleColumns.version && <div className="book-table-column">{book.version}</div>}
              {visibleColumns.categories && (
                <div className="book-table-column categories-column">
                  {book.genres.map((genre) => (
                    <div key={genre.id} className="category-item">{genre.name}</div>
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
