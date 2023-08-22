/**
 * This Component renders Loan Details
 * general and loan Details and imported from data folder and mapped here
 * user can  Cancel loan Request, download Statement, make Payment in this page
 */
import {useTranslation} from 'react-i18next';
import {LoanDetailsData, generalDetails, EmiDetails} from '@/data/loandetails';
import {
  Col,
  Row,
  ButtonGroup,
  Container,
  Card,
} from '@themesberg/react-bootstrap';
import {LoanDetailIcon, EmiIcon} from '@/assets/icons';

export default function LoanDetails() {
  const {t} = useTranslation('loanDetails');
  return (
    <>
      <div className="loan-details">
        <Container>
          <div className="grid">
            {generalDetails.map(({id, label, value, currency}) => (
              <Col key={id}>
                <Card>
                  <Card.Body>
                    {<Row className="mb-2">{label}</Row>}
                    {
                      <Row className="value">
                        {value}
                        {currency && (
                          <span className="patient-color-0">
                            {` ${currency} `}
                          </span>
                        )}
                      </Row>
                    }
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </Container>
        <Container>
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <span className="icon icon-sm icon-gray">
                <LoanDetailIcon fill="#28252e" />
              </span>
              <h4>{t('loanDetails')}</h4>
            </ButtonGroup>
          </div>
          <div className="grid">
            {LoanDetailsData.map(({id, label, value, currency}) => (
              <Col key={id}>
                <Card>
                  <Card.Body>
                    {<Row className="mb-2">{label}</Row>}
                    <Row>
                      <p className="value">{value}</p>
                      {currency && (
                        <p className="patient-color-0">{` ${currency} `}</p>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </Container>
        <Container>
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <span className="icon icon-sm icon-gray">
                <EmiIcon />
              </span>
              <h4>{t('emiDetails')}</h4>
            </ButtonGroup>
          </div>
          <div className="grid">
            {EmiDetails.map(({id, label, value, currency}) => (
              <Col key={id}>
                <Card>
                  <Card.Body>
                    <Row className="em-row">
                      <span>
                        <span> {label} : </span>
                        <span className="price">{value}</span>
                        {currency && (
                          <span className="patient-color-0">
                            {` ${currency} `}
                          </span>
                        )}
                      </span>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </Container>
        <div className="custom-btn-group">
          <button className="btn-border">{t('loanCancellationRequest')}</button>
          <button className="btn-dark">{t('downloadStatement')}</button>
          <button className="btn-primary">{t('makePayment')}</button>
        </div>
      </div>
    </>
  );
}
