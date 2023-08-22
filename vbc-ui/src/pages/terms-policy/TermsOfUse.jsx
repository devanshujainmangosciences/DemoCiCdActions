/**
 * This Component loads Terms of Use Static data
 * removeIcon param is used to remove the icon when its being displayed in Modal
 */
import {TermsOfConditionIcon} from '@/assets/icons';
import {ScrollToTop, TitleContainer} from '@/components';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const TermsOfUse = ({removeIcon}) => {
  const {t} = useTranslation(['termsofuse']);
  /**
   * Scroll on Top
   */
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <div className="terms-of-condition">
        {!removeIcon ? (
          <>
            <ScrollToTop />
            <TitleContainer
              icon={<TermsOfConditionIcon fill="#fff" />}
              title={t('termsOfUse')}
            />
          </>
        ) : (
          <div className="terms-title d-flex justify-content-center text-uppercase white-space-nowrap">
            <div>
              <u>{t('termsOfUse')}</u>
            </div>
          </div>
        )}

        <div className={`${!removeIcon && 'terms-wrapper-class'} `}>
          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <div className={`${!removeIcon ? 'pb-3 pt-3' : 'pb-3'} `}>
              {t('para-1-start')}
              (the “<strong>{t('terms')}</strong>”)
              {t('para-1-middle-1')}
              (“<strong>{t('you')}</strong>” or “<strong>{t('your')}</strong>”
              or “<strong>{t('yourself')}</strong>” or “
              <strong>{t('user')}</strong>
              ”)
              {t('para-1-middle-2')}“<strong>{t('platform')}</strong>”
              {t('para-1-middle-3')}
              (“<strong>{t('mango-sciences')}</strong>”),
              {t('para-1-contd')}
              (the “<strong>{t('mango-cancer-care')}</strong>”).
            </div>
            <div className="pb-3">{t('para-2')}</div>
            <div className="pb-3">{t('para-3')}</div>
            <div className="pb-3">{t('para-4')}</div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">1</span>
              <u>{t('services-title')}</u>
            </h5>
            <div>
              <div className="d-flex">
                <span className="number">1.1</span>
                <span>
                  <div className="pb-3">{t('services-sub-head')}</div>
                  <div className="pb-3 d-flex">
                    <span className="number">(i)</span>
                    <span>
                      {t('services-sub-1-start')}
                      (“<strong>{t('partnered-institutions')}</strong>”)
                      {t('services-sub-1-contd')}
                    </span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(ii)</span>
                    <span>{t('services-sub-2')}</span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(iii)</span>
                    <span>{t('services-sub-3')}</span>
                  </div>
                  <div className="pb-3 ">
                    {t('services-sub-data-start')}“
                    <strong>{t('services')}</strong>
                    ”.
                    {t('services-sub-data-contd')}
                  </div>
                </span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">2</span>
              <u> {t('eligibility-title')}</u>
            </h5>
            <div className="pb-3">
              <div className="d-flex">
                <span className="number">2.1</span>
                <span>{t('eligibility-sub')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">3</span>
              <u> {t('user-account-title')}</u>
            </h5>
            <div>
              <div className="mb-3 d-flex">
                <span className="number">3.1</span>
                <span>
                  {t('user-account-sub-1-start')}
                  (“<strong>{t('patient')}</strong>”)
                  {t('user-account-sub-1-middle-1')}
                  (“<strong>{t('patient-caregiver')}</strong>”)
                  {t('user-account-sub-1-middle-2')}
                  (“<strong>{t('account')}</strong>”).
                  {t('user-account-sub-1-contd')}
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.2</span>
                <span>{t('user-account-sub-2')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.3</span>
                <span>{t('user-account-sub-3')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.4</span>
                <span>{t('user-account-sub-4')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.5</span>
                <span>{t('user-account-sub-5')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.6</span>
                <span>{t('user-account-sub-6')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.7</span>
                <span>{t('user-account-sub-7')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.8</span>
                <span>{t('user-account-sub-8')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.9</span>
                <span>{t('user-account-sub-9')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">3.10</span>
                <span>{t('user-account-sub-10')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">4</span>
              <u> {t('use-of-service-title')}</u>
            </h5>
            <div className="pb-3">
              <div className="pb-3 d-flex">
                <span className="number">4.1</span>
                <span>{t('use-of-service-sub-1')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">4.2</span>
                <span>{t('use-of-service-sub-2')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">4.3</span>
                <span>{t('use-of-service-sub-3')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">4.4</span>
                <span>{t('use-of-service-sub-4')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">4.5</span>
                <span>{t('use-of-service-sub-5')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">4.6</span>
                <span>{t('use-of-service-sub-6')}</span>
              </div>
              <div className=" d-flex">
                <span className="number">4.7</span>
                <span>{t('use-of-service-sub-7')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">5</span>
              <u> {t('use-of-platform-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">5.1</span>
                <span>{t('use-of-platform-sub-1')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">5.2</span>
                <span>{t('use-of-platform-sub-2')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">5.3</span>
                <span>
                  <span>{t('use-of-platform-sub-3')}</span>
                  <div className="p-1 d-flex ">
                    <span className="number">(i)</span>
                    <span>{t('use-of-platform-sub-3-1')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(ii)</span>
                    <span>{t('use-of-platform-sub-3-2')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(iii)</span>
                    <span>{t('use-of-platform-sub-3-3')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(iv)</span>
                    <span>{t('use-of-platform-sub-3-4')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(v)</span>
                    <span>{t('use-of-platform-sub-3-5')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(vi)</span>
                    <span className="number">
                      {t('use-of-platform-sub-3-6')}
                    </span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(vii)</span>
                    <span>{t('use-of-platform-sub-3-7')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(viii)</span>
                    <span>{t('use-of-platform-sub-3-8')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(ix)</span>
                    <span>{t('use-of-platform-sub-3-9')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(x)</span>
                    <span>{t('use-of-platform-sub-3-10')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(xi)</span>
                    <span>{t('use-of-platform-sub-3-11')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(xii)</span>
                    <span>{t('use-of-platform-sub-3-12')}</span>
                  </div>
                  <div className="p-1 d-flex ">
                    <span className="number">(xiii)</span>
                    <span>{t('use-of-platform-sub-3-13')}</span>
                  </div>
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">5.4</span>
                <span>{t('use-of-platform-sub-4')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">6</span>
              <u> {t('intellectual-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">6.1</span>
                <span>
                  {t('intellectual-sub-1-start')}“
                  <strong>{t('content')}</strong>”
                  {t('intellectual-sub-1-contd')}
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">6.2</span>
                <span>
                  {t('intellectual-sub-2-start')}
                  (“<strong>{t('marks')}</strong>”)
                  {t('intellectual-sub-2-contd')}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">7</span>

              <u> {t('disclaimer-title')}</u>
            </h5>
            <div>
              <div className="d-flex">
                <span className="number">7.1</span>
                <span>
                  <div className="pb-3">{t('disclaimer-sub-1')}</div>
                  <span>
                    <div className="pb-3 d-flex">
                      <span className="number">(i)</span>
                      <span>{t('disclaimer-sub-1-1')}</span>
                    </div>
                    <div className="pb-3 d-flex">
                      <span className="number">(ii)</span>
                      <span>{t('disclaimer-sub-1-2')}</span>
                    </div>
                    <div className="pb-3 d-flex">
                      <span className="number">(iii)</span>
                      <span>{t('disclaimer-sub-1-3')}</span>
                    </div>
                    <div className="pb-3 d-flex">
                      <span className="number">(iv)</span>
                      <span>{t('disclaimer-sub-1-4')}</span>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">8</span>
              <u> {t('limitation-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">8.1</span>
                <span>
                  {t('limitation-sub-1-start')}
                  (“<strong>{t('indemnitees')}</strong>”)
                  {t('limitation-sub-1-contd')}
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">8.2</span>
                <span>{t('limitation-sub-2')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">8.3</span>
                <span>{t('limitation-sub-3')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">9</span>
              <u> {t('violation-title')}</u>
            </h5>
            <div className="pb-3 d-flex">
              <span className="number">9.1</span>
              <span>{t('violation-sub-1')}</span>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">10</span>
              <u> {t('suspension-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">10.1</span>
                <span>{t('suspension-sub-1')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">10.2</span>
                <span>{t('suspension-sub-2')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">11</span>
              <u>{t('juri-title')}</u>
            </h5>
            <div className="pb-3 d-flex">
              <span className="number">11.1</span>
              <span>{t('juri-sub-1')}</span>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">12</span>
              <u> {t('grievance-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">12.1</span>
                <span>
                  <span>
                    <strong>{t('grievance-sub-1-title')}</strong>
                  </span>
                  <span>{t('grievance-sub-1-data')}</span>
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">12.2</span>
                <span>{t('grievance-sub-2')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">13</span>
              <u> {t('communication-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">13.1</span>
                <span>{t('communication-sub-1')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">13.2</span>
                <span>{t('communication-sub-2')}</span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">14</span>
              <u> {t('general-title')}</u>
            </h5>
            <div>
              <div className="pb-3 d-flex">
                <span className="number">14.1</span>
                <span>
                  <span>
                    <strong>{t('general-sub-1-title')}</strong>
                  </span>
                  <span>{t('general-sub-1-data')}</span>
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">14.2</span>
                <span>
                  <span>
                    <strong>{t('general-sub-2-title')}</strong>
                  </span>
                  <span>{t('general-sub-2-data')}</span>
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">14.3</span>
                <span>
                  <span>
                    <strong>{t('general-sub-3-title')}</strong>
                  </span>
                  <span>{t('general-sub-3-data')}</span>
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">14.4</span>
                <span>
                  <span>
                    <strong>{t('general-sub-4-title')}</strong>
                  </span>
                  <span>{t('general-sub-4-data')}</span>
                </span>
              </div>
            </div>
          </div>

          <div
            className={`w-100 h-100 ${
              !removeIcon && 'item mb-3'
            } justify-content-start align-items-center`}>
            <h5 className="pb-3 pt-3 text-left">
              <span className="number">15</span>
              <u> {t('ip-title')}</u>
            </h5>
            <div>
              <div className="d-flex">
                <span className="number">15.1</span>
                <span>
                  <div className="pb-3">{t('ip-sub-1')}</div>
                  <div className="pb-3 d-flex">
                    <span className="number">(i)</span>
                    <span>{t('ip-sub-1-1')}</span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(ii)</span>
                    <span>{t('ip-sub-1-2')}</span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(iii)</span>
                    <span>{t('ip-sub-1-3')}</span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(iv)</span>
                    <span>{t('ip-sub-1-4')}</span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(v)</span>
                    <span>{t('ip-sub-1-5')}</span>
                  </div>
                  <div className="pb-3 d-flex">
                    <span className="number">(vi)</span>
                    <span>{t('ip-sub-1-6')}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* {removeIcon && (
        <div>
          <stong>
            <i>Copyright © All rights reserved.</i>
          </stong>
        </div>
      )} */}
      </div>
    </>
  );
};

export default TermsOfUse;
