/**
 * This module helps to manage role based access. RBAC.
 * Defining any react component inside of this component -
 * will helps to show/hide react component according to the
 * status/role of the user.
 * For example: If I want to have a button - Add Patient that can only be visible to role - 'doctor'
 * then I can bind my button in this component wrapper.
 * <Can
        handleOnSuccess={() => console.log('Can add patient')}
        handleOnFail={() => console.log('Cannot add patient')}
        performingAction={'Dashboard: addPatient'}
        style={[styles.logoutContainer, {width: 200}]}>
        <Text>Add Patient</Text>
    </Can>
  * Can component checks whether the prop performingAction is present in role config object or not.
  * If yes, it render the component with calling handleOnSuccess() if available.
  * Otherwise, it will not render anything & only call handleOnFail() if available.
  * IMPORTANT:
  * performingAction prop is required.
 */
import React, {useEffect} from 'react';
import {useAppSelector} from '@/redux/redux-hooks';
import PropTypes from 'prop-types';
import {USER_SELECTED_ROLE} from '../constants';
import {secureLocalStorage} from '@/services/web.storage';

const Can = (props) => {
  const {
    children,
    performingAction,
    handleOnSuccess,
    handleOnFail,
    isTable,
    style,
    additionalProps,
    removeDiv = false,
    dataToShowWhenComponentNotRendered,
  } = props;
  const globalState = useAppSelector((state) => state.app);
  const {userPermissions, userSelectedRole} = globalState;
  const roleId = userSelectedRole?.roleId;

  useEffect(() => {
    if (!performingAction) {
      throw new Error('Please add performing action prop on <Can> component.');
    }
  }, [performingAction]);

  const {component, action} = performingAction;

  const canShow =
    userPermissions?.roleDataMap[roleId]?.perms[component]?.includes(action);

  useEffect(() => {
    if (canShow) {
      handleOnSuccess && handleOnSuccess();
    } else {
      handleOnFail && handleOnFail();
    }
  }, [canShow, handleOnSuccess, handleOnFail]);

  return (
    <>
      {canShow ? (
        isTable || removeDiv ? (
          <>{children}</>
        ) : (
          <div style={style} {...additionalProps}>
            {children}
          </div>
        )
      ) : (
        <>
          {dataToShowWhenComponentNotRendered &&
            dataToShowWhenComponentNotRendered}
        </>
      )}
    </>
  );
};

Can.propTypes = {
  children: PropTypes.any,
  performingAction: PropTypes.object,
  handleOnSuccess: PropTypes.func,
  handleOnFail: PropTypes.func,
  isTable: PropTypes.bool,
  style: PropTypes.string,
  additionalProps: PropTypes.object,
};
export default Can;
