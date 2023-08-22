/**
 * This module contains a CustomToast to show toast.
 * <CustomToast
      showToast=> (boolean) to show toast on that page
      message, => (string) to show the message on the toast)
      toastType, => (string) to render type of toast.
    </CustomToast>
 */
import React, {useEffect, useState} from 'react';
import {Toast} from '@themesberg/react-bootstrap';
import {setToast} from '../actions';
import {useAppDispatch} from '@/redux/redux-hooks';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {useNavigate} from 'react-router';

const CustomToast = (props) => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  let {showToast, message, toastType, redirect = ''} = props;
  const [hideToast, setHideToast] = useState(showToast);

  /**
   * This Callback will set the visibilty of the toast
   */
  useEffect(() => {
    setHideToast(showToast);
  }, [showToast, setHideToast]);

  useEffect(() => {
    if (redirect !== '') {
      setTimeout(() => {
        history(redirect);
      }, 2000);
    }
  }, [redirect]);

  /**
   * This funcation dispatchs the toast action to close it
   */
  const toggleShow = () => {
    dispatch(setToast('', false, 'success'));
  };
  const isSuccess = toastType === 'success';
  const isWarning = toastType === 'warning';
  return (
    <React.Fragment>
      <Toast
        show={hideToast}
        onClose={toggleShow}
        className={`${toastType} z-index-modal border-0 bg-transparent`}
        delay={7000}
        data-testid="toast"
        autohide>
        <Toast.Header>
          <strong className="mr-auto d-flex justify-content-center align-items-center">
            {isSuccess && <FontAwesomeIcon icon={faCheckCircle} />}
            {isWarning && <FontAwesomeIcon icon={faExclamationTriangle} />}
            <span className="ms-2">{message}</span>
          </strong>
        </Toast.Header>
      </Toast>
    </React.Fragment>
  );
};
CustomToast.propTypes = {
  showToast: PropTypes.bool,
  message: PropTypes.string,
  toastType: PropTypes.string,
  redirect: PropTypes.string,
};
export default CustomToast;
