/**
 * Component to render the Financial Details
 */
import {Card, Col, Form, Row} from '@themesberg/react-bootstrap';
import {SidebarFinancialIcon} from '@/assets/icons';
import {useTranslation} from 'react-i18next';
import NumberFormat from 'react-number-format';
import React from 'react';
import InputForm from './children/InputForm';

const ProfileFinancialDetails = ({
  isView,
  myProfileData,
  financialDetails,
  errors,
  onFinancialDetailsChange,
  isApplicant,
}) => {
  const {panError, aadharError} = errors;
  const {panNumber, aadharNumber} = financialDetails;
  const {t} = useTranslation(['myProfile']);
  /**
   * Capture the value and call the callback function to update the value
   * @param {*} e
   * @param {String} type
   */
  const onValueChange = (e, type) => {
    let value;
    let name;
    if (type === 'aadhar') {
      value = e.value;
      name = 'aadharNumber';
    } else {
      value = e.target.value;
      name = e.target.name;
    }
    onFinancialDetailsChange(name, value);
  };
  return (
    <>
      {' '}
      <Row>
        <Col className="item h-auto">
          <div className="d-flex align-items-center flex-row title  ">
            <SidebarFinancialIcon fill="#28252e" width="20" height="20" />
            <span>{t('financialInformation')} :</span>
          </div>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3 financial">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('panNumber')}
                    className="input-sm"
                    lablevalue={myProfileData.panNumber}
                    type="text"
                    isView={isView}
                    isInvalid={panError}
                    required={isApplicant ? true : false}
                    warningText={'Please enter valid PAN'}
                    ipValue={panNumber}
                    name="panNumber"
                    onChange={(e) => onValueChange(e, 'pan')}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  {isView ? (
                    <div>
                      <p className="p-0 roboto-regular-14 mb-1">
                        {' '}
                        {t('aadharNumber')}:
                      </p>
                      <h6 className="roboto-medium-14 ">
                        {myProfileData?.aadharNumber
                          ? myProfileData?.aadharNumber
                          : 'Information not available'}
                      </h6>
                    </div>
                  ) : (
                    <>
                      <Form.Label>
                        {/* <span className="patient-color">*</span> */}
                        {t('aadharNumber')}
                      </Form.Label>
                      <div
                        className={`${
                          aadharError
                            ? 'input-normal-custom-error'
                            : 'input-normal-custom'
                        }`}>
                        <NumberFormat
                          label={t('aadharNumber')}
                          required={false}
                          name="aadharNumber"
                          className="input-sm"
                          id="aadharNumber"
                          placeholder="0000-0000-0000"
                          value={aadharNumber}
                          onValueChange={(e) => onValueChange(e, 'aadhar')}
                          format="####-####-####"
                        />
                      </div>
                      {errors.aadharError && (
                        <div className="invalid-feedback-custom">
                          Please enter valid AADHAAR Number
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProfileFinancialDetails;
