import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function BookFormField({field, value, validationErrors, onChange}) {
  return (
    <FloatingLabel label={field.label} className="mb-3">

      {/**
       * Bootstrap requires placeholder on each 'Form.Control' when used
       * with floating labels. But the placeholder value is not actually
       * visible on the 'Form.Control'. Placeholders have still sensible
       * values should this behaviour change.
       */}
      <Form.Control
        id={field.id}
        type={field.type}
        as={field.element_type}
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
        required={field.required}
        isInvalid={validationErrors[field.id] ? true : false}
      />

      <Form.Control.Feedback type="invalid">
        {validationErrors[field.id]}
      </Form.Control.Feedback>

    </FloatingLabel>
  );
}

export default BookFormField;
