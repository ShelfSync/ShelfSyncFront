import React, { useState } from 'react';
import BookDetails from './BookDetails';
import Layout from './Layout';

const BookListView = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    author: true,
    altAuthor: true,
    publisher: true,
    year: true,
    page: true,
    readDate: true,
    addedDate: true,
    version: true,
    categories: true,
    description: true
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeDetails = () => {
    setSelectedBook(null);
  };

  const toggleColumn = (column) => {
    setVisibleColumns(prevState => ({
      ...prevState,
      [column]: !prevState[column]
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    if (searchCategory === 'title') {
      return book.title.toLowerCase().includes(term);
    } else if (searchCategory === 'year') {
      return book.year.toLowerCase().includes(term);
    } else if (searchCategory === 'category') {
      return book.categories.some((category) => category.toLowerCase().includes(term));
    } else if (searchCategory === 'publisher') {
      return book.publisher.toLowerCase().includes(term);
    } else if (searchCategory === 'author') {
        return book.author.toLowerCase().includes(term);
    }
    return true;
  });

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
        <select className='search-options' value={searchCategory} onChange={handleCategoryChange}>
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="category">Category</option>
            <option value="publisher">Publisher</option>
            <option value="author">Author</option>
        </select>
      </div>

      <div className="filter-buttons">
        <button onClick={() => toggleColumn('title')}>Title</button>
        <button onClick={() => toggleColumn('author')}>Author</button>
        <button onClick={() => toggleColumn('altAuthor')}>Alt Author</button>
        <button onClick={() => toggleColumn('publisher')}>Publisher</button>
        <button onClick={() => toggleColumn('year')}>Year</button>
        <button onClick={() => toggleColumn('page')}>Page Count</button>
        <button onClick={() => toggleColumn('readDate')}>Read Date</button>
        <button onClick={() => toggleColumn('addedDate')}>Added Date</button>
        <button onClick={() => toggleColumn('version')}>Version</button>
        <button onClick={() => toggleColumn('categories')}>Categories</button>
        <button onClick={() => toggleColumn('description')}>Description</button>
      </div>

      <div className="book-table">
        <div className="book-table-header" style={{ fontWeight: 'bold' }}>
          {visibleColumns.title && <div className="book-table-column">Title</div>}
          {visibleColumns.author && <div className="book-table-column">Author</div>}
          {visibleColumns.altAuthor && <div className="book-table-column">Alt Author</div>}
          {visibleColumns.publisher && <div className="book-table-column">Publisher</div>}
          {visibleColumns.year && <div className="book-table-column">Year</div>}
          {visibleColumns.page && <div className="book-table-column">Page Count</div>}
          {visibleColumns.readDate && <div className="book-table-column">Read Date</div>}
          {visibleColumns.addedDate && <div className="book-table-column">Added Date</div>}
          {visibleColumns.version && <div className="book-table-column">Version</div>}
          {visibleColumns.categories && <div className="book-table-column">Categories</div>}
          {visibleColumns.description && <div className="book-table-column">Description</div>}
        </div>

        {filteredBooks.map((book) => (
          <div key={book.id} className="book-table-row" onClick={() => handleBookClick(book)}>
            {visibleColumns.title && <div className="book-table-column">{book.title}</div>}
            {visibleColumns.author && <div className="book-table-column">{book.author}</div>}
            {visibleColumns.altAuthor && <div className="book-table-column">{book.altAuthor}</div>}
            {visibleColumns.publisher && <div className="book-table-column">{book.publisher}</div>}
            {visibleColumns.year && <div className="book-table-column">{book.year}</div>}
            {visibleColumns.page && <div className="book-table-column">{book.page}</div>}
            {visibleColumns.readDate && <div className="book-table-column">{book.readDate}</div>}
            {visibleColumns.addedDate && <div className="book-table-column">{book.addedDate}</div>}
            {visibleColumns.version && <div className="book-table-column">{book.version}</div>}
            {visibleColumns.categories && (
              <div className="book-table-column categories-column">
                {book.categories.map((category, index) => (
                  <div key={index} className="book-category-item">{category}</div>
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
