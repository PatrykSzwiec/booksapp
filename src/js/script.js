/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBookList = this;

      thisBookList.getElements();
      thisBookList.render(dataSource);
      thisBookList.favouritefilter();
    }

    getElements(){
      const thisBookList = this;

      thisBookList.booksContainer = document.querySelector(select.booksList);

    }

    render(dataSource){
    /* FUNCTION TO RENDER BOOKS AT PAGE */
      const thisBookList = this;

      dataSource.books.forEach(bookData => {

        // Generate HTML based on HandleBars Template
        const generatedHTML = templates.books(bookData);

        // Create bookElement using utils.createElementFromHTML
        const bookElement = utils.createDOMFromHTML(generatedHTML);

        // Adding element to list .books-list
        thisBookList.booksContainer.appendChild(bookElement);

      });
    }
    /* Function to add books to favourite */
    favouritefilter(){
      const thisBookList = this;
      const favoriteBooks = [];

      thisBookList.booksContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        // return parent element of the element that triggered the event.target and get it data-id attribute
        const bookId = event.target.offsetParent.getAttribute('data-id');


        if (!favoriteBooks.includes(bookId)){
          // add parent element class favorite
          event.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          // remove parent element class favorite
          event.target.offsetParent.classList.remove('favorite');
          favoriteBooks.pop(bookId);
        }

        console.log(favoriteBooks);
      });
    }

  }

  const app = new BooksList();
  console.log(app);
}