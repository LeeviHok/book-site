import BookForm from '../BookForm';
import BookList from '../BookList';
import BookListItem from '../BookListItem';
import useBookApi from './useBookApi';
import useBookManager from './useBookManager';
import useFormValidator from './useFormValidator';

function BookManager() {
  const {
    validationErrors,
    setValidationError,
    clearValidationError,
  } = useFormValidator();

  const {
    books,
    crudUtils,
  } = useBookApi(setValidationError);

  const {
    formData,
    selectedBook,
    handleBookSelect,
    handleFieldUpdate,
    handleSubmit,
  } = useBookManager(crudUtils, clearValidationError);

  const bookListItems = books.map(book => (
    <BookListItem
      key={book.id}
      book={book}
      active={selectedBook && (selectedBook.id === book.id)}
      onClick={() => handleBookSelect(book)}
    />
  ));

  return (
    <div className="book-manager">
      <BookForm
        formData={formData}
        validationErrors={validationErrors}
        isBookSelected={selectedBook ? true : false}
        onSubmit={handleSubmit}
        onChange={handleFieldUpdate}
      />
      <BookList>{bookListItems}</BookList>
    </div>
  );
}

export default BookManager;
