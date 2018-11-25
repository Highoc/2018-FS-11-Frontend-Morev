import React from 'react';
import {
  Col, Container, Row, Footer as MDBFooter,
} from 'mdbreact';


export default function Footer(props) {
  return (
    <MDBFooter color="blue" className="font-small pt-4">
      <Container className="text-center text-md-left">
        <Row>
          <Col md="6">
            <h5 className="title">Контент футерa</h5>
            <p>
              Nullam at urna ac ante rutrum sodales nec a risus. Sed eg
              et magna a magna vehicula vulputate sit amet eu massa. Cu
              rabitur facilisis arcu efficitur semper aliquet. Prent su
              scipit nunc eros. Nullam nisi ex, aliquet et eros in, acc
              umsan sodales dolor.
            </p>
          </Col>
          <Col md="6">
            <h5 className="title">Ссылки</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/">Ссылка 1</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Ссылка 2</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Ссылка 3</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container>
          &copy; 2018 Copyleft:
          <a href="https://github.com/Highoc/2018-FS-21-Frontend-Morev"> highoc.github.com </a>
        </Container>
      </div>
    </MDBFooter>
  );
}
