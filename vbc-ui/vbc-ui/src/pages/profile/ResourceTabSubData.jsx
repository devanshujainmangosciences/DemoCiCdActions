/**
 * ResourceTabSubData load the description of the side tab
 * renders conditinally based on the data that is present.
 */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import {validateURL} from '@/services/utility';

const ResourceTabSubData = ({data}) => {
  /**
   * This is to render the tab data based on the conditions defined
   * @param {Object} tabData
   * @param {Number} index
   *
   */
  const rendertabData = (tabData, index) => {
    const hrBreak = tabData?.hr_break ? tabData?.hr_break : false;
    const initPara = tabData?.init_para ? tabData?.init_para : false;
    const highlights = tabData?.highlights ? tabData?.highlights : false;
    const bullets = tabData?.bullets ? tabData?.bullets : false;
    const lastPara = tabData?.last_para ? tabData?.last_para : false;
    const links = tabData?.links ? tabData?.links : false;
    const numberedOrder = tabData?.numbered_order
      ? tabData?.numbered_order
      : false;

    // console.log("LAST PARA=>",lastPara)

    return (
      <div key={index}>
        <div className="header mb-1">
          <span className="sub-head">{tabData?.sub_head}</span>
        </div>
        <div>{initPara && renderPara(initPara)}</div>
        <div>{numberedOrder && renderedNumberedData(numberedOrder)}</div>
        <div>
          {highlights ? renderHighlights(highlights) : renderBullets(bullets)}
        </div>
        <div className="mt-3">{lastPara && renderPara(lastPara)}</div>
        <div>{links && renderLinks(links)}</div>
        <div className="mb-3">{hrBreak && <hr />}</div>
      </div>
    );
  };

  /**
   * This is render numbered data in UI
   * @param {Array} numberedOrder
   *
   */
  const renderedNumberedData = (numberedOrder) => {
    if (numberedOrder && numberedOrder.length > 0) {
      return numberedOrder.map((data, index) => (
        <div className="ms-2" key={index}>
          <li className="sub-head-head">
            {index + 1}. {data?.title}
          </li>
          <div className="ms-3">{renderPara(data?.para)}</div>
          {data?.bullets && renderTitledBullets(data?.bullets)}
        </div>
      ));
    }
  };
  /**
   * This is to render Links in UI
   * @param {Array} links
   *
   */
  const renderLinks = (links) => {
    if (links && links.length > 0) {
      return links.map((link, index) => (
        <div className="text-blue" key={index}>
          <a
            key={index + link}
            className="mb-3"
            href={validateURL(link)}
            target="blank">
            <u> {link}</u>
          </a>
        </div>
      ));
    }
  };
  /**
   * This is to render Paragraphs in UI
   * @param {Array} paragraphs
   *
   */
  const renderPara = (paragraphs) => {
    if (paragraphs && paragraphs.length > 0) {
      return paragraphs.map((para, index) => (
        <div key={para + index} className="mb-3">
          {para}
        </div>
      ));
    }
  };

  /**
   * This is to render Highilighted title and description in UI
   * @param {Array} highlights
   *
   */
  const renderHighlights = (highlights) => {
    if (highlights && highlights.length > 0) {
      return highlights.map((higlight, index) => (
        <div key={higlight + index} className="mb-2">
          <FontAwesomeIcon icon={faChevronRight} />
          <span className="text-patient ms-3">{higlight?.title}:</span>
          <span className="ms-1">{higlight?.desc}</span>
          {higlight?.bullets && renderTitledBullets(higlight?.bullets)}
        </div>
      ));
    }
  };

  /**
   * This is render titled Bullets
   * @param {Array} bullets
   *
   */
  const renderTitledBullets = (bullets) => {
    if (bullets && bullets.length > 0) {
      return (
        <div id="style-header-bullet">
          <div className="row">
            {bullets.map((bullet, index) => (
              <div key={index} className="ms-4">
                <span className="d-flex align-items-baseline">
                  <span className="ms-2 bullets">
                    <div></div>
                  </span>

                  <span className="ms-2">
                    {' '}
                    {bullet?.title && (
                      <span className="sub-head">{bullet?.title}</span>
                    )}
                    {bullet?.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  /**
   * This is to render Colored bullets in screen
   * @param {Array} bullets
   *
   */
  const renderBullets = (bullets) => {
    if (bullets && bullets.length > 0) {
      return (
        <div id="style-bullet">
          <div className="row">
            {bullets.map((bullet, index) => (
              <div key={bullet + index} className="col-lg-6 col sub-head">
                <span className="d-flex align-items-baseline">
                  <span className="ms-2 bullets">
                    <div></div>
                    {/* <FontAwesomeIcon
                      icon={faCircle}
                      // size="xs"
                      color="#f78f27"
                      fill="#f78f27"
                    /> */}
                  </span>
                  <span className="ms-2 ">{bullet}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {data && data.map((tabData, index) => rendertabData(tabData, index))}
    </div>
  );
};

export default ResourceTabSubData;
