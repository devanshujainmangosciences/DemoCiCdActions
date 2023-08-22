/**
 * Resource HOC:- Helps to render the icon in the resources page and the Resource Mobile component
 */
import {ResourceIcon} from '@/assets/icons';
import React from 'react';
import ResourcesMobileComponent from './ResourcesMobileComponent';
import resourcesData from '../../assets/json/resourceData';

const ResourcesHOC = ({children}) => {
  return (
    <>
      <div className="title-container mb-3 ">
        <div className="page-icon bg-patient">
          <ResourceIcon fill={'#FFFFFF'} />
        </div>
        <div className="page-title text-capitalize">{'resources'}</div>
      </div>

      <ResourcesMobileComponent resourcesData={resourcesData} />
      <div className="resources-web text-justify">
        <>{children}</>
      </div>
    </>
  );
};

export default ResourcesHOC;
