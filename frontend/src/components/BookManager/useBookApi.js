import { useEffect, useState } from 'react';

import {
  fetchData, isClientError, getFieldErrors, getGenericError
} from './fetchHelper.js';

function useBookApi(setValidationError) {
  const [books, setBooks] = useState([]);
  const API_URL = 'http://localhost:8080/api';
  let createCb = () => {};
  let updateCb = () => {};
  let deleteCb = () => {};

  // Fetch books on first component render
  useEffect(() => {
    refreshBooks();
  // eslint-disable-next-line
  }, []);

  // Fetch data and add possible server-side validation errors to the form
  async function fetchWithValidation(uri, options) {
    try {
      return await fetchData(uri, options);
    }
    catch (e) {
      // Request was faulty from client side
      if (isClientError(e)) {
        const fieldErrors = getFieldErrors(e);
        const genericError = getGenericError(e);

        // Add field validation errors if those exists
        if (fieldErrors.length !== 0) {
          fieldErrors.forEach(({field, msg}) => {
            setValidationError(field, msg);
          })
        }

        // Handle generic validation error which is not field-specific
        if (genericError) {
          // Handle the error
        }
      }

      // Rethrow the error further down the chain
      throw e;
    }
  }

  function refreshBooks() {
    fetchWithValidation(`${API_URL}/books`)
      .then(data => {setBooks(data)})
      .catch(e => {
        if (!isClientError(e)) {throw e}
      });
  }

  function createBook(book) {
    fetchWithValidation(`${API_URL}/books`, {
      'method': 'POST',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify(book),
    })
      .then(data => {
        refreshBooks();
        createCb(data);
      })
      .catch(e => {
        if (!isClientError(e)) {throw e}
      });
  }

  function updateBook(book) {
    fetchWithValidation(`${API_URL}/books/${book.id}`, {
      'method': 'PUT',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify(book),
    })
      .then(data => {
        refreshBooks();
        updateCb(data);
      })
      .catch(e => {
        if (!isClientError(e)) {throw e}
      });
  }

  function deleteBook(book_id) {
    fetchWithValidation(`${API_URL}/books/${book_id}`, {
      'method': 'DELETE',
    })
      .then(() => {
        refreshBooks();
        deleteCb(book_id);
      })
      .catch(e => {
        if (!isClientError(e)) {throw e}
      });
  }

  function setCreateCb(callback) {
    createCb = callback;
  }

  function setUpdateCb(callback) {
    updateCb = callback;
  }

  function setDeleteCb(callback) {
    deleteCb = callback;
  }

  const crudUtils = {
    createBook,
    updateBook,
    deleteBook,
    setCreateCb,
    setUpdateCb,
    setDeleteCb,
  }

  return ({
    books,
    crudUtils,
  });
}

export default useBookApi;
