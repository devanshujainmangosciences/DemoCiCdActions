/**
 * Component that renders data of addational information which is to be displayed in the ME
 * selectedTab=> Currently selected TAB- 1 for profile, 2 for Bank and 3 for Financial Details,
  profileInfo=> Information related to profile,
  bankingDetails=> Information related to bankDetails,
  financialDetails=> Information related to financial details,
  patientUploadedDocuments=>Information related to uploaded documents
 */
import {Col, Row} from '@themesberg/react-bootstrap';
import React, {useState} from 'react';
import {LabelValue, capitalizeFirstLetter} from '@/services/utility';
import {useTranslation} from 'react-i18next';
import format from 'date-fns/format';
import {DateFormat} from '@/constants';
import {downloadDocument} from '@/actions';
import {useAppDispatch} from '@/redux/redux-hooks';
import groupBy from 'lodash/groupBy';
import PreviewDownloads from '@/components/PreviewDownloads';

const PatientAddationalProfileDetails = ({
  selectedTab,
  profileInfo,
  bankingDetails,
  financialDetails,
  patientUploadedDocuments,
}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation(['patientDetails']);
  const [file, setFile] = useState({});

  /**
   * This Function will fetch the byte format of selected file
   * @param {Any} e
   * @param {Id} documentId
   */
  const download = (e, documentId, documentName) => {
    e.preventDefault();
    const onSuccess = (response) => {
      setFile({
        value: response,
        name: documentName,
      });
    };
    if (documentId) dispatch(downloadDocument(documentId, onSuccess));
  };

  /**
   * Function to render the uploaded documents
   * @param {Array} uploadedDocuments
   * @returns {Element}
   */
  const renderPatientUploadedDocuments = (uploadedDocuments) => {
    const groupByNameDocuments = groupBy(uploadedDocuments, 'documentTypeName');
    // console.log('groupByNameDocuments=>', groupByNameDocuments);
    if (uploadedDocuments && uploadedDocuments.length > 0) {
      return Object.keys(groupByNameDocuments).map((documentTypeName) => (
        <Col
          xxl={3}
          xl={4}
          lg={4}
          md={6}
          className="mb-2"
          key={documentTypeName}>
          <div>
            <div className="d-flex flex-column">
              <p className="p-0 m-0 text-pure-black">{documentTypeName}</p>

              {groupByNameDocuments[documentTypeName].map((document) => (
                <a
                  key={document.id}
                  className="p-0 m-0 fw-medium cancelled-cheque "
                  onClick={(e) =>
                    download(e, document?.id, document?.documentName)
                  }>
                  {document?.documentName ? document.documentName : 'N/A'}
                </a>
              ))}
            </div>
          </div>
        </Col>
      ));
    }
  };

  /**
   * Function to render the selected tab
   * @param {Integer} selectedTab
   * @returns {Element}
   */
  const renderTabData = (selectedTab) => {
    switch (selectedTab) {
      case 1: {
        //Profile Details
        return (
          <>
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('firstName')}
                  value={profileInfo?.firstName}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('middleName')}
                  value={profileInfo?.middleName}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('lastName')}
                  value={profileInfo?.lastName}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('gender')}
                  value={capitalizeFirstLetter(profileInfo?.gender)}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('dateOfBirth')}
                  value={
                    profileInfo?.birthDate
                      ? format(
                          new Date(profileInfo.birthDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      : null
                  }
                />
              </Col>
            </Row>
            <hr />
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('permanentAddress')}
                  value={profileInfo?.permanentAddress}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('country')}
                  value={profileInfo?.permanentCountry}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('state')}
                  value={profileInfo?.permanentState}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('city')}
                  value={profileInfo?.permanentCity}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('pinCode')}
                  value={profileInfo?.permanentPinCode}
                />
              </Col>
            </Row>
            <hr />
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('presentAddress')}
                  value={profileInfo?.presentAddress}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('country')}
                  value={profileInfo?.presentCountry}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('state')}
                  value={profileInfo?.presentState}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('city')}
                  value={profileInfo?.presentCity}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('pinCode')}
                  value={profileInfo?.presentPinCode}
                />
              </Col>
            </Row>
          </>
        );
      }
      case 2: {
        //Bank Details
        return (
          <>
            <PreviewDownloads file={file} setFile={setFile} />
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('bankAccountNumber')}
                  value={bankingDetails?.accountNumber}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('bankName')}
                  value={bankingDetails?.bankName}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('bankBranch')}
                  value={bankingDetails?.bankBranch}
                />
              </Col>
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('bankIfscCode')}
                  value={bankingDetails?.bankIfscCode}
                />
              </Col>
            </Row>
          </>
        );
      }
      case 3: {
        //Financial Details
        return (
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('panNumber')}
                value={financialDetails?.panNumber}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('educationLevel')}
                value={financialDetails?.educationLevel}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('profession')}
                value={financialDetails?.occupation}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('employer')}
                value={financialDetails?.employerName}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('industry')}
                value={financialDetails?.industry}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('designation')}
                value={financialDetails?.designation}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('averageAnnualIncome')}
                value={financialDetails?.selfAnnualIncome}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('anyOtherSource')}
                value={financialDetails?.otherIncomeSource}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('insurance')}
                value={financialDetails?.insurance ? 'Yes' : 'No'}
              />
            </Col>
            {financialDetails?.insurance && (
              <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                <LabelValue
                  label={t('insuranceCompany')}
                  value={financialDetails?.insuranceCompany}
                />
              </Col>
            )}
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('maturityAmount')}
                value={financialDetails?.maturityAmount}
              />
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <LabelValue
                label={t('annualFamilyIncome')}
                value={financialDetails?.familyAnnualIncome}
              />
            </Col>
          </Row>
        );
      }
      case 4: {
        //Bank Details
        return (
          <>
            <PreviewDownloads file={file} setFile={setFile} />
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
              {renderPatientUploadedDocuments(patientUploadedDocuments)}
            </Row>
          </>
        );
      }
      default:
        return null;
    }
  };
  return <>{renderTabData(selectedTab)}</>;
};

export default PatientAddationalProfileDetails;
