/**
 * This Component renders a the layout for other register components like SignUp,CreatePassword,Otp,ForgotPassword
 * This is a HOC component and revieves the children, it accepts the children component and returns a different component
 */
import React from 'react';
import {Image} from '@themesberg/react-bootstrap';
import {MangoCancerCareSVG} from '../../assets/images';

import {Footer} from '@/components';
import Header from './Header';
import {
  LowCostEMI,
  PBPLogo,
  PersonalizedSupportLogo,
  TatgatedImmunoTherapy,
} from '../../assets/icons';
import {useTranslation} from 'react-i18next';

const RegistrationBox = function ({children}) {
  const {t} = useTranslation(['registrationProfile']);
  return (
    <>
      <main className="login-main-registration">
        <div className="logo-container justify-content-between">
          <Image src={MangoCancerCareSVG} className="mango-logo" />
        </div>
        <div className="main-box d-flex">
          <div className="reg-info col-7">
            <div className="reg-info-item">
              <div className="pbp ">
                <div className="line small-line-top"></div>
                <div className="line big-line-top"></div>
                <div className="pbp-text">
                  <span className="ms-2">
                    <PBPLogo />
                  </span>
                  <span className="ms-3">{t('pbp')}</span>
                </div>
                <div className="line small-line-bottom"></div>
                <div className="line big-line-bottom"></div>
              </div>
              <div className="blue-text-17">{t('cancerBeatable')}</div>
              <div className="blue-text-17">{t('cancerHelp')}</div>
            </div>
            <div className="reg-info-item">
              <div className="targeted-immuno">
                <div>
                  <TatgatedImmunoTherapy />
                </div>
                <div>
                  <div className="black-text-17">
                    {t('getUpTo')} <span className="percent-text">90%</span>{' '}
                    {t('cashback')}
                  </div>
                  <div className="black-text-17">
                    {t('immuno')}
                    <span className="patienttextcolor">*</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="reg-info-item">
              <div className="support-low-cost-emi">
                <div className="support">
                  <div>
                    <PersonalizedSupportLogo />
                  </div>
                  <div className="black-text-17">{t('support')}</div>
                </div>
                <div className="low-cost-emi">
                  <div className="emi-box">
                    <div>
                      <LowCostEMI />
                    </div>
                    <div>
                      <div className="blue-text-18">{t('lowcostemi')}</div>
                      <div className="blue-text-18">{t('plans')}</div>
                    </div>
                  </div>
                  <div className="black-text-17">{t('services')}</div>
                </div>
              </div>
            </div>
            <div className="reg-info-item">
              <div className="contact-details">
                <div className="number">{t('number')}</div>
                <div className="vertical-line"></div>
                <div className="email">{t('email')}</div>
              </div>
            </div>
          </div>

          <div className="col reg-box-container">
            <div>
              <Header />
              <div className="reg-container">
                <div className="m-auto reg-box-inner-screens">{children}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="registration-pages-footer">
          <Footer
            privacyPolicyLink={import.meta.env.VITE_VBC_PRIVACY_POLICY}
            termsLink={import.meta.env.VITE_VBC_TERMS}
          />
        </div>
      </main>
    </>
  );
};

export default RegistrationBox;
