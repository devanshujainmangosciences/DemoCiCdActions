/**
 * Caregiver blogs list
 * redirectToResourceComponent function helps to redirect to correct function.
 * also its check if applicant
 *
 * useEffect:- Used to fetch the data from the resources document if clicked back using breadcrumbs
 */
import ResourcesHOC from '@/pages/profile/ResourcesHOC';
import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router';
import {Routes} from '@/routes';
import resourcesData from '../../../assets/json/resourceData';
import {ROLES} from '../../../constants';
import {useAppSelector} from '@/redux/redux-hooks';

const CaregiverSupport = () => {
  const location = useLocation();
  const history = useNavigate();
  let sidedata = location.state?.sideData;
  const selectedRole = useAppSelector((state) => state.app.userSelectedRole);
  const userSelectedRole = selectedRole?.roleName;
  const isApplicant = userSelectedRole === ROLES.APPLICANT;
  const [sideDataState, setsideDataState] = useState(null);
  /**This is a `useEffect` hook that is used to fetch data from the `resourcesData` array and set it to
the `sideDataState` state variable. It checks if `sidedata` is present in the location state, and if
it is, it sets the `sideDataState` to that value. Otherwise, it sets the `sideDataState` to the
`sideData` property of the 4th element in the `resourcesData` array. The `useEffect` hook is
triggered whenever the `sidedata` variable changes. */
  useEffect(() => {
    if (sidedata) {
      setsideDataState(sidedata);
    } else {
      const requiredSideData = resourcesData[3]?.sideData;
      setsideDataState(requiredSideData);
    }
  }, [sidedata]);
  /**
   * The function redirects the user to a specific resource component based on the index parameter and
   * user type.
   */
  const redirectToResourceComponent = (index, descriptionData) => {
    switch (index) {
      case 0:
        history(
          isApplicant
            ? Routes.SuccessfulCaregiverApplicant.path
            : Routes.SuccessfulCaregiver.path,
          {state: {descriptionData}}
        );
        break;
      case 1:
        history(
          isApplicant
            ? Routes.SupportGroupsApplicant.path
            : Routes.SupportGroups.path,
          {state: {descriptionData}}
        );
        break;

      default:
        break;
    }
  };

  /**
   * This function renders a list of clickable div elements based on the provided sideData array.
   * @returns The function `renderSubDetailPage` returns an array of JSX elements that are created using
   * the `map` method on the `sideData` array. Each element is a `div` with a class name, a key, and an
   * `onClick` event listener that calls the `redirectToResourceComponent` function with the index and
   * the corresponding `sideData` object as arguments. The text content of
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

export default CaregiverSupport;
