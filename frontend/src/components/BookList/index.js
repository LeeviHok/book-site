import ListGroup from "react-bootstrap/ListGroup";

function BookList({children}) {
  if (!children.length) {
    return (<h1>No books</h1>);
  }
  else {
    return (
      <ListGroup className="book-list">
        {children}
      </ListGroup>
    );
  }
}

export default BookList;
