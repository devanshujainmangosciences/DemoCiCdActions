/**
 * This Component renders the Not Found message
 * When the user try to access the route which is not present
 * user will be redirected to this page
 */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';
import {Routes} from '@/routes';
import {MangoCancerCareSVG} from '../../assets/images';

export default function NotFound() {
  const {t} = useTranslation(['notFound']);
  const history = useNavigate();
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col
              xs={12}
              className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link} to={Routes.Signup.path}>
                  <Image src={MangoCancerCareSVG} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="text-primary mt-5">
                  {t('pageNot')} <span className="fw-bolder">{t('found')}</span>
                </h1>
                <p className="lead my-4">{t('oopsMessage')}</p>
                <Button
                  // as={Link}
                  variant="primary"
                  className="animate-hover"
                  // to={Routes.LandingPage.path}
                  onClick={() => history(-1)}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="animate-left-3 me-3 ms-2"
                  />
                  {t('goBackHome')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
