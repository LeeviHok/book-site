import ListGroup from 'react-bootstrap/ListGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';

function BookListItem({book, active, onClick}) {
  return (
    <ListGroup.Item action onClick={onClick} className={"book" + (active ? ' active' : '')}>

      <FontAwesomeIcon icon={faBook} size="3x" className="book-icon" />
      <div className="data-container">
        <span className="book-title">{book.title}</span>
        <span className="book-author">
          <FontAwesomeIcon icon={faUser} size="sm" className="author-icon" />
          {book.author}
        </span>
      </div>

    </ListGroup.Item>
  );
}

export default BookListItem;
