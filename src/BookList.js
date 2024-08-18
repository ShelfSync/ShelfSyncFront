import React, { useState } from 'react';
import BookDetails from './BookDetails';
import './BookStyles.css';

const BookList = () => {
  const books = [
    
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din",  ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din", "Thales Amca", "Kategori" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din", "Thales Amca", "Kategori" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
    {
      id: 2,
      title: "Thales'in maceraları",
      readDate: "2021-09-01",
      addedDate: "2021-09-01",
      cover: '2',
      description: 'Thales bir gün dağa çıkmış',
      author: "Arda Sönmez",
      altAuthor: "Cengiz Çevik",
      publisher: "Penguin",
      version: "1",
      year: "2021",
      page: "300",
      categories: ["Felsefe", "Bilim", "Din" ]


    },
   // Diğer kitaplar eklenebilir
  ];

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
