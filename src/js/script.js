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

  function renderBooks(dataSource){
    const booksList = document.querySelector(select.booksList);

    dataSource.books.forEach(bookData => {

      // Generate HTML based on HandleBars Template
      const generatedHTML = templates.books(bookData);

      // Create bookElement using utils.createElementFromHTML
      const bookElement = utils.createDOMFromHTML(generatedHTML);

      // Adding element to list .books-list
      booksList.appendChild(bookElement);


    });
  }
  renderBooks(dataSource);
}