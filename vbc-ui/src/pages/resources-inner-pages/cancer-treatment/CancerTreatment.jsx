/**
 * Cancer treatment blogs list
 * redirectToResourceComponent function helps to redirect to correct function.
 * also its check if applicant
 *
 * useEffect:- Used to fetch the data from the resources document if clicked back using breadcrumbs
 */
import ResourcesHOC from '@/pages/profile/ResourcesHOC';
import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router';
import {Routes} from '@/routes';
import {secureLocalStorage} from '@/services/web.storage';
import resourcesData from '../../../assets/json/resourceData';
import {ROLES} from '../../../constants';
import {useAppSelector} from '@/redux/redux-hooks';

const CancerTreatment = () => {
  const location = useLocation();
  let sidedata = location.state?.sideData;
  const [sideDataState, setsideDataState] = useState(null);
  const selectedRole = useAppSelector((state) => state.app.userSelectedRole);
  const userSelectedRole = selectedRole?.roleName;
  const isApplicant = userSelectedRole === ROLES.APPLICANT;
  /** This is a `useEffect` hook that is used to fetch data from the `resourcesData` array and set it to
the `sideDataState` state variable. It checks if the `sidedata` prop is passed from the previous
component, and if it is, it sets the `sideDataState` to that value. Otherwise, it sets the
`sideDataState` to the second element of the `resourcesData` array. The `useEffect` hook is
triggered whenever the `sidedata` prop changes. */
  useEffect(() => {
    if (sidedata) {
      setsideDataState(sidedata);
    } else {
      const requiredSideData = resourcesData[1]?.sideData;
      setsideDataState(requiredSideData);
    }
  }, [sidedata]);
  /**
   * This function redirects the user to a specific resource component based on the index provided.
   * @param {Number} index
   * @param {Object} descriptionData
   */
  const redirectToResourceComponent = (index, descriptionData) => {
    switch (index) {
      case 0:
        history(
          isApplicant
            ? Routes.KnowYourOptionsApplicant.path
            : Routes.KnowYourOptions.path,
          {state: {descriptionData}}
        );
        break;
      case 1:
        history(
          isApplicant
            ? Routes.ImmunoForCancerApplicant.path
            : Routes.ImmunoForCancer.path,
          {state: {descriptionData}}
        );
        break;
      case 2:
        history(
          isApplicant
            ? Routes.BiomarkerForCancerApplicant.path
            : Routes.BiomarkerForCancer.path,
          {state: {descriptionData}}
        );
        break;

      default:
        break;
    }
  };
  const history = useNavigate();
  /**
   * This function renders a list of clickable div elements based on the provided sideData array.
   * @returns The function `renderSubDetailPage` returns an array of JSX elements that are created using
   * the `map` method on the `sideData` array. Each element is a `div` with a class name, a key, and an
   * `onClick` event listener that calls the `redirectToResourceComponent` function with the index and
   * the corresponding `sideData` object as arguments.
   * @param {Array} sideData
   */
  const renderSubDetailPage = (sideData) => {
    if (sideData && sideData.length > 0) {
      return sideData.map((data, index) => (
        <div
          className="mb-2 p-4  w-50 cursor-pointer d-flex align-items-center h-25px resource-side-header "
          key={data?.sideHeader + index}
          onClick={() => {
            redirectToResourceComponent(index, sideData[index]);
            // setitemSelected(index);
            // setDescriptionPage(!descriptionPage);
          }}>
          {data?.sideDesc}
        </div>
      ));
    }
  };
  return (
    <ResourcesHOC>
      <div className="d-flex flex-column">
        {renderSubDetailPage(sideDataState)}
      </div>
    </ResourcesHOC>
  );
};

export default CancerTreatment;
