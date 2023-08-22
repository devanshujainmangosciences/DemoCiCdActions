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
import {View} from 'react-native';
import Config from 'constants/permissionsMock';

const Can = (props) => {
  const {
    children,
    performingAction,
    handleOnSuccess,
    handleOnFail,
    style,
    additionalProps,
  } = props;

  useEffect(() => {
    if (!performingAction) {
      throw 'Please add performing action prop on <Can> component.';
    }
  }, []);

  const {component, action} = performingAction;
  const canShow = Config.data.perms[component]?.includes(action);

  useEffect(() => {
    if (canShow) {
      handleOnSuccess && handleOnSuccess();
    } else {
      handleOnFail && handleOnFail();
    }
  }, [canShow]);

  return (
    <>
      {canShow && (
        <View style={style} {...additionalProps}>
          {children}
        </View>
      )}
    </>
  );
};

export default Can;
