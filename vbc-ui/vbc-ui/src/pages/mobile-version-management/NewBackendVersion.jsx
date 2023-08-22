/**
 * Component to Add/Edit/Update new backend version
 */
import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Container} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../redux/redux-hooks';
import CustomReactSelect from '../../components/CustomReactSelect';
import uniqBy from 'lodash/uniqBy';
import {useLocation, useNavigate} from 'react-router-dom';
import {VERSION_TYPE, DateFormat, ALERT_MESSAGE} from '../../constants';
import {
  readMobileVersionsList,
  createMobileVersion,
  updateMobileVersion,
  setToast,
} from '../../actions';
import format from 'date-fns/format';

import {Routes} from '../../routes';

const NewBackendVersion = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useNavigate();
  const stateRecieved = location.state;
  const [pageSize, setPageSize] = useState(10);
  const [isDisabled, setisDisabled] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [androidVersionsList, setandroidVersionsList] = useState([]);
  const [iosVersionList, setiosVersionList] = useState([]);
  const [selectedAndroidVersion, setselectedAndroidVersion] = useState(null);
  const [selectedIosVersion, setselectedIosVersion] = useState(null);
  const [isInvalidBackendVersion, setisInvalidBackendVersion] = useState(false);
  const [selectedIosVersionMaster, setselectedIosVersionMaster] =
    useState(null);
  const [selectedAndroidVersionMaster, setselectedAndroidVersionMaster] =
    useState(null);
  const [iosCodePushVersionList, setiosCodePushVersionList] = useState(null);
  const [androidCodePushVersionList, setandroidCodePushVersionList] =
    useState(null);
  const formDataInitialState = {
    id: '',
    backendVersion: '',
    releaseDate: '',
  };
  const [formData, setformData] = useState(formDataInitialState);
  const {backendVersion, releaseDate} = formData;
  const androidVersions = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.androidVersionListAll
  );
  const iosVersions = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.iosVersionListAll
  );
  const mobileVersion = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.backendVersionList
  );
  const mobileVersionAll = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.backendVersionListAll
  );

  /** The below code is using the `useEffect` hook in a React component to dispatch three different
actions to read mobile versions list for Android, Backend, and iOS. These actions are dispatched
with specific parameters such as page number, page size, version type, and an empty array as a
filter. The `useEffect` hook is used with an empty dependency array to ensure that these actions are
only dispatched once when the component mounts. */
  useEffect(() => {
    dispatch(
      readMobileVersionsList(0, pageSize, VERSION_TYPE.ANDROID, true, [])
    );
    dispatch(
      readMobileVersionsList(0, pageSize, VERSION_TYPE.BACKEND, true, [])
    );
    dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.IOS, true, []));
  }, []);

  /* The below code is a React useEffect hook that runs when the dependencies `backendVersion`,
 `mobileVersionAll`, or `stateRecieved` change. It checks if `backendVersion` and `mobileVersionAll`
 are truthy and if `mobileVersionAll` has at least one item. If so, it finds the first item in
 `mobileVersionAll` that has a `backendVersion` property matching the value of `backendVersion`. If
 `stateRecieved` has an `id` property, it finds the first item in `mobileVersionAll` that has an
 `id` property */
  useEffect(() => {
    if (backendVersion && mobileVersionAll && mobileVersionAll.length > 0) {
      const avaliableBackendVersion = mobileVersionAll.find(
        (item) => item.backendVersion === backendVersion
      );
      if (stateRecieved?.id) {
        const requiredData = mobileVersionAll.find(
          (item) => item.id === stateRecieved?.id
        );

        if (
          avaliableBackendVersion &&
          avaliableBackendVersion.backendVersion !== requiredData.backendVersion
        )
          setisInvalidBackendVersion(true);
        else setisInvalidBackendVersion(false);
      } else {
        if (avaliableBackendVersion) setisInvalidBackendVersion(true);
        else setisInvalidBackendVersion(false);
      }
    }
  }, [backendVersion, mobileVersionAll, stateRecieved]);

  /** The below code is a React useEffect hook that runs when the component mounts or when the
dependencies (stateRecieved, iosVersionList, androidVersionsList) change. It checks the value of
stateRecieved and sets the values of isDisabled and isUpdate based on its label. If stateRecieved
has an id and iosVersionList and androidVersionsList are not empty, it finds the required data from
mobileVersion array based on the id and sets the selectedAndroidVersionMaster,
selectedAndroidVersion, selectedIosVersionMaster, selectedIosVersion, and formData based on the
required data. */
  useEffect(() => {
    if (stateRecieved && stateRecieved?.label === 'View Details') {
      setisDisabled(true);
      setisUpdate(false);
    } else if (stateRecieved && stateRecieved?.label === 'Edit Details') {
      setisDisabled(false);
      setisUpdate(true);
    } else {
      setformData(formDataInitialState);
      setisDisabled(false);
      setisUpdate(false);
    }

    if (
      stateRecieved?.id &&
      iosVersionList &&
      iosVersionList.length > 0 &&
      androidVersionsList &&
      androidVersionsList.length > 0
    ) {
      const requiredData = mobileVersion.find(
        (item) => item.id === stateRecieved?.id
      );
      if (
        requiredData.androidVersions &&
        requiredData.androidVersions.length > 0
      ) {
        // setandroidVersion(requiredData.androidVersions[0].androidVersion);
        const reqAndroidVersions = uniqBy(
          requiredData.androidVersions,
          'androidVersion'
        ).map((item) => item?.androidVersion);
        const requiredAndroidVersionMasterList = androidVersionsList.filter(
          (item) => reqAndroidVersions.includes(item.label)
        );

        setselectedAndroidVersionMaster(requiredAndroidVersionMasterList);
        const androidVersionsMapped = requiredData.androidVersions.map(
          (item) => {
            return {
              label: `${item.androidVersion}(${
                item.codePushVersion ? item.codePushVersion : 'N/A'
              })`,
              value: item.id,
            };
          }
        );

        setselectedAndroidVersion(androidVersionsMapped);
      }
      if (requiredData.iosVersions && requiredData.iosVersions.length > 0) {
        const reqIosVersions = uniqBy(
          requiredData.iosVersions,
          'iosVersion'
        ).map((item) => item?.iosVersion);
        const requiredIosVersionMasterList = iosVersionList.filter((item) =>
          reqIosVersions.includes(item.label)
        );
        setselectedIosVersionMaster(requiredIosVersionMasterList);
        const iosVersionsMapped = requiredData.iosVersions.map((item) => {
          return {
            label: `${item.iosVersion}(${
              item.codePushVersion ? item.codePushVersion : 'N/A'
            })`,
            value: item.id,
          };
        });

        setselectedIosVersion(iosVersionsMapped);
      }

      const reqState = {...requiredData};

      const requiredDate = format(
        new Date(reqState.releaseDate),
        DateFormat.US_DATE_DASH
      );
      reqState['releaseDate'] = requiredDate;
      setformData(reqState);
    }
  }, [stateRecieved, iosVersionList, androidVersionsList]);

  // console.log('selectedIosVersionMaster=>', selectedIosVersionMaster);

  /**
   * set the state with label and value property If androidVersions  have data
   */
  useEffect(() => {
    if (androidVersions) {
      const converted = uniqBy(androidVersions, 'androidVersion').map(
        (version) => ({
          value: version.id,
          label: version.androidVersion,
        })
      );
      setandroidVersionsList(converted);
    }
  }, [androidVersions]);

  /**
   * set the state with label and value property If iosVersions  have data
   */
  useEffect(() => {
    if (iosVersions) {
      const converted = uniqBy(iosVersions, 'iosVersion').map((version) => ({
        value: version.id,
        label: version.iosVersion,
      }));
      setiosVersionList(converted);
    }
  }, [iosVersions]);

  /* The below code is a React useEffect hook that runs when the dependencies `selectedIosVersionMaster`
and `iosVersions` change. It checks if `selectedIosVersionMaster` is not null and has a length
greater than 0, and if `iosVersions` is not null and has a length greater than 0. If both conditions
are true, it filters `iosVersions` based on the `iosVersion` property of each item that matches the
`label` property of each item in `selectedIosVersionMaster`. It then maps the filtered `iosVersions`
to a new */
  useEffect(() => {
    if (
      selectedIosVersionMaster &&
      selectedIosVersionMaster.length > 0 &&
      iosVersions &&
      iosVersions.length > 0
    ) {
      // setselectedIosVersion(null);

      const reqIosVersionSelected = selectedIosVersionMaster.map(
        (item) => item.label
      );
      const requiredCodepushVersions = iosVersions.filter((item) =>
        reqIosVersionSelected.includes(item.iosVersion)
      );

      if (requiredCodepushVersions && requiredCodepushVersions.length > 0) {
        const reqData = requiredCodepushVersions
          .map((item) => {
            return {
              value: item.id,
              label: `${item.iosVersion}(${
                item.codePushVersion ? item.codePushVersion : 'N/A'
              })`,
            };
          })
          .filter((item) => item.label);
        // if (reqData.length > 0) reqData.unshift(...addationSelect);
        setiosCodePushVersionList(reqData);
      }
    } else if (
      selectedIosVersionMaster &&
      selectedIosVersionMaster.length === 0
    ) {
      setiosCodePushVersionList(null);
      setselectedIosVersion(null);
    }
  }, [selectedIosVersionMaster, iosVersions]);

  /* The below code is a React useEffect hook that runs when the dependencies
`selectedAndroidVersionMaster` and `androidVersions` change. It checks if
`selectedAndroidVersionMaster` is not null and has at least one item, and if `androidVersions` is
not null and has at least one item. If both conditions are true, it filters `androidVersions` based
on the `androidVersion` property that matches the `label` property of each item in
`selectedAndroidVersionMaster`. It then creates a new array of objects with the `id` and a formatted
string of `androidVersion` */
  useEffect(() => {
    if (
      selectedAndroidVersionMaster &&
      selectedAndroidVersionMaster.length > 0 &&
      androidVersions &&
      androidVersions.length > 0
    ) {
      // setselectedAndroidVersion(null);
      const reqAndroidVersionSelected = selectedAndroidVersionMaster.map(
        (item) => item.label
      );
      const requiredCodepushVersions = androidVersions.filter((item) =>
        reqAndroidVersionSelected.includes(item.androidVersion)
      );
      if (requiredCodepushVersions && requiredCodepushVersions.length > 0) {
        const reqData = requiredCodepushVersions
          .map((item) => {
            return {
              value: item.id,
              label: `${item.androidVersion}(${
                item.codePushVersion ? item.codePushVersion : 'N/A'
              })`,
            };
          })
          .filter((item) => item.label);
        // if (reqData.length > 0) reqData.unshift(...addationSelect);
        setandroidCodePushVersionList(reqData);
      }
    } else if (
      selectedAndroidVersionMaster &&
      selectedAndroidVersionMaster.length === 0
    ) {
      setandroidCodePushVersionList(null);
      setselectedAndroidVersion(null);
    }
  }, [selectedAndroidVersionMaster, androidVersions]);

  /**
   * This function updates the selected Android or iOS versions based on the user's multi-select input,
   * with an option to select all versions.
   * @param {Array} data
   * @param {Object} singleData
   * @param {String} type
   */

  const onMultiSelectVersion = (data, singleData, type) => {
    if (type === VERSION_TYPE.ANDROID) {
      if (singleData?.option?.value === 'all') {
        const newAndroidVersions = [...androidVersionsList];
        newAndroidVersions.shift();
        setselectedAndroidVersion(newAndroidVersions);
      } else setselectedAndroidVersion(data);
    } else {
      if (singleData?.option?.value === 'all') {
        const newIosVersion = [...iosVersionList];
        newIosVersion.shift();
        setselectedIosVersion(newIosVersion);
      } else setselectedIosVersion(data);
    }
  };
  /**
   * This function sets the selected version for either Android or iOS based on the type parameter.
   * @param {Array} data
   * @param {Object} singleData
   * @param {String} type
   */
  const onMultiSelectVersionMaster = (data, singleData, type) => {
    if (type === VERSION_TYPE.ANDROID) setselectedAndroidVersionMaster(data);
    else setselectedIosVersionMaster(data);
  };

  /**
   * This function updates the state of a form data object with the new value of the input field that
   * triggered the change event.
   */
  const handelFormChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value});
  };

  /**
   * This function handles the submission of a form for creating or updating mobile versions, including
   * checking for required versions and dispatching actions.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let iosIds = [];
    let androidIds = [];
    if (selectedIosVersion && selectedIosVersion.length > 0)
      iosIds = selectedIosVersion.map((item) => item.value);
    if (selectedAndroidVersion && selectedAndroidVersion.length > 0)
      androidIds = selectedAndroidVersion.map((item) => item.value);

    const reqData = {
      ...formData,
      releaseDate: new Date(releaseDate),
      iosVersionIds: iosIds,
      androidVersionIds: androidIds,
    };
    const customOnSuccess = () => {
      dispatch(
        readMobileVersionsList(0, pageSize, VERSION_TYPE.BACKEND, false, [])
      );
      history(Routes.BackendVersionList.path);
      setformData(formDataInitialState);
    };

    if (iosIds.length > 0 && androidIds.length > 0) {
      if (isUpdate)
        dispatch(
          updateMobileVersion(reqData, VERSION_TYPE.BACKEND, customOnSuccess)
        );
      else
        dispatch(
          createMobileVersion(reqData, VERSION_TYPE.BACKEND, customOnSuccess)
        );
    } else {
      dispatch(
        setToast(ALERT_MESSAGE.ADD_ATLEAST_ONE_VERSION, true, 'warning')
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-modal">
      <h3>
        {isDisabled
          ? 'View Backend Version'
          : isUpdate
          ? 'Update Backend Version'
          : 'Create Backend Version'}
      </h3>
      <Container className="bg-white px-4 py-4 rounded mt-4">
        <div className="d-flex gap-2 flex-wrap">
          <Form.Group as={Col} controlId="backendVersion">
            <Form.Label>Backend Version</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter backend Version"
              disabled={isDisabled}
              name="backendVersion"
              value={backendVersion}
              isInvalid={isInvalidBackendVersion}
              onChange={handelFormChange}
            />
            {isInvalidBackendVersion && (
              <Form.Control.Feedback type="invalid">
                Backend Version is already available
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="releaseDate">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              required
              type="date"
              disabled={isDisabled}
              name="releaseDate"
              value={releaseDate}
              onChange={handelFormChange}
            />
          </Form.Group>
        </div>
        <div className="d-flex gap-2">
          <Form.Group as={Col} controlId="iosVersionList">
            <Form.Label>IOS Versions</Form.Label>
            <CustomReactSelect
              isDisabled={isDisabled}
              onInputChange={(data, singleData) =>
                onMultiSelectVersionMaster(data, singleData, VERSION_TYPE.IOS)
              }
              optionData={iosVersionList}
              defaultData={selectedIosVersionMaster}
              backgroundColor="#09a6e0"
              classes="remove-seperator-span-padding modified-settings"
            />
          </Form.Group>

          {selectedIosVersionMaster &&
            selectedIosVersionMaster.length > 0 &&
            iosCodePushVersionList &&
            iosCodePushVersionList.length > 0 && (
              <Form.Group as={Col} controlId="iosVersionList">
                <Form.Label>IOS Codepush Version</Form.Label>

                <CustomReactSelect
                  isDisabled={isDisabled}
                  onInputChange={(data, singleData) =>
                    onMultiSelectVersion(data, singleData, VERSION_TYPE.IOS)
                  }
                  optionData={iosCodePushVersionList}
                  defaultData={selectedIosVersion}
                  backgroundColor="#09a6e0"
                  classes="remove-seperator-span-padding modified-settings"
                />
              </Form.Group>
            )}
        </div>
        <div className="d-flex gap-2">
          <Form.Group as={Col} controlId="androidVersionList">
            <Form.Label>Android Versions</Form.Label>

            <CustomReactSelect
              isDisabled={isDisabled}
              onInputChange={(data, singleData) =>
                onMultiSelectVersionMaster(
                  data,
                  singleData,
                  VERSION_TYPE.ANDROID
                )
              }
              optionData={androidVersionsList}
              defaultData={selectedAndroidVersionMaster}
              backgroundColor="#09a6e0"
              classes="remove-seperator-span-padding modified-settings"
            />
          </Form.Group>

          {selectedAndroidVersionMaster &&
            selectedAndroidVersionMaster.length > 0 &&
            androidCodePushVersionList &&
            androidCodePushVersionList.length > 0 && (
              <Form.Group as={Col} controlId="androidVersionList">
                <Form.Label>Android Codepush Version</Form.Label>

                <CustomReactSelect
                  isDisabled={isDisabled}
                  onInputChange={(data, singleData) =>
                    onMultiSelectVersion(data, singleData, VERSION_TYPE.ANDROID)
                  }
                  optionData={androidCodePushVersionList}
                  defaultData={selectedAndroidVersion}
                  backgroundColor="#09a6e0"
                  classes="remove-seperator-span-padding modified-settings"
                />
              </Form.Group>
            )}
        </div>
        <div className="d-flex flex-row gap-2">
          {!isDisabled && (
            <Button
              variant="success"
              type="submit"
              className="mt-3 modal-btn"
              disabled={isInvalidBackendVersion}>
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          )}
          <Button
            variant="light"
            className="mt-3 modal-btn"
            onClick={() => history(Routes.BackendVersionList.path)}>
            Back
          </Button>
        </div>
      </Container>
    </Form>
  );
};

export default NewBackendVersion;
