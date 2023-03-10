import { useState } from 'react';

function useBookManager(crudUtils, clearValidationError) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    'title': '',
    'author': '',
    'description': '',
  });

  const {
    createBook,
    updateBook,
    deleteBook,
    setCreateCb,
    setUpdateCb,
    setDeleteCb,
  } = crudUtils;

  function createCb(book) {
    setSelectedBook(book);
    updateFormData(book);
  }

  function deleteCb(book_id) {
    setSelectedBook(null);
    updateFormData({
      'title': '',
      'author': '',
      'description': '',
    });
  }

  setCreateCb(createCb);
  setDeleteCb(deleteCb);

  // Perform all 'formData' state updates through this function. It ensures
  // that validation errors are cleared for all modified form fields.
  function updateFormData(newData) {
    // Clear possible validation errors from all modified fields
    Object.keys(newData).forEach(field => {
      if (formData[field] !== newData[field]) {
        clearValidationError(field);
      }
    });
    // Update provided fields
    setFormData(prevState => ({
      ...prevState,
      ...newData,
    }));
  }

  function handleFieldUpdate(e) {
    const {id, value} = e.target;
    updateFormData({[id]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const submitAction = e.nativeEvent.submitter.id;

    if (submitAction === 'save-new') {
      createBook(formData);
    }
    else if (submitAction === 'save') {
      updateBook(formData);
    }
    else if (submitAction === 'delete') {
      deleteBook(formData.id);
    }
  }

  function handleBookSelect(book) {
    setSelectedBook(book);
    updateFormData(book);
  }

  return ({
    formData,
    selectedBook,
    handleBookSelect,
    handleFieldUpdate,
    handleSubmit,
  });
}

export default useBookManager;
