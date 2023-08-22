/**
 * This Component renders a different available role for the user to sign in
 */
import React from 'react';
import {Col, Row, Card, Container, Button} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';
import {Routes} from '@/routes';

export default function Signin() {
  return (
    <main>
      <section className="d-flex align-items-center">
        <Container fluid>
          <Row>
            <Col xs={3} className="d-flex text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                style={{
                  top: '0',
                  left: '1440px',
                  width: '480px',
                  height: '980px',
                  background: `transparent url('img/Image 26.png') 0% 0% no-repeat padding-box`,
                  opacity: '1',
                  'background-color': 'rgba(0,0,0,0.4)',
                }}>
                <div
                  style={{
                    top: '148px',
                    left: '0px',
                    margin: '5rem 0',
                    background: '#F78F27 0% 0% no-repeat padding-box',
                    color: '#FFFFFF',
                    opacity: '0.51',
                  }}>
                  <span>
                    Providing access to life saving novel cancer therapies
                    through affordable financing schemes to patients.
                  </span>
                </div>
                <div
                  style={{
                    top: '389px',
                    left: '164px',
                    font: 'normal normal bold 36px/36px Montserrat',
                    'text-align': 'center',
                    color: '#FFFFFF',
                    'letter-spacing': '-0.72px',
                    opacity: '0.51',
                  }}>
                  <span>Patients</span>
                </div>
                <div
                  style={{
                    font: 'normal normal normal 24px/30px Montserrat',
                    'margin-bottom': '6rem',
                    'letter-spacing': '0.48px',
                    color: '#FFFFFF',
                    opacity: '1',
                  }}>
                  <span>Your journey to better outcomes starts here!</span>
                </div>
                <div>
                  <Button
                    variant="primary"
                    style={{
                      background: `#F78F27 0% 0% no-repeat padding-box`,
                      'border-radius': '33px',
                      border: 'none',
                      width: '200px',
                      opacity: '1',
                    }}>
                    Login
                  </Button>
                </div>
                <div>
                  <Button
                    variant="link"
                    style={{
                      font: `normal normal normal 14px/24px Montserrat`,
                      'letter-spacing': '0.28px',
                      color: '#FFFFFF',
                      opacity: '1',
                    }}>
                    New User?
                  </Button>
                  <Button
                    variant="link"
                    style={{
                      font: `normal normal normal 14px/24px Montserrat`,
                      'letter-spacing': '0.28px',
                      color: '#FFFFFF',
                      opacity: '1',
                    }}>
                    Forget Password?
                  </Button>
                </div>
              </Card.Link>
            </Col>
            <Col xs={3} className="d-flex">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                style={{
                  top: '0',
                  left: '1440px',
                  width: '480px',
                  height: '980px',
                  background: `transparent url('img/Image 26.png') 0% 0% no-repeat padding-box`,
                  opacity: '1',
                }}>
                <Button variant="primary">Login</Button>
              </Card.Link>
            </Col>
            <Col xs={3} className="d-flex">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                style={{
                  top: '0',
                  left: '1440px',
                  width: '480px',
                  height: '980px',
                  background: `transparent url('img/Image 26.png') 0% 0% no-repeat padding-box`,
                  opacity: '1',
                }}>
                <Button variant="primary">Login</Button>
              </Card.Link>
            </Col>
            <Col xs={3} className="d-flex">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                style={{
                  top: '0',
                  left: '1440px',
                  width: '480px',
                  height: '980px',
                  background: `transparent url('img/Image 26.png') 0% 0% no-repeat padding-box`,
                  opacity: '1',
                }}>
                <Button variant="primary">Login</Button>
              </Card.Link>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
