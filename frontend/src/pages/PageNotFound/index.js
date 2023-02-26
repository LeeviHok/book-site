import { NavLink } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
        <h1>404 Page Not Found</h1>
        <NavLink to="/">Back to front page</NavLink>
    </div>
  );
}

export default PageNotFound;
