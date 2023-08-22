/**
 * This component renders the Address details of the MyProfile Component
 */
import React from 'react';
import {Col, Row, Card, Form} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AddressDetailIconNew} from '@/assets/icons';
import InputForm from './children/InputForm';
import {captalizeEveryWordOfSentence} from '@/services/utility';
const ProfileAddressDetails = ({
  isView,
  myProfileData,
  masterData,
  addressDetails,
  onStateChange,
  isChecked,
  setIsChecked,
  onAddressValueChange,
}) => {
  const {t} = useTranslation(['myProfile']);
  const {
    permanentAddress,
    permanentCity,
    permanentCountry,
    permanentPinCode,
    presentAddress,
    presentCity,
    presentCountry,
    presentPinCode,
    presentState,
    permanentState,
  } = addressDetails;

  /**
   * Capture the value and call the callback function to update the value
   * @param {*} e
   *
   */
  const onValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onAddressValueChange(name, value);
  };

  return (
    <>
      {' '}
      <Row>
        <Col className="item h-auto">
          <div className="d-flex align-items-center flex-row title  ">
            <AddressDetailIconNew fill="#28252e" width="20" height="20" />
            <span>{t('addressDetails')}:</span>
          </div>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('permanentAddress')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.permanentAddress
                    )}
                    type="text"
                    isView={isView}
                    ipValue={permanentAddress}
                    name="permanentAddress"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('country')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.permanentCountry
                    )}
                    type="select"
                    isView={isView}
                    options={
                      masterData?.countries &&
                      masterData?.countries.map(({id, name}) => ({
                        id: id,
                        label: name,
                        value: name,
                      }))
                    }
                    ipValue={permanentCountry}
                    name="permanentCountry"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('state')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.permanentState
                    )}
                    type="select"
                    isView={isView}
                    options={
                      masterData?.states &&
                      masterData?.states.map(({id, name}) => ({
                        id: id,
                        label: name,
                        value: name,
                      }))
                    }
                    ipValue={permanentState}
                    name={'permanentState'}
                    onChange={(e) =>
                      onStateChange(e.target.value, e.target.name)
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('city')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.permanentCity
                    )}
                    type="select"
                    isView={isView}
                    readOnly={!permanentState}
                    options={
                      masterData?.permanentCities
                        ? masterData?.permanentCities.map(({id, name}) => ({
                            id: id,
                            label: name,
                            value: name,
                          }))
                        : [
                            {
                              id: 1,
                              label: 'No cities avaliable!',
                              value: '',
                            },
                          ]
                    }
                    ipValue={permanentCity}
                    name="permanentCity"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('pinCode')}
                    lablevalue={myProfileData.permanentPinCode}
                    type="text"
                    isView={isView}
                    ipValue={permanentPinCode}
                    name="permanentPinCode"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {!isView && (
            <Form.Group>
              <Form.Check
                value={isChecked}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="m-0"
                type="checkbox"
                label={t('clickToCopy')}
              />
            </Form.Group>
          )}
          <Row className=" row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('presentAddress')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.presentAddress
                    )}
                    type="text"
                    isView={isView}
                    ipValue={presentAddress}
                    name="presentAddress"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('country')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.presentCountry
                    )}
                    type="select"
                    isView={isView}
                    options={
                      masterData?.countries
                        ? masterData?.countries.map(({id, name}) => ({
                            id: id,
                            label: name,
                            value: name,
                          }))
                        : []
                    }
                    ipValue={presentCountry}
                    name="presentCountry"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('state')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.presentState
                    )}
                    type="select"
                    isView={isView}
                    options={
                      masterData?.states
                        ? masterData?.states.map(({id, name}) => ({
                            id: id,
                            label: name,
                            value: name,
                          }))
                        : []
                    }
                    ipValue={presentState}
                    name={'presentState'}
                    onChange={(e) =>
                      onStateChange(e.target.value, e.target.name)
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('city')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.presentCity
                    )}
                    type="select"
                    isView={isView}
                    options={
                      masterData?.presentCities
                        ? masterData?.presentCities.map(({id, name}) => ({
                            id: id,
                            label: name,
                            value: name,
                          }))
                        : [
                            {
                              id: 1,
                              label: 'No cities avaliable!',
                              value: '',
                            },
                          ]
                    }
                    ipValue={presentCity}
                    name="presentCity"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('pinCode')}
                    lablevalue={myProfileData.presentPinCode}
                    type="text"
                    isView={isView}
                    ipValue={presentPinCode}
                    name="presentPinCode"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProfileAddressDetails;
