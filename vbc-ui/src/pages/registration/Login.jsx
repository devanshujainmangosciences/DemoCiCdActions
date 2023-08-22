/**
 * This Component renders a Form for the user to login
 */
import {Image} from '@themesberg/react-bootstrap';
import React from 'react';
import {MangoCancerCareSVG} from '../../assets/images';
import Footer from '../../components/Footer';

export default function Login() {
  return (
    <main className="login-main">
      <div className="logo-container">
        <Image
          src={MangoCancerCareSVG}
          className="mango-logo d-none d-sm-block"
        />
      </div>
      <Footer />
    </main>
  );
}
