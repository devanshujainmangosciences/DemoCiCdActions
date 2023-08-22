/**
 * This component render the application overview details
 */
import React, {useEffect} from 'react';
import {Row, Col, Card} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ApplicationOverviewIcon, BankAccountDetailsIcon} from '@/assets/icons';
import TableComponent from '@/components/Tables';
import {tableHeadersApplicantOverview} from '@/config';
import {getApplicantOverview} from '@/actions';
// import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {DateFormat, PAYMENT_FRAMEWORK_VALUE} from '../constants';
import InputForm from './profile/children/InputForm';
import format from 'date-fns/format';
import {useDispatch, useSelector} from 'react-redux';

const ApplicantOverview = () => {
  const {t} = useTranslation(['applicationOverview']);
  const dispatch = useDispatch();
  const applicantOverview = useSelector(
    (state) => state.applicants.applicantOverview
  );

  /* This is a React hook called `useEffect` that is used to perform side effects in functional
components. In this case, it is used to dispatch an action to get the applicant overview data if it
is not already available in the Redux store. The `useEffect` hook takes two arguments: a function to
be executed and an array of dependencies. The function will be executed when the component mounts
and whenever any of the dependencies in the array change. In this case, the function will be
executed if the `applicantOverview` state is falsy or if the `dispatch` function changes. */
  useEffect(() => {
    if (!applicantOverview) {
      dispatch(getApplicantOverview());
    }
  }, [applicantOverview, dispatch]);

  return (
    <>
      {applicantOverview && (
        <div className="item p-4 mt-4 pb-1 myprofile-container">
          <div className="d-flex flex-row align-items-center title m-0 p-0">
            <ApplicationOverviewIcon fill="#28252e" width="20" height="20" />
            <h4 className="ms-2 mb-0">{t('applicationOverview')}</h4>
          </div>
          <Row>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('modeUsed')}
                    lablevalue={
                      PAYMENT_FRAMEWORK_VALUE[
                        applicantOverview?.paymentTypeOpted || ''
                      ]
                    }
                    type="text"
                    required
                    isView={true}
                    readOnly={true}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('dateOfApplication')}
                    lablevalue={format(
                      new Date(applicantOverview?.dateOfApplication),
                      DateFormat.DD_MM_YYYY_DASH
                    )}
                    type="text"
                    required
                    isView={true}
                    readOnly={true}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('status')}
                    lablevalue={applicantOverview?.loanApplicationStatus || ''}
                    type="text"
                    required
                    isView={true}
                    readOnly={true}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      {applicantOverview && applicantOverview.coApplicants && (
        <div className="item mt-4 p-4">
          <div className="d-flex flex-row align-items-center title m-0 p-0">
            <BankAccountDetailsIcon fill="#28252e" width="20" height="20" />
            <h4 className="ms-2 mb-0">{t('coApplicants')}</h4>
          </div>
          <div className="px-4 mt-3">
            <TableComponent
              component={'applicant-overview-listing'}
              tableHeadersData={tableHeadersApplicantOverview}
              tableData={
                applicantOverview?.coApplicants &&
                applicantOverview?.coApplicants.map((applicant, index) => {
                  return {...applicant, index: index + 1};
                })
              }
              classes={'applicant-overview align-items-center'}
              noCheck
              headerClasses="border-0"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicantOverview;
