import { useState } from "react";

function useFormValidator() {
  const [validationErrors, setValidationErrors] = useState({
    'title': undefined,
    'author': undefined,
    'description': undefined,
  });

  function setValidationError(field, error) {
    setValidationErrors(prevState => ({
      ...prevState,
      [field]: error,
    }))
  }

  function clearValidationError(formField) {
    setValidationErrors(prevState => ({
      ...prevState,
      [formField]: undefined,
    }))
  }

  return ({
    validationErrors,
    setValidationError,
    clearValidationError,
  });
}

export default useFormValidator;
