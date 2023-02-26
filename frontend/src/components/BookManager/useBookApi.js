import { useEffect, useState } from 'react';

function useBookApi(setValidationError) {
  const [books, setBooks] = useState([]);
  const API_URL = 'http://localhost:8000/api';

  // Fetch books on first component render
  useEffect(() => {
    refreshBooks();
  // eslint-disable-next-line
  }, []);

  async function sendRequest(uri, options) {
    try {
      const response = await fetch(uri, options);
      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');
      const data = isJson ? await response.json() : null;

      // HTTP error occured (4xx - 5xx)
      if (!response.ok) {
        // Check for 5xx errors
        if (500 <= response.status <= 599) {
          // Handle the error
        }
        // Response has error details about form field(s)
        if (isJson && Array.isArray(data.detail)) {
          data.detail.forEach(errorDetail => {
            const field = errorDetail.loc[1];
            const msg = errorDetail.msg;
            setValidationError(field, msg);
          })
        }
        // Response has error detail which is not specific to any field
        else if (isJson) {
          // Handle the error
        }
        return {'status': 'http-error'};
      }

      // Successful response
      return {'status': 'ok', 'data': data};
    }
    // Network error occured
    catch (e) {
      if (e instanceof TypeError) {
        return {'status': 'network-error'};
      }
      else {
        throw e;
      }
    }
  }

  // Update books, but skip update if any errors are encountered
  function refreshBooks() {
    sendRequest(`${API_URL}/books`).then(response => {
      if(response.status === 'ok') {
        setBooks(response.data);
      }
    });
  }

  function createBook(book) {
    sendRequest(`${API_URL}/books`, {
      'method': 'POST',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify(book),
    }).then(() => refreshBooks());
  }

  function updateBook(book) {
    sendRequest(`${API_URL}/books/${book.id}`, {
      'method': 'PUT',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify(book),
    }).then(() => refreshBooks());
  }

  function deleteBook(book_id) {
    sendRequest(`${API_URL}/books/${book_id}`, {
      'method': 'DELETE',
    }).then(() => refreshBooks());
  }

  return ({
    books,
    createBook,
    updateBook,
    deleteBook,
  });
}

export default useBookApi;
