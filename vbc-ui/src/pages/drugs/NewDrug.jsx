/**
 * This Component renders a Form to Create a new Medication or Update a existing Medication.
 * This Component gets showDrug, drug, manufacturersList, readManufacturers
 * from Redux as props and  match, history is mapped to props
 * which is used to navigate and get url details.
 * This component reads the Medication id if it is present in url and retrieve the Medication
 * details with Medication id and allow the user to edit
 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Container} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {allManufacturers, getMasterData} from '../../actions/templateActions';
import {
  createDrug,
  showDrug,
  updateDrug,
  readDrugs,
} from '../../actions/drugActions';
import {Routes} from '@/routes';
import {setToast} from '@/actions/appActions';
import PropTypes from 'prop-types';

import {actionTypes} from '@/constants/actionTypes';
import InputForm from '@/pages/profile/children/InputForm';
import GoBack from '@/components/GoBack';
import {Can} from '@/components';
import RoutePage from '@/components/RoutePage';
import LenderDrugMapping from '@/components/LenderDrugMapping';
import {
  tableDrugLenderConfig,
  tableDrugLenderConfigView,
} from '@/config/lenderDrugMapping';
import {readLenders} from '@/actions';
import {getDrugLenderReqData, isArrayLengthEqual} from '@/services/utility';
import {ALERT_MESSAGE, CANCER_TYPES} from '../../constants';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
const {SET_CREATE_DRUG, SET_UPDATE_DRUG} = actionTypes;

const NewDrug = (props) => {
  const {showDrug, drug, manufacturer, allManufacturers} = props;
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const [drugGenericName, setDrugGenericName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [drugMolecule, setDrugMolecule] = useState('');
  const [drugForm, setDrugForm] = useState('');
  const [drugStrength, setDrugStrength] = useState('');
  const [ndcCode, setNdcCode] = useState('');
  const [snomedIndiaDrugCode, setSnomedIndiaDrugCode] = useState('');
  const [indications, setIndications] = useState('');
  const [contraindications, setContraindications] = useState('');
  const [adverseReactions, setAdverseReactions] = useState('');
  const [drugInteractions, setDrugInteractions] = useState('');
  const [useInSpecificPopulations, setUseInSpecificPopulations] = useState('');
  const [pregnancyIndicator, setPregnancyIndicator] = useState('');
  const [breastfeedingIndicator, setBreastfeedingIndicator] = useState('');
  const [pharmacokinetics, setPharmacokinetics] = useState('');
  const [pharmacodynamics, setPharmacodynamics] = useState('');
  const [drugToFoodInteraction, setDrugToFoodInteraction] = useState('');
  const [drugToHerbalInteraction, setDrugToHerbalInteraction] = useState('');
  const [drugtoLabInteraction, setDrugtoLabInteraction] = useState('');
  const [drugToDiagnosisIndicator, setDrugToDiagnosisIndicator] = useState('');
  const [biomarkerName, setBiomarkerName] = useState('');
  const [biomarkerStatus, setBiomarkerStatus] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [totalTreatmentCycles, setTotalTreatmentCycles] = useState('');
  const [noOfDaysInCycle, setNoOfDaysInCycle] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [cancerTypeId, setCancerTypeId] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [gstPercentage, setGstPercentage] = useState('');
  const [priceStartDate, setPriceStartDate] = useState('');
  const [priceEndDate, setPriceEndDate] = useState('');
  const [retrospectiveFlag, setRetrospectiveFlag] = useState('');
  const [visible, setvisible] = useState(false);
  const [isView, setisView] = useState(false);
  const [drugLenderData, setdrugLenderData] = useState([]);
  const [lenderList, setlenderList] = useState([]);
  const lenders = useAppSelector((state) => state.lenders.usersList);
  const masterData = useAppSelector((state) => state.template.masterData);
  const drug_id = urlParams.id;
  const stateRecieved = location.state;

  /** The below code is using the `useEffect` hook in a React component to dispatch an action to read
 lenders with a limit of 99999 and an offset of 0. The `useEffect` hook is also used with an empty
 dependency array `[]` to ensure that the action is only dispatched once when the component mounts. */
  useEffect(() => {
    dispatch(readLenders(0, 99999));
  }, []);
  /** The beloq code is using the `useEffect` hook in a React component to update the `lenderList` state
variable based on changes to the `lenders` prop. If the `lenders` prop is not null or undefined, it
maps over the array of lenders and creates a new array of objects with `id`, `label`, and `value`
properties based on the `lenderId` and `lenderName` properties of each lender object. The resulting
array is then set as the new value of the `lenderList` state variable. */
  useEffect(() => {
    if (lenders)
      setlenderList(
        lenders.map((lender) => ({
          id: lender.lenderId,
          label: lender.lenderName,
          value: lender.lenderId,
        }))
      );
  }, [lenders]);

  /**
   * This Callback will set drug details to corresponding
   * states if drug and drug id is not null else it will
   * set all states empty
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === 'View Details') setisView(true);
    if (drug && drug_id) {
      setDrugGenericName(drug.drugGenericName);
      setBrandName(drug.brandName);
      setDrugMolecule(drug.drugMolecule);
      setDrugForm(drug.drugForm);
      setDrugStrength(drug.drugStrength);
      setNdcCode(drug.ndcCode);
      setSnomedIndiaDrugCode(drug.snomedIndiaDrugCode);
      setIndications(drug.indications);
      setContraindications(drug.contraindications);
      setAdverseReactions(drug.adverseReactions);
      setDrugInteractions(drug.drugInteractions);
      setUseInSpecificPopulations(drug.useInSpecificPopulations);
      setPregnancyIndicator(drug.pregnancyIndicator);
      setBreastfeedingIndicator(drug.breastfeedingIndicator);
      setPharmacokinetics(drug.pharmacokinetics);
      setPharmacodynamics(drug.pharmacodynamics);
      setDrugToFoodInteraction(drug.drugToFoodInteraction);
      setDrugToHerbalInteraction(drug.drugToHerbalInteraction);
      setDrugtoLabInteraction(drug.drugtoLabInteraction);
      setDrugToDiagnosisIndicator(drug.drugToDiagnosisIndicator);
      setBiomarkerName(drug.biomarkerName);
      setBiomarkerStatus(drug.biomarkerStatus);
      setDiagnosis(drug.diagnosis);
      setTotalTreatmentCycles(drug.totalTreatmentCycles);
      setNoOfDaysInCycle(drug.noOfDaysInCycle);
      setManufacturerId(drug.manufacturerId);
      setCostPrice(drug.costPrice);
      setSellingPrice(drug.sellingPrice);
      setGstPercentage(drug.gstPercentage);
      setPriceStartDate(drug.priceStartDate);
      setPriceEndDate(drug.priceEndDate);
      setRetrospectiveFlag(drug.retrospectiveFlag);
      setvisible(drug?.visible);
      setCancerTypeId(drug?.cancerTypeId);
    } else {
      setDrugGenericName('');
      setBrandName('');
      setDrugMolecule('');
      setDrugForm('');
      setDrugStrength('');
      setNdcCode('');
      setSnomedIndiaDrugCode('');
      setIndications('');
      setContraindications('');
      setAdverseReactions('');
      setDrugInteractions('');
      setUseInSpecificPopulations('');
      setPregnancyIndicator('');
      setBreastfeedingIndicator('');
      setPharmacokinetics('');
      setPharmacodynamics('');
      setDrugToFoodInteraction('');
      setDrugToHerbalInteraction('');
      setDrugtoLabInteraction('');
      setDrugToDiagnosisIndicator('');
      setBiomarkerName('');
      setBiomarkerStatus('');
      setDiagnosis('');
      setTotalTreatmentCycles('');
      setNoOfDaysInCycle('');
      setManufacturerId('');
      setCostPrice('');
      setSellingPrice('');
      setGstPercentage('');
      setPriceStartDate('');
      setPriceEndDate('');
      setRetrospectiveFlag('');
      setCancerTypeId('');
    }
  }, [drug, drug_id, stateRecieved]);
  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * showDrug Action if drug_id is not null to get
   * drug
   */
  useEffect(() => {
    if (drug_id) {
      showDrug(drug_id);
    }
  }, [drug_id, showDrug]);

  /**
   * Submits the user entered details to the api,
   * if drug id is null it will create drug or this will update
   * the existing drug with drug id
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      drugGenericName: drugGenericName,
      brandName: brandName,
      drugMolecule: drugMolecule,
      drugForm: drugForm,
      drugStrength: drugStrength,
      ndcCode: ndcCode,
      snomedIndiaDrugCode: snomedIndiaDrugCode,
      indications: indications,
      contraindications: contraindications,
      adverseReactions: adverseReactions,
      drugInteractions: drugInteractions,
      useInSpecificPopulations: useInSpecificPopulations,
      pregnancyIndicator: pregnancyIndicator,
      breastfeedingIndicator: breastfeedingIndicator,
      pharmacokinetics: pharmacokinetics,
      pharmacodynamics: pharmacodynamics,
      drugToFoodInteraction: drugToFoodInteraction,
      drugToHerbalInteraction: drugToHerbalInteraction,
      drugtoLabInteraction: drugtoLabInteraction,
      drugToDiagnosisIndicator: drugToDiagnosisIndicator,
      biomarkerName: biomarkerName,
      biomarkerStatus: biomarkerStatus,
      diagnosis: diagnosis,
      totalTreatmentCycles: totalTreatmentCycles,
      noOfDaysInCycle: noOfDaysInCycle,
      manufacturerId: manufacturerId,
      costPrice: costPrice,
      sellingPrice: sellingPrice,
      gstPercentage: gstPercentage,
      priceStartDate: priceStartDate,
      priceEndDate: priceEndDate,
      retrospectiveFlag: retrospectiveFlag,
      visible: visible,
      cancerTypeId: parseInt(cancerTypeId),
    };
    data['lenderDrugGrantSet'] = getDrugLenderReqData(
      drugLenderData,
      'lenderId',
      drug_id,
      'drugId'
    );
    if (!isArrayLengthEqual(data?.lenderDrugGrantSet, lenderList)) {
      dispatch(
        setToast(
          ALERT_MESSAGE.ALL_GRANT_LENDER_DATA_NOT_PRESENT,
          true,
          'warning'
        )
      );
      return;
    }
    if (drug_id) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        history(Routes.Drugs.path);
        readDrugs();
        return {
          type: SET_UPDATE_DRUG,
          payload: response.data,
        };
      };

      props.updateDrug(drug_id, data, onSuccess);
    } else {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        history(Routes.Drugs.path);
        readDrugs();
        return {
          type: SET_CREATE_DRUG,
          payload: response.data,
        };
      };
      // console.log('DATA=>', data);

      props.createDrug(data, onSuccess);
    }
  };
  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * readManufacturers Action to get manufacturersList
   * array
   */
  useEffect(() => {
    if (!manufacturer) {
      allManufacturers();
    }
  }, [manufacturer, allManufacturers]);

  useEffect(() => {
    if (!masterData) dispatch(getMasterData(CANCER_TYPES));
  }, [masterData]);
  /**
   * The function takes an array of manufacturer data and returns an array of objects with specific
   * properties.
   * @returns The function `getManufacturerData` returns an array of objects with `id`, `label`, and
   * `value` properties. The values of these properties are obtained from the `manufacturer` array passed
   * as an argument to the function. If the `manufacturer` array is empty or falsy, an empty array is
   * returned.
   * @param {Array} manufacturer
   */
  const getManufacturerData = (manufacturer) => {
    let optionData = [];
    if (manufacturer && manufacturer.length > 0) {
      optionData = manufacturer.map((data) => {
        return {
          id: data?.id,
          label: data?.manufacturerName,
          value: data?.id,
        };
      });
    }
    return optionData;
  };
  // const getDiagnosisData = (diagnosisData) => {
  //   let optionData = [];
  //   if (diagnosisData && diagnosisData.length > 0) {
  //     optionData = diagnosisData.map((data) => {
  //       return {
  //         id: data?.id,
  //         label: data?.name,
  //         value: data?.name,
  //       };
  //     });
  //   }
  //   return optionData;
  // };

  /**
   * This function adds new data to an array and updates the state, then calls a callback function.
   * @param {Object} data
   * @param {Function} callback
   */
  const onAddDrugLender = (data, callback) => {
    const newData = [...drugLenderData];
    newData.push(data);
    setdrugLenderData(newData);
    callback();
  };

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>
          {drug_id && isView
            ? 'View Medication'
            : drug_id
            ? 'Update Medication'
            : 'Create Medication'}
        </h3>
        <form onSubmit={handleSubmit}>
          <h5>Medication Details</h5>
          <Row className="pb-0 pt-0">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Brand Name'}
                ipValue={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
                warningText={'Brand Name is required'}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication Molecule'}
                ipValue={drugMolecule}
                onChange={(e) => setDrugMolecule(e.target.value)}
                required
                warningText={'Medication Molecule is required'}
                type="text"
              />
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication Form'}
                ipValue={drugForm}
                onChange={(e) => setDrugForm(e.target.value)}
                required
                warningText={'Medication Form is required'}
                type="text"
              />
            </Col>
          </Row>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Manufacturer'}
                ipValue={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                required
                warningText={'Manufacturer is required'}
                type="select"
                options={getManufacturerData(manufacturer)}
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication Generic Name'}
                ipValue={drugGenericName}
                onChange={(e) => setDrugGenericName(e.target.value)}
                required
                warningText={'Medication Generic Name is required'}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication Strength'}
                ipValue={drugStrength}
                onChange={(e) => setDrugStrength(e.target.value)}
                required
                warningText={'Medication Strength is required'}
                type="text"
              />
            </Col>
          </Row>
          <h5>Generic Details</h5>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Ndc Code'}
                ipValue={ndcCode}
                required={false}
                onChange={(e) => setNdcCode(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Snomed India Medication Code'}
                ipValue={snomedIndiaDrugCode}
                required={false}
                onChange={(e) => setSnomedIndiaDrugCode(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Indications'}
                ipValue={indications}
                required
                onChange={(e) => setIndications(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Contraindications'}
                ipValue={contraindications}
                required
                onChange={(e) => setContraindications(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Adverse Reactions'}
                ipValue={adverseReactions}
                required={false}
                onChange={(e) => setAdverseReactions(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication Interactions'}
                ipValue={drugInteractions}
                required={false}
                onChange={(e) => setDrugInteractions(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Use In Specific Populations'}
                ipValue={useInSpecificPopulations}
                required={false}
                onChange={(e) => setUseInSpecificPopulations(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Pregnancy Indicator'}
                ipValue={pregnancyIndicator}
                required={false}
                onChange={(e) => setPregnancyIndicator(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Breastfeeding Indicator'}
                ipValue={breastfeedingIndicator}
                required={false}
                onChange={(e) => setBreastfeedingIndicator(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Pharma co-Kinetics'}
                ipValue={pharmacokinetics}
                required={false}
                onChange={(e) => setPharmacokinetics(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Pharma co-Dynamics'}
                ipValue={pharmacodynamics}
                required={false}
                onChange={(e) => setPharmacodynamics(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication To Food Interaction'}
                ipValue={drugToFoodInteraction}
                required={false}
                onChange={(e) => setDrugToFoodInteraction(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication To Herbal Interaction'}
                ipValue={drugToHerbalInteraction}
                required={false}
                onChange={(e) => setDrugToHerbalInteraction(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication To Lab Interaction'}
                ipValue={drugtoLabInteraction}
                required={false}
                onChange={(e) => setDrugtoLabInteraction(e.target.value)}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Medication To Diagnosis Indicator'}
                ipValue={drugToDiagnosisIndicator}
                required={false}
                onChange={(e) => setDrugToDiagnosisIndicator(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <h5>Medication Prescription Biomarker</h5>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Biomarker Name'}
                ipValue={biomarkerName}
                onChange={(e) => setBiomarkerName(e.target.value)}
                required
                warningText={'Biomarker Name is required'}
                type="text"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Biomarker Status'}
                ipValue={biomarkerStatus}
                onChange={(e) => setBiomarkerStatus(e.target.value)}
                required
                warningText={'Biomarker Status is required'}
                type="text"
              />
            </Col>
          </Row>
          <h5>Medication Prescription Info</h5>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Diagnosis'}
                ipValue={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                warningText={'Diagnosis is required'}
                type="text"
              />
              <Col>
                <InputForm
                  readOnly={isView}
                  isView={false}
                  label={'Cancer Type'}
                  ipValue={cancerTypeId}
                  onChange={(e) => setCancerTypeId(e.target.value)}
                  required
                  warningText={'Cancer Type is required'}
                  type="select"
                  options={
                    (masterData?.cancerTypes &&
                      masterData?.cancerTypes.length > 0 &&
                      masterData?.cancerTypes.map((item) => {
                        return {
                          id: item.id,
                          label: item.name,
                          value: item.id,
                        };
                      })) ||
                    []
                  }
                />
              </Col>
              {/* 
              Commenting this code for now, if select box needed this needs to be used
              <InputForm
               readOnly={isView}
                isView={false}
                label={'Diagnosis'}
                ipValue={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                warningText={'Diagnosis is required'}
                type="select"
                options={getDiagnosisData(masterData?.cancerTypes)}
              /> */}
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Total Treatment Cycles'}
                ipValue={totalTreatmentCycles}
                onChange={(e) => setTotalTreatmentCycles(e.target.value)}
                required
                warningText={'Total Treatment Cycles is required'}
                type="number"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'No Of Days In Cycle'}
                ipValue={noOfDaysInCycle}
                onChange={(e) => setNoOfDaysInCycle(e.target.value)}
                required
                warningText={'No Of Days In Cycle is required'}
                type="number"
              />
            </Col>
          </Row>

          <h5>Medication Pricing Info</h5>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Cost Price'}
                ipValue={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                required
                warningText={'Cost Price is required'}
                type="number"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Selling Price(MRP)'}
                ipValue={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                required
                warningText={'Selling Price is required'}
                type="number"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'GST percentage'}
                ipValue={gstPercentage}
                onChange={(e) => setGstPercentage(e.target.value)}
                required
                warningText={'GST percentage is required'}
                type="number"
              />
            </Col>
          </Row>
          <Row className="pb-0 pt-0 ">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Price Start Date'}
                ipValue={priceStartDate}
                onChange={(e) => setPriceStartDate(e.target.value)}
                required
                warningText={'Price Start Date is required'}
                type="date"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Price End Date'}
                ipValue={priceEndDate}
                onChange={(e) => setPriceEndDate(e.target.value)}
                required
                warningText={'Price End Date is required'}
                type="date"
              />
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
                readOnly={isView}
                isView={false}
                label={'Retrospective Flag'}
                ipValue={retrospectiveFlag}
                onChange={(e) => setRetrospectiveFlag(e.target.value)}
                required
                warningText={'Retrospective Flag is required'}
                type="text"
              />
            </Col>
            {/* <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <InputForm
               readOnly={isView}
                isView={false}
                label={
                  <>
                    <span>Medication Active Flag</span>
                    <CustomOverHoverToolTip
                      toolTipText={
                        'Medication can only be enabled after creating the PBP Schedule, by default it will be disabled'
                      }
                      placement="bottom">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        size="xs"
                        className="ms-2"
                      />
                    </CustomOverHoverToolTip>
                  </>
                }
                onChange={(e) =>
                  setvisible(e.target.value === 'true' ? true : false)
                }
                name="visible"
                readOnly={drug_id ? false : true}
                required
                ipValue={visible}
                radioData={YesNoRadioData}
                warningText={'Retrospective Flag is required'}
                type="radio"
              />
            </Col> */}
          </Row>

          <LenderDrugMapping
            apiData={drug_id ? drug : null}
            isView={isView}
            selectLabel={'Lender'}
            tableSelectValue="lenderId"
            selectOptions={lenderList}
            onAddDataClick={onAddDrugLender}
            setTableData={setdrugLenderData}
            tableConfig={
              isView ? tableDrugLenderConfigView : tableDrugLenderConfig
            }
            tableData={drugLenderData}
            containerClasses="px-0"
            cardClasses="p-0"
            addButtonClasses="mt-3"
          />

          <div className="d-flex gap-2 mt-2">
            <GoBack>
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="button">
                Back
              </button>
            </GoBack>

            {isView ? (
              <Can
                performingAction={{
                  component: 'drug-listing',
                  action: 'can view editDetails',
                }}>
                <RoutePage url={Routes.UpdateDrug.path} id={drug_id}>
                  <button
                    className="btn-patient-theme-small bg-dark px-4"
                    type="button"
                    onClick={() => setisView(false)}>
                    Edit
                  </button>
                </RoutePage>
              </Can>
            ) : (
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="submit"
                onSubmit={handleSubmit}>
                {drug_id ? 'Update' : 'Add'}
              </button>
            )}
          </div>
        </form>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => ({
  drugsList: state.drugs.drugsList,
  drug: state.drugs.selectedDrug,
  manufacturer: state.manufacturers.manufacturer,
  masterData: state.template.masterData,
});

const mapDispatchToProps = {
  createDrug,
  showDrug,
  updateDrug,
  allManufacturers,
};

NewDrug.propTypes = {
  drugsList: PropTypes.array,
  createDrug: PropTypes.func,
  showDrug: PropTypes.func,
  updateDrug: PropTypes.func,
  readManufacturers: PropTypes.func,
  drug: PropTypes.object,
  manufacturersList: PropTypes.array,
  masterData: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewDrug);
