import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import BookFormField from '../BookFormField';

function BookForm({formData, validationErrors, isBookSelected, onSubmit, onChange}) {
  const formFields = [
    {
      'id': 'title',
      'type': 'text',
      'element_type': 'input',
      'required': true,
      'label': 'Title',
      'placeholder': 'Enter book title',
    },
    {
      'id': 'author',
      'type': 'text',
      'element_type': 'input',
      'required': true,
      'label': 'Author',
      'placeholder': 'Enter book author',
    },
    {
      'id': 'description',
      'type': 'text',
      'element_type': 'textarea',
      'required': true,
      'label': 'Description',
      'placeholder': 'Enter description for the book',
    },
  ];
  let buttonsDisabled = {};

  if (isBookSelected) {
    buttonsDisabled = {
      'save-new': false,
      'save': false,
      'delete': false,
    }
  }
  else {
    buttonsDisabled = {
      'save-new': false,
      'save': true,
      'delete': true,
    }
  }

  return (
    <Form className="book-form" onSubmit={onSubmit}>

      {formFields.map(field => (
        <BookFormField
          key={field.id}
          field={field}
          value={formData[field.id]}
          validationErrors={validationErrors}
          onChange={onChange}
        />
      ))}

      <div className="button-container">
        <Button
          id="save-new"
          type="submit"
          disabled={buttonsDisabled['save-new']}
        >Save New</Button>

        <Button
          id="save"
          type="submit"
          disabled={buttonsDisabled['save']}
        >Save</Button>

        <Button
          id="delete"
          type="submit"
          disabled={buttonsDisabled['delete']}
          formNoValidate
        >Delete</Button>
      </div>

    </Form>
  );
}

export default BookForm;
