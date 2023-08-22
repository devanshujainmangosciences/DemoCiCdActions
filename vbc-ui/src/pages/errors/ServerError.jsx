/**
 * This Component renders the Server Error message
 * When there is a server error
 * user will be redirected to this page
 */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {Col, Row, Image, Button, Container} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {MangoCancerCareSVG} from '../../assets/images';

export default function ServerError() {
  const {t} = useTranslation(['serverError']);
  const history = useNavigate();
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="align-items-center">
            <Col
              xs={12}
              lg={5}
              className="order-2 order-lg-1 text-center text-lg-left">
              <h1 className="text-primary mt-5">
                {t('somethingHasGone')}{' '}
                <span className="fw-bolder">{t('seriously')}</span> {t('wrong')}
              </h1>
              <p className="lead my-4">{t('oopsMessage')}</p>
              <Button
                // as={Link}
                variant="primary"
                className="animate-hover"
                onClick={() => history(-1)}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="animate-left-3 me-3 ms-2"
                />
                {t('goBackHome')}
              </Button>
            </Col>
            <Col
              xs={12}
              lg={7}
              className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
              <Image src={MangoCancerCareSVG} className="img-fluid w-75" />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
