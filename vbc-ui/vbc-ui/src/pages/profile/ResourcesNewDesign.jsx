/**
 * Resource page loads static data to show user the resources data
 * The data is fetched from json File
 *
 */
import {
  AboutCancerIcon,
  CancerSupportIcon,
  CancerTreatmentIcon,
  HealthAndWellnessIcon,
  ResourceIcon,
} from '@/assets/icons';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import resourcesData from '../../assets/json/resourceData';
import ResourcesMobileComponent from './ResourcesMobileComponent';
import {useAppSelector} from '@/redux/redux-hooks';
import {Routes} from '@/routes';
import {useNavigate} from 'react-router';
import {ROLES} from '../../constants';

const ResourcesNewDesign = ({children}) => {
  const {t} = useTranslation(['resource']);
  const history = useNavigate();
  // const [itemSelected, setitemSelected] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [tabSelected, settabSelected] = useState(0);
  const [isSubDetailPage, setisSubDetailPage] = useState(false);
  const [descriptionPage, setDescriptionPage] = useState(false);
  const selectedRole = useAppSelector((state) => state.app.userSelectedRole);
  const userSelectedRole = selectedRole?.roleName;
  const isApplicant = userSelectedRole === ROLES.APPLICANT;
  const resourceRoute = useAppSelector(
    (state) => state.route.routeClicked?.Resources
  );

  /** This is a `useEffect` hook that is triggered whenever the `resourceRoute` variable changes. If
`resourceRoute` is truthy and greater than 0, it sets the `setDescriptionPage` and
`setisSubDetailPage` state variables to `false`. This is likely used to reset the state when the
user navigates away from a resource detail page. */
  useEffect(() => {
    if (resourceRoute && resourceRoute > 0) {
      setDescriptionPage(false);
      setisSubDetailPage(false);
    }
  }, [resourceRoute]);

  /**
   * This component recieves the index and the data to be dispayed
   * @param {Number} index
   * @param {Object} sideData
   */
  const redirectToResourceComponent = (index, sideData) => {
    switch (index) {
      case 0:
        history(
          isApplicant
            ? Routes.AboutCancerApplicant.path
            : Routes.AboutCancer.path,
          {state: {sideData}}
        );
        break;
      case 1:
        history(
          isApplicant
            ? Routes.CancerTreatmentApplicant.path
            : Routes.CancerTreatment.path,
          {state: {sideData}}
        );
        break;
      case 2:
        history(
          isApplicant
            ? Routes.HealthAndWellnessApplicant.path
            : Routes.HealthAndWellness.path,
          {state: {sideData}}
        );
        break;
      case 3:
        history(
          isApplicant
            ? Routes.CaregiverSupportApplicant.path
            : Routes.CaregiverSupport.path,
          {state: {sideData}}
        );
        break;
      default:
        break;
    }
  };

  /**
   * The function `renderIcons` returns a pair of icons based on the index passed as an argument.
   * @returns The `renderIcons` function returns two div elements, one containing an icon and the other
   * containing the same icon with a different fill color. These div elements are wrapped in a fragment.
   * @param {Number} index
   */
  const renderIcons = (index) => {
    let icon;
    let iconFill;
    switch (index) {
      case 0:
        icon = <AboutCancerIcon fill="#28252e" />;
        iconFill = <AboutCancerIcon fill="#f78f27" />;
        break;
      case 1:
        icon = <CancerTreatmentIcon fill="#28252e" />;
        iconFill = <CancerTreatmentIcon fill={'#f78f27'} />;
        break;
      case 2:
        icon = <HealthAndWellnessIcon fill="#28252e" />;
        iconFill = <HealthAndWellnessIcon fill={'#f78f27'} />;
        break;
      case 3:
        icon = <CancerSupportIcon fill="#28252e" />;
        iconFill = <CancerSupportIcon fill={'#f78f27'} />;
        break;

      default:
        break;
    }
    return (
      <>
        {' '}
        <div className=" justify-content-center  resource-icon">{icon}</div>
        <div className=" justify-content-center " id="resource-icon-hover">
          {iconFill}
        </div>
      </>
    );
  };

  /**
   * This function renders a list of resource items with icons and titles, and allows the user to click
   * on them to redirect to a resource component.
   * @returns The function `renderHeaderBoxes` returns a JSX element which is a mapped array of
   * `resourcesData`. Each element in the array is a `div` element with a class name of `resource-item
   * resource-card d-flex justify-content-center align-items-center cursor-pointer`. It also has an
   * `onClick` event listener that calls the `redirectToResourceComponent` function and sets the
   * `isSubDetailPage`
   * @param {Array} resourcesData
   */
  const renderHeaderBoxes = (resourcesData) => {
    // console.log('resources=>', resourcesData);
    if (resourcesData && resourcesData.length > 0) {
      return resourcesData.map((resource, index) => {
        return (
          <div
            className="mb-2 resource-item resource-card d-flex justify-content-center align-items-center cursor-pointer"
            key={index + resource?.main_title}
            onClick={() => {
              redirectToResourceComponent(
                index,
                resourcesData[index]?.sideData
              );

              // settabSelected(index);
              setisSubDetailPage(!isSubDetailPage);
            }}>
            <div>
              {renderIcons(index)}
              <div className="d-flex justify-content-center mt-2 ">
                <p className="resource-text-item mb-0 ">
                  {resource?.main_title}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  // const renderSubDetailPage = (sideData) => {
  //   if (sideData && sideData.length > 0) {
  //     return sideData.map((data, index) => (
  //       <div
  //         className="mb-2 p-4  w-50 cursor-pointer d-flex align-items-center h-25px resource-side-header "
  //         key={data?.sideHeader + index}
  //         onClick={() => {
  //           // setitemSelected(index);
  //           setDescriptionPage(!descriptionPage);
  //         }}>
  //         {data?.sideDesc}
  //       </div>
  //     ));
  //   }
  // };

  // const renderDescription = (descriptionData) => {
  //   if (descriptionData) {
  //     return (
  //       <>
  //         <Row>
  //           <Col lg={12} className="mt-3">
  //             <TitleContainer
  //               icon={<LocationIcon fill="#28252e" />}
  //               title={descriptionData?.sideDesc}
  //               noBg
  //             />
  //           </Col>
  //           <Col lg={12} className="mt-3">
  //             <ResourceTabSubData data={descriptionData?.subs} />
  //           </Col>
  //         </Row>
  //       </>
  //     );
  //   }
  // };

  /**
   * This function toggles between two boolean states based on certain conditions.
   */
  const onIconClick = () => {
    if (isSubDetailPage || descriptionPage) {
      if (isSubDetailPage && descriptionPage) setDescriptionPage(false);
      else setisSubDetailPage(false);
    }
  };

  return (
    <>
      <div className="title-container mb-3 ">
        <div
          className={`page-icon bg-patient ${
            isSubDetailPage || descriptionPage ? 'cursor-pointer' : ''
          }`}
          onClick={onIconClick}>
          <ResourceIcon fill={'#FFFFFF'} />
        </div>
        <div className="page-title text-capitalize">{t('resources')}</div>
      </div>

      <ResourcesMobileComponent resourcesData={resourcesData} />
      <div className="resources-web text-justify">
        {!isSubDetailPage ? (
          <>
            <span className="text-info-grey">
              Read about the latest developments related to cancer research,
              treatment, and management.
            </span>
            <div className="d-flex flex-wrap-wrap gap-4 mt-3">
              {renderHeaderBoxes(resourcesData)}
            </div>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </>
  );
};

export default ResourcesNewDesign;
