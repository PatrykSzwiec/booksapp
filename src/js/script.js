/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
    formInput: '.filters',
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
  };

  const filters = [];

  class BooksList {
    constructor(){
      const thisBookList = this;

      thisBookList.getElements();
      thisBookList.render(dataSource);
      thisBookList.initActions();
    }

    getElements(){
      const thisBookList = this;

      thisBookList.booksContainer = document.querySelector(select.booksList);
      thisBookList.booksForm = document.querySelector(select.formInput);

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
    initActions(){
      const thisBookList = this;
      const favoriteBooks = [];

      // Prevent the default behavior of single click on <a> tag
      thisBookList.booksContainer.addEventListener('click', function(event) {
        event.preventDefault();
      });

      // Adding books to favourite by double click
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

        //console.log(favoriteBooks);
      });

      thisBookList.booksForm.addEventListener('click', function(event){
        //event.preventDefault();

        const filter = event.target;
        // create const to know if checkbox is checked to return true/false
        const checked = filter.checked;

        if(filter.tagName === 'INPUT' && filter.type === 'checkbox' && filter.name == 'filter'){
          //console.log(filter.value);
          if(checked){
            filters.push(filter.value);
          } else {
            filters.pop(filter.value);
          }
        }
        //console.log(filters);
        thisBookList.filterBooks();
      });
    }

    filterBooks(){
      for(let book of dataSource.books){
        let shouldBeHidden = false;

        const selectedBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for(const filter of filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden == true){
          selectedBook.classList.add('hidden');
        } else {
          selectedBook.classList.remove('hidden');
        }
      }
    }


  }

  const app = new BooksList();
  console.log(app);
}