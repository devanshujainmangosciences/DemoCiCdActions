/**
 * Default Add Edit file is used by the NodeJs Script to generate the Admin Componente
 */
import React, {useState, useEffect} from 'react';
import {createData, showData, updateData} from '@/actions';
import GenericAdminAddViewEditComponent from '@/components/GenericAdminAddViewEditComponent';
import {adminComponents} from '../../../constants';
import {dataVariables} from '../../../masterDataConfig';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {Routes} from '@/routes';

const ComponentName = (props) => {
  const dispatch = useAppDispatch();
  const {match, history} = props;
  const [reqData, setReqData] = useState(null);
  const [componentType, setcomponentType] = useState(
    adminComponents.NEW_COMPONENT
  );
  const selectedData = useAppSelector((state) => reduxSelectedData);
  const data_id = match.params.id;
  const path = match?.path;

  useEffect(() => {
    if (path) {
      const newPage = Routes.newPath.path;
      const viewPage = Routes.viewPath.path;
      const updatePage = Routes.updatePath.path;

      if (path === newPage) setcomponentType(adminComponents.NEW_COMPONENT);
      else if (path === viewPage)
        setcomponentType(adminComponents.VIEW_COMPONENT);
      else if (path === updatePage)
        setcomponentType(adminComponents.UPDATE_COMPONENT);
    }
  }, [path, data_id]);

  useEffect(() => {
    if (selectedData && data_id) {
      setReqData(selectedData);
    } else {
      setReqData(null);
    }
  }, [selectedData, data_id]);

  useEffect(() => {
    if (data_id) {
      dispatch(showData(data_id));
    }
  }, [data_id, showData]);

  const onFormSubmit = (reqData) => {
    if (data_id) {
      dispatch(updateData(data_id, reqData));
    } else {
      dispatch(createData(reqData));
    }
    history.push(Routes.listPath.path);
  };

  return (
    <>
      <GenericAdminAddViewEditComponent
        transalation={dataVariables.translation}
        componentType={componentType}
        variables={dataVariables}
        actualData={reqData}
        onFormSubmit={onFormSubmit}
        formClass=""
      />
    </>
  );
};

export default ComponentName;
