import {
  SECURE_TOKEN,
  TARGET,
  DIRECT_PATH,
  SELECTED_ROLE_NAME,
} from '../../constants';
import React, {useState} from 'react';
import {secureLocalStorage} from '../../services/web.storage';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../redux/redux-hooks';
import {Routes} from '../../routes';
import {
  acknowledgeRebatePaid,
  acknowledgeSubventionPaid,
} from '../../actions/mangoExecutiveActions';

const SecuredSubventionRebate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isCompleted, setisCompleted] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [content, setcontent] = useState('Executed Successfully');
  const selectedRole = secureLocalStorage.getItem(SELECTED_ROLE_NAME);

  /* This is a `useEffect` hook that runs only once when the component mounts. It first tries to retrieve
`TARGET` and `SECURE_TOKEN` from secure local storage. If both values are present, it sets up two
callback functions `onSuccessCallBack` and `onFaliurCallback`. It then uses a switch statement to
call the appropriate action creator function (`acknowledgeSubventionPaid` or
`acknowledgeRebatePaid`) with the `token` and the two callback functions as arguments. If `TARGET`
is not present or an error occurs, it removes `TARGET` and `SECURE_TOKEN` from secure local storage.
If `TARGET` and `SECURE_TOKEN` are not present, it removes `DIRECT_PATH` from local storage and
redirects the user to the appropriate home page based on their selected role. Finally, it returns a
cleanup function that removes `TARGET` and `SECURE_TOKEN` from secure local storage. */
  useEffect(() => {
    try {
      const target = secureLocalStorage.getItem(TARGET);
      const token = secureLocalStorage.getItem(SECURE_TOKEN);
      if (target && token) {
        const onSuccessCallBack = (response) => {
          if (response.status) {
            setisSuccess(true);
            setcontent(response.message);
          }
          setisCompleted(true);
        };
        const onFaliurCallback = () => {
          setisSuccess(false);
          setcontent(
            'We apologize, something went wrong and we could not connect to the API. Please try again later.'
          );
          setisCompleted(true);
        };
        switch (target) {
          case 'acknowledge-subvention-paid': {
            dispatch(
              acknowledgeSubventionPaid(
                token,
                onSuccessCallBack,
                onFaliurCallback
              )
            );
            break;
          }
          case 'acknowledge-rebate-paid': {
            dispatch(
              acknowledgeRebatePaid(token, onSuccessCallBack, onFaliurCallback)
            );
            break;
          }
          default: {
            secureLocalStorage.removeItem(TARGET);
            secureLocalStorage.removeItem(SECURE_TOKEN);
            break;
          }
        }
      } else {
        localStorage.removeItem(DIRECT_PATH);
        if (selectedRole === 'mango_executive')
          navigate(Routes.MangoExecutivePatients.path);
        else if (selectedRole === 'finance')
          navigate(Routes.FinancePatients.path);
        else navigate('/');
      }
    } catch (error) {
      secureLocalStorage.removeItem(TARGET);
      secureLocalStorage.removeItem(SECURE_TOKEN);
    }
    return () => {
      secureLocalStorage.removeItem(TARGET);
      secureLocalStorage.removeItem(SECURE_TOKEN);
    };
  }, []);

  /* This `useEffect` hook is setting up a timer that will redirect the user to the appropriate home
 page based on their selected role after 5 seconds if `isCompleted` is true. It is dependent on the
 `isCompleted` state variable, so it will only run when `isCompleted` changes. */
  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        if (selectedRole === 'mango_executive')
          navigate(Routes.MangoExecutivePatients.path);
        else if (selectedRole === 'finance')
          navigate(Routes.FinancePatients.path);
        else navigate('/');
      }, 5000);
    }
  }, [isCompleted]);

  if (!isCompleted) {
    return (
      <div className="secured-page">
        <div className="card">
          <div className="content-data">
            <p>
              Please wait, don&apos;t refresh the page as we are processing your
              request.
            </p>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="secured-page">
        <div className={isSuccess ? 'card card-success' : 'card card-failure'}>
          <div className="icon">
            <i className="checkmark">{isSuccess ? '✓' : '✗'}</i>
          </div>
          <div className="content-data">
            <h1>{isSuccess ? 'Success' : 'Failed'}</h1>
            <p>{`${content}. Redirecting to home page.`}</p>
          </div>
        </div>
      </div>
    );
};

export default SecuredSubventionRebate;
