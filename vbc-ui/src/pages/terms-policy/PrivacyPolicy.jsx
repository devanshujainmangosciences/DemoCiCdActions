/**
 * This Component loads Privacy Policy static Data
 * removeIcon param is used to remove the icon when its being displayed in Modal
 */
import {PrivacyPolicyIcon} from '@/assets/icons';
import {ScrollToTop, TitleContainer} from '@/components';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const PrivacyPolicy = ({removeIcon}) => {
  const {t} = useTranslation(['privacyPolicy']);
  /**
   * Scroll on Top
   */
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <div className="privacy-policy">
        {!removeIcon ? (
          <>
            <ScrollToTop />
            <TitleContainer
              icon={<PrivacyPolicyIcon fill="#fff" />}
              title={t('privacyPolicy')}
            />
          </>
        ) : (
          <div className="privacy-title">{t('privacyPolicy')}</div>
        )}
        <div className="mt-3">
          {' '}
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <div className={`pb-3 `}>
              {t('para-1-line-1')}{' '}
              <strong>
                (&quot;Mango&quot;, &quot;We&quot;, &quot;Us&quot;, or
                &quot;Our&quot;),{' '}
              </strong>
              {t('para-1-line-2-start')}“<strong>{t('platform')}</strong>”)
              {t('para-1-line-2-contd')}
            </div>
            <div className={`pb-3 `}>
              {t('para-2-start')}
              (“<strong>{t('privacyPolicy-bold')}</strong>”) {t('para-2-contd')}
            </div>
            <div className={`pb-3 `}>
              {t('para-3-start')} (“
              <strong>{t('partnered-institutions')}</strong>”)
              {t('para-3-contd')}
              (“<strong>{t('services')}</strong>”).
            </div>
            <div className={`pb-3 `}>
              {t('para-4-start')}
              (“<strong>{t('you')}</strong>”, “<strong>{t('your')}</strong>”{' '}
              <i>{t('as-applicable')}</i>){t('para-4-middle')}
              (“<strong>{t('terms')}</strong>”)
              {t('para-4-contd')}
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">1</span>
              <span>{t('collection-of-info')}</span>
            </h5>

            <div className="pb-3">{t('collection-of-info-data-1')}</div>
            <div className="pb-3">
              <strong>{t('collection-info-desc')}</strong>
            </div>
            <div className="pb-3 d-flex">
              <span className="number">(i)</span>
              <span>
                <span>{t('collection-info-1-title')}</span>
                <span> {t('collection-info-1-data')}</span>
              </span>
            </div>

            <div className="ps-4">
              <div className="pb-3">
                <strong> {t('collection-info-1-sub-desc')}</strong>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">(a)</span>
                <span>
                  {t('collection-info-1-sub-1-start')}
                  (“<strong>{t('medical-info')}</strong>”);
                  {t('collection-info-1-sub-1-contd')}
                </span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">(b)</span>
                <span>{t('collection-info-1-sub-2-b')}</span>
              </div>
              <div className="pb-3 d-flex">
                <span className="number">(c)</span>
                <span>{t('collection-info-1-sub-2-c')}</span>
              </div>
              <div className="pb-3">
                <span>
                  {t('collection-info-1-sub-2-desc-start')}
                  (“<strong>{t('personal-info')}</strong>”).
                  {t('collection-info-1-sub-2-desc-contd')}
                </span>
              </div>
            </div>

            <div className="pb-3">
              <span>{t('collection-info-1-sub-2-last')}</span>
            </div>
            <div className="pb-3 d-flex">
              <span className="number">(ii)</span>
              <span>
                <span>{t('collection-info-2-title')}</span>
                <span> {t('collection-info-2-data')}</span>
              </span>
            </div>
            <div className="pb-3 d-flex">
              <span className="number">(iii)</span>
              <span>
                <span>{t('collection-info-3-title')}</span>
                <span> {t('collection-info-3-data')}</span>
              </span>
            </div>
            <div className="pb-3 d-flex">
              <span className="number">(iv)</span>
              <span>
                <span>{t('collection-info-4-title')}</span>
                <span>
                  {t('collection-info-4-data-start')}
                  (“<strong>{t('non-personal-info')}</strong>”),
                  {t('collection-info-4-data-contd')}
                </span>
              </span>
            </div>
            <div className="pb-3 d-flex">
              <span className="number">(v)</span>
              <span>
                <span>{t('collection-info-5-title')}</span>
                <span> {t('collection-info-5-data')}</span>
              </span>
            </div>
            <div className="pb-3">{t('collection-of-info-data-2')}</div>
            <div className="pb-3">{t('collection-of-info-data-3')}</div>
            <div className="pb-3">{t('collection-of-info-data-4')}</div>
            <div className="pb-3">{t('collection-of-info-data-5')}</div>
            <div className="pb-3">{t('collection-of-info-data-6')}</div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">2</span>

              {t('use-of-info-title')}
            </h5>
            <div>
              <div className="pb-3">
                <div className="pb-3">{t('use-of-info-data-1')}</div>
                <div className="pb-3">{t('use-of-info-data-2')}</div>
                <div className="pb-3">{t('use-of-info-data-3')}</div>
                <div className="pb-3">{t('use-of-info-data-4')}</div>
                <div className="">{t('use-of-info-data-5')}</div>
              </div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">3</span>
              {t('share-of-info-title')}
            </h5>

            <div className="">
              <div className="pb-3">{t('share-of-info-data-1')}</div>
              <div className="pb-3">{t('share-of-info-data-2')}</div>
              <div className="pb-3">{t('share-of-info-data-3')}</div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">4</span>
              {t('security-info-title')}
            </h5>

            <div className="">
              <div className="pb-3">{t('security-info-data-1')}</div>
              <div className="pb-3">{t('security-info-data-2')}</div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">5</span>
              {t('third-party-title')}
            </h5>

            <div className="">
              <div className="pb-3">
                {t('third-party-data-start')}
                (“<strong>{t('third-party-sites')}</strong>”)
                {t('third-party-data-contd')}
              </div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">6</span>
              {t('public-title')}
            </h5>

            <div className="pb-3">
              {' '}
              <div className="">
                {t('public-data-start')}
                (“<strong>{t('posts')}</strong>”).
                {t('public-data-contd')}
              </div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">7</span>
              {t('consent-title')}
            </h5>

            <div className="">
              <div className="pb-3">
                <div className="pb-3">
                  <span>{t('consent-para-1')}</span>
                </div>
                <div className="pb-3">
                  <strong>{t('consent-sub-title-1')}</strong>
                  <span>{t('consent-sub-data-1')}</span>
                </div>
                <div>
                  <strong>{t('consent-sub-title-2')}</strong>
                  <span>{t('consent-sub-data-2')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">8</span>
              {t('grievance-title')}
            </h5>
            <div className="pb-3">
              <div className="pb-3">{t('grievance-para-1')}</div>
              <div className="pb-3">{t('grievance-data')}</div>
              <div className="">
                {/* <div>
              <span>
                <strong>{t('name')}</strong>
              </span>
              <span>{t('name-data')}</span>
            </div> */}
                {/* <div>
                  <span>
                    <strong>{t('email')}</strong>
                  </span>
                  <span>{t('email-data')}</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="p-4 pb-1 w-100 mt-3  h-100 item justify-content-start align-items-center">
            <h5 className="pb-3 text-left">
              <span className="number">9</span>
              {t('question-title')}
            </h5>
            <div className="pb-3">
              {' '}
              <div className="">{t('question-data')}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
