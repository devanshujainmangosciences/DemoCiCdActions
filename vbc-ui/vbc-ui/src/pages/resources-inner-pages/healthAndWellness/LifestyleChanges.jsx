/**
 * Lifestyle Changes
 */
import {Col, Row} from '@themesberg/react-bootstrap';
import {LocationIcon} from '@/assets/icons';
import {TitleContainer} from '@/components';
import ResourceTabSubData from '@/pages/profile/ResourceTabSubData';
import React from 'react';
import {useLocation} from 'react-router-dom';

const LifestyleChanges = () => {
  const location = useLocation();
  const descriptionData = location.state?.descriptionData;

  return (
    <>
      <Row className="resources-detail-page">
        <Col lg={12} className="mt-3">
          <TitleContainer
            icon={<LocationIcon fill="#28252e" />}
            title={descriptionData?.sideDesc}
            noBg
          />
        </Col>
        <Col lg={12} className="mt-3">
          <ResourceTabSubData data={descriptionData?.subs} />
        </Col>
      </Row>
    </>
  );
};

export default LifestyleChanges;
