import { useEffect, useState } from 'react';

import {
  fetchData, isClientError, getFieldErrors, getGenericError
} from './fetchHelper.js';

function useBookApi(setValidationError) {
  const [books, setBooks] = useState([]);
  const API_URL = 'http://localhost:8080/api';

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
    }).then(() => refreshBooks())
      .catch(e => {
        if (!isClientError(e)) {throw e}
      });
  }

  function updateBook(book) {
    fetchWithValidation(`${API_URL}/books/${book.id}`, {
      'method': 'PUT',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify(book),
    }).then(() => refreshBooks())
    .catch(e => {
      if (!isClientError(e)) {throw e}
    });
  }

  function deleteBook(book_id) {
    fetchWithValidation(`${API_URL}/books/${book_id}`, {
      'method': 'DELETE',
    }).then(() => refreshBooks())
    .catch(e => {
      if (!isClientError(e)) {throw e}
    });
  }

  return ({
    books,
    createBook,
    updateBook,
    deleteBook,
  });
}

export default useBookApi;
