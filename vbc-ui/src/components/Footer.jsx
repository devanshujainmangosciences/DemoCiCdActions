/**
 * This module contains a footer component which is needed at almost all the pages.
 * this is pure components which render reponsive footer 
 * <Footer
    </Footer>
 */
import React from 'react';

import {useTranslation} from 'react-i18next';
import {Row, Col} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';

import {Routes} from '@/routes';
// import {validateURL} from '@/services/utility';

const Footer = function ({privacyPolicyLink, termsLink}) {
  const {t} = useTranslation(['footer']);
  const currentYear = new Date().getFullYear();
  // console.log('PRIVACY POLICY LINK=>', privacyPolicyLink);
  // console.log('TERMS LINK=>', termsLink);

  const renderLinks = () => {
    if (privacyPolicyLink && termsLink) {
      return (
        <>
          {' '}
          <Link
            to={{pathname: privacyPolicyLink}}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-normal">
            <span>{t('privacyPolicy')}</span>
          </Link>
          {/* <a
            href={privacyPolicyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-normal">
            <span>{t('privacyPolicy')}</span>
          </a> */}
          <span className="left-23">|</span>
          <Link
            to={{pathname: termsLink}}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-normal">
            <span className="left-23">{t('termsOfUse')}</span>
          </Link>
          {/* <a
            href={privacyPolicyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-normal">
            <span>{t('termsOfUse')}</span>
          </a> */}
        </>
      );
    } else {
      return (
        <>
          {' '}
          <Link
            to={Routes.PrivacyPolicy.path}
            className="text-decoration-none fw-normal">
            <span>{t('privacyPolicy')}</span>
          </Link>
          <span>|</span>
          <Link
            to={Routes.TermsOfUse.path}
            className="text-decoration-none fw-normal">
            <span>{t('termsOfUse')}</span>
          </Link>
        </>
      );
    }
  };
  return (
    <footer className="footer">
      <Row>
        <Col xs={12} lg={5} className="mb-lg-0">
          <div className="mb-0 text-center text-md-left">
            <div className="text-decoration-none fw-normal">
              {renderLinks()}
            </div>
          </div>
        </Col>
        <Col xs={12} lg={5} className="mb-lg-0 ">
          <p className="mb-0 text-center text-md-left bg-white">
            <Col
              // href={validateURL('https://themesberg.com')}
              // target="_blank"
              className="text-decoration-none fw-normal">
              <span className="left-18">
                {t('copyright')} © {`${currentYear} `} {t('mangoCancerCare')}
              </span>
            </Col>
          </p>
        </Col>
      </Row>
    </footer>
  );
};
Footer.propTypes = {};
export default Footer;
