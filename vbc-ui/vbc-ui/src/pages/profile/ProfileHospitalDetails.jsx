/**
 * Component handles the rendering the Hospital Details
 */
import {Card, Col, Row} from '@themesberg/react-bootstrap';
import {HospitalDetailIcon} from '@/assets/icons';
import React, {useEffect, useState} from 'react';
import InputForm from './children/InputForm';
import {useTranslation} from 'react-i18next';
import {drugsList, hospitalsList, doctorsList} from '@/actions';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  captalizeEveryWordOfSentence,
  capitalizeFirstLetter,
} from '@/services/utility';

const ProfileHospitalDetails = ({
  isView,
  myProfileData,
  hospitalDetails,
  masterData,
  isPatient,
  isTreatmentStarted,
  onHospitalDetailsChange,
}) => {
  const {t} = useTranslation(['myProfile']);
  const dispatch = useAppDispatch();
  const {diagnosis, doctorId, drugId, hospitalId, mrn} = hospitalDetails;
  const [drugOptions, setDrugOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const drugList = useAppSelector((state) => state.template.drugList);
  const doctorList = useAppSelector((state) => state.template.doctorList);
  const hospitalList = useAppSelector((state) => state.template.hospitalList);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * drugsList Action to get drugList array if druglist have data, new fetched data will be appended
   * to state
   */
  useEffect(() => {
    if (isPatient && !isView) {
      // console.log('IS VIEW=>', drugList);
      if (!drugList) {
        dispatch(drugsList());
      } else {
        const selectedDrug = myProfileData?.drug;
        if (selectedDrug) {
          const requiredDrug = drugList.filter(
            (drug) => drug.visible || drug.id === selectedDrug.id
          );

          const selectedDiagnosisObj = masterData?.cancerTypes.filter(
            (a) => a.name === diagnosis
          );

          const selectedId =
            (selectedDiagnosisObj &&
              selectedDiagnosisObj.length > 0 &&
              selectedDiagnosisObj[0].id) ||
            null;

          const list = requiredDrug.filter((a) => a.cancerTypeId == selectedId);

          setDrugOptions(
            list.map((drug) => ({
              label: `${drug.brandName}-${drug.drugGenericName}`,
              value: drug.id,
              cancerTypeId: drug.cancerTypeId,
            }))
          );
        }
      }
    }
  }, [dispatch, drugList, isPatient, isView]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * doctorsList Action to get doctorsList array
   */
  useEffect(() => {
    if (hospitalId) {
      dispatch(doctorsList(hospitalId));
    }
  }, [dispatch, hospitalId]);

  /**
   * If doctor list have data it is set to state with label value property
   */
  useEffect(() => {
    if (doctorList) {
      const reqDoctorsList = doctorList.map((doc, index) => {
        return {
          id: index,
          label: doc.name,
          value: doc.id,
        };
      });
      setDoctorOptions(reqDoctorsList);
    }
  }, [doctorList]);

  /**
   * if hospital is not, hospitalsList is dispatched
   * else set to state
   */
  useEffect(() => {
    if (isPatient && !isView) {
      if (!hospitalList) {
        dispatch(hospitalsList());
      } else {
        setHospitalOptions(
          hospitalList.map((hospital) => ({
            label: hospital.hospitalName,
            value: hospital.id,
          }))
        );
      }
    }
  }, [dispatch, hospitalList, isPatient, isView]);

  /**
   * Capture the value and call the callback function to update the value
   * @param {*} e
   *
   */
  const onValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onHospitalDetailsChange(name, value);
  };

  /**
   * This function used for filter drug list based on cancerTypeId
   * user out after a delay.
   */
  const handleChangeDiagnosis = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    onHospitalDetailsChange(name, value);

    const selectedDiagnosisObj = masterData?.cancerTypes.filter(
      (a) => a.name === value
    );

    const selectedId =
      (selectedDiagnosisObj &&
        selectedDiagnosisObj.length > 0 &&
        selectedDiagnosisObj[0].id) ||
      null;

    const selectedDrug = myProfileData?.drug;
    if (selectedDrug) {
      const requiredDrug = drugList.filter(
        (drug) => drug.visible || drug.id === selectedDrug.id
      );

      const list = requiredDrug.filter((a) => a.cancerTypeId == selectedId);

      setDrugOptions(
        list &&
          list.map(
            (drug) =>
              ({
                label: `${drug.brandName}-${drug.drugGenericName}`,
                value: drug.id,
                cancerTypeId: drug.cancerTypeId,
              } || [])
          )
      );
    }
  };

  console.log(diagnosis);
  return (
    <>
      <Row>
        <Col className="item h-auto">
          <div className="d-flex align-items-center flex-row title  ">
            <HospitalDetailIcon fill="#28252e" width="20" height="20" />
            <span>{t('hospitalDetails')}:</span>
          </div>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('typeofCancer')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.diagnosis
                    )}
                    type="select"
                    isView={isView}
                    ipValue={diagnosis}
                    name="diagnosis"
                    onChange={handleChangeDiagnosis}
                    options={
                      masterData?.cancerTypes
                        ? masterData?.cancerTypes.map(({id, name}) => ({
                            id: id,
                            label: name,
                            value: name,
                          }))
                        : []
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('drugName')}
                    lablevalue={`${capitalizeFirstLetter(
                      myProfileData.drug.brandName
                    )} (${myProfileData?.drug.drugGenericName?.toLowerCase()})`}
                    type="select"
                    isView={isView}
                    ipValue={drugId}
                    readOnly={isTreatmentStarted}
                    name="drugId"
                    onChange={onValueChange}
                    options={drugOptions}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('hospitalName')}
                    lablevalue={myProfileData.hospital.hospitalName}
                    type="select"
                    readOnly={isTreatmentStarted}
                    isView={isView}
                    ipValue={hospitalId}
                    name="hospitalId"
                    onChange={onValueChange}
                    options={hospitalOptions}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('doctorName')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.doctor.name
                    )}
                    type="select"
                    isView={isView}
                    readOnly={isTreatmentStarted}
                    ipValue={doctorId}
                    name="doctorId"
                    onChange={onValueChange}
                    options={doctorOptions}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('medicalRecordNumber')}
                    lablevalue={myProfileData.mrn}
                    type="text"
                    isView={isView}
                    ipValue={mrn}
                    name="mrn"
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

export default ProfileHospitalDetails;
