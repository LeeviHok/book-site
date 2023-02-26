import { Outlet } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function MainLayout() {
  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default MainLayout;
