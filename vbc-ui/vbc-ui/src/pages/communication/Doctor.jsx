/**
 * This Component renders the email History of Doctor.
 * emailHistory is import from data and Mapped here
 */
import React from 'react';
import {Col, Row, Table, Nav} from '@themesberg/react-bootstrap';
import {ScheduleDataTime, LoanDetailIcon} from '@/assets/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTranslation} from 'react-i18next';
import {faGrin} from '@fortawesome/free-solid-svg-icons/faGrin';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {Form} from '@themesberg/react-bootstrap';
import SelectDoctorOptions from '@/data/doctor';
import {Tab, ButtonGroup} from '@themesberg/react-bootstrap';
import EmailHistory from '@/data/emailHistory';

export default function Doctor() {
  const {t} = useTranslation(['doctor']);
  return (
    <>
      <Row>
        <Col lg={8}>
          <div className="page-container">
            <Row className="w-50 ps-4">
              <div className="btn-toolbar mb-2 mb-md-0 pt-4 ">
                <ButtonGroup>
                  <span className="icon ">
                    <LoanDetailIcon fill="#28252e" />
                  </span>
                  <h4 className="pt-2 ps-3">{t('connectWithYourDoctor')}</h4>
                </ButtonGroup>
              </div>
              <div className="dropdown ps-5 pt-4">
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="font-normal">
                      {t('selectYourDoctor')}
                    </Form.Label>
                    <Form.Select>
                      {SelectDoctorOptions.map(({id, name}) => (
                        <option key={id}>{name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
            </Row>
            <Row className="justify-content-end">
              <Row>
                <Col>
                  <div className="btn-toolbar mt-2 mb-md-0 pt-4 ps-2">
                    <ButtonGroup>
                      <span className="icon icon-sm icon-gray">
                        <LoanDetailIcon fill="#28252e" />
                      </span>
                      <h4 className="ps-3 pt-2">{t('emailHistory')}</h4>
                    </ButtonGroup>
                  </div>
                  <div className="py-3">
                    <Tab.Container defaultActiveKey="home">
                      <Row>
                        <Col lg={11} className="ms-5">
                          <Nav className="nav-tabs">
                            <Nav.Item>
                              <Nav.Link
                                eventKey="home"
                                className="mb-sm-3 mb-md-0">
                                {t('inbox')} (9)
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link
                                eventKey="messages"
                                className="mb-sm-3 mb-md-0">
                                {t('sent')} (10)
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col lg={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="home" className="py-4">
                              <Table>
                                <tbody>
                                  <tr>
                                    <th className="h6 py-3">#</th>
                                    <th className="h6 p-3 ">{t('from')}</th>
                                    <th className="h6 py-3 w-75  ps-6"> </th>
                                    <th className="h6 p-3 w-25">{t('date')}</th>
                                  </tr>
                                  {EmailHistory.map(
                                    ({
                                      id,
                                      From,
                                      Message,
                                      Date,
                                      isAttachment,
                                    }) => (
                                      <tr key={id}>
                                        <td className="p normal-font py-3 ">
                                          {id}
                                        </td>
                                        <td className="p normal-font p-3">
                                          {From}
                                        </td>
                                        <td className="p normal-font py-3 ps-5">
                                          {Message}
                                          {isAttachment && (
                                            <ButtonGroup className="attachment">
                                              <span className="icon icon-sm icon-gray">
                                                <FontAwesomeIcon
                                                  icon={faPaperclip}
                                                />
                                              </span>
                                            </ButtonGroup>
                                          )}
                                        </td>
                                        <td className="">
                                          <span className="normal-dark-font ">
                                            {Date}
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="messages" className="py-4">
                              <Table>
                                <tbody>
                                  <tr>
                                    <th className="h6 py-3">#</th>
                                    <th className="h6 p-3 ">{t('from')}</th>
                                    <th className="h6 py-3 w-75  ps-6"> </th>
                                    <th className="h6 p-3 w-25">{t('date')}</th>
                                  </tr>
                                  {EmailHistory.map(
                                    ({
                                      id,
                                      From,
                                      Message,
                                      Date,
                                      isAttachment,
                                    }) => (
                                      <tr key={id}>
                                        <td className="p normal-font py-3 ">
                                          {id}
                                        </td>
                                        <td className="p normal-font p-3">
                                          {From}
                                        </td>
                                        <td className="p normal-font py-3 ps-5">
                                          {Message}
                                          {isAttachment && (
                                            <ButtonGroup className="attachment">
                                              <span className="icon icon-sm icon-gray">
                                                <FontAwesomeIcon
                                                  icon={faPaperclip}
                                                />
                                              </span>
                                            </ButtonGroup>
                                          )}
                                        </td>
                                        <td className="">
                                          <span className="p normal-dark-font">
                                            {Date}
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                </Col>
              </Row>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <div className="email-container">
            <Row>
              <div className="btn-toolbar mb-2 mb-md-0">
                <ButtonGroup className="d-flex align-item-center">
                  <span className="icon icon-sm icon-gray">
                    <ScheduleDataTime fill="#28252e" />
                  </span>
                  <h6>{t('emailToDoctor')}</h6>
                </ButtonGroup>
              </div>
              <div className="email-box">
                <p className="horizontal-line-text">{t('today')}</p>
                <div className="textarea-container">
                  <textarea
                    placeholder="Type Here"
                    className="doctor-mail-box"
                    name="message"
                    rows="6"
                    cols="40"></textarea>
                </div>
                <hr className="horizontal-line" />
              </div>
              <div className="button-group">
                <div className="mb-1">
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                      <span className="icon icon-sm icon-gray">
                        <FontAwesomeIcon icon={faPaperclip} />
                        <FontAwesomeIcon icon={faCamera} />
                        <FontAwesomeIcon icon={faGrin} />
                      </span>
                    </ButtonGroup>
                  </div>
                </div>
                <div>
                  <button className="primary-button">Send</button>
                </div>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}
