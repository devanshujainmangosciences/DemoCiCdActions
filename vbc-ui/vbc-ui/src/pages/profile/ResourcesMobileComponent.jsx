/**
 * Component to render when the resources page is viewed in Mobile
 */
import {Col, Row} from '@themesberg/react-bootstrap';
import {LocationIcon} from '@/assets/icons';
import {TitleContainer} from '@/components';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@/redux/redux-hooks';
import ResourceTabSubData from './ResourceTabSubData';

const ResourcesMobileComponent = ({resourcesData}) => {
  const [itemSelected, setitemSelected] = useState(0);
  const [tabSelected, settabSelected] = useState(0);
  const [isSubDetailPage, setisSubDetailPage] = useState(false);
  const [descriptionPage, setDescriptionPage] = useState(false);
  const resourceRoute = useAppSelector(
    (state) => state.route.routeClicked?.Resources
  );
  /** The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to reset the state of `setDescriptionPage` and `setisSubDetailPage` to `false` when the
`resourceRoute` changes. This is done to ensure that the component is reset to its initial state
when the user navigates away from the current resource page. */
  useEffect(() => {
    if (resourceRoute && resourceRoute > 0) {
      setDescriptionPage(false);
      setisSubDetailPage(false);
    }
  }, [resourceRoute]);

  // console.log('RESOURCES=>', resourcesData);

  /**
   * This is to render head tab data
   * @param {Array} tabs
   *
   */
  const renderTabs = (tabs) => {
    if (tabs && tabs.length > 0) {
      return tabs.map((tab, index) => (
        <div
          className="item mb-2 p-4"
          key={index}
          onClick={() => {
            settabSelected(index);
            setisSubDetailPage(!isSubDetailPage);
          }}>
          <span>
            {' '}
            <LocationIcon fill="#28252e" />
          </span>
          <span className="ms-2"> {tab?.main_title}</span>
        </div>
      ));
    }
  };
  /**
   * This is to render Side data in UI
   * @param {Object} sideData
   *
   */
  const renderSubDetailPage = (sideData) => {
    // console.log('SIDE sideData=>', sideData);
    if (sideData && sideData.length > 0) {
      return sideData.map((data, index) => (
        <div
          className="item mb-2 p-4"
          key={data?.sideHeader + index}
          onClick={() => {
            setitemSelected(index);
            setDescriptionPage(!descriptionPage);
          }}>
          {data?.sideDesc}
        </div>
      ));
    }
  };

  /**
   * This is to render the main data inside the Sub Item
   * @param {Object} descriptionData
   *
   */

  const renderDescription = (descriptionData) => {
    // console.log('descriptionData=>', descriptionData);
    if (descriptionData) {
      return (
        <>
          <Row>
            <Col lg={12} className="mt-3 ">
              <TitleContainer
                icon={<LocationIcon fill="#28252e" />}
                title={descriptionData?.sideDesc}
                iconClass={'align-self-start'}
                noBg
              />
            </Col>
            <Col lg={12} className="mt-3">
              <ResourceTabSubData data={descriptionData?.subs} />
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <div className="resources-mobile-view text-justify">
      <div>
        {!isSubDetailPage
          ? renderTabs(resourcesData)
          : !descriptionPage
          ? renderSubDetailPage(resourcesData[tabSelected]?.sideData)
          : renderDescription(
              resourcesData[tabSelected]?.sideData[itemSelected]
            )}
      </div>
    </div>
  );
};

export default ResourcesMobileComponent;
