/**
 * This module contains a TableComponent to show data in tabular form.
 * <TableComponent
 * tableData
      tableData=> (Array) to show data in tables
      headerClasses, => (classename to add on headers columns)
      noCheck, => (boolean) to render checkbox for bulk actions
      component=> (Array) to show list of steps
      classes, => (classenames to add on table container)
      actionCallback, => (callback) action to be taken on particular row in the data
      tableHeadersData, => config to render headers coulmn and its keys to render coulmn values
    </TableComponent>
 */
import React, {useState, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import Can from './Can';
import {Table, Dropdown} from '@themesberg/react-bootstrap';

const TableComponent = (props) => {
  const {
    tableData,
    tableHeadersData,
    actionCallback,
    classes,
    component,
    noCheck = false,
    headerClasses = 'thead-light',
  } = props;
  const [isAllChecked, setIsAllCheck] = useState(false);

  const handleChange = (e) => {
    let checked = e.target.checked;
    setIsAllCheck(checked);
  };
  const resourcePermissionMap = (obj) => {
    return (
      <div className="res-per">
        {Object.keys(obj).map((i) => (
          <span key={i} className="resource">
            {obj[i]}
          </span>
        ))}
      </div>
    );
  };
  const handleSingleCheck = () => {};
  return (
    <>
      <Table className={`${classes} custom-table`} responsive>
        <thead className={headerClasses}>
          <tr>
            {!noCheck && (
              <th className="border-0" data-testid="checkbox-header">
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  value={isAllChecked}
                  onChange={(e) => handleChange(e)}
                  className="form-check-input"
                  name="checkAll"
                />
              </th>
            )}
            {tableHeadersData &&
              tableHeadersData.map((headers, index) => {
                return headers.performingAction && component ? (
                  <Can
                    isTable
                    key={headers.key}
                    performingAction={{
                      component: component,
                      action: headers.performingAction,
                    }}>
                    <Fragment key={index}>
                      {headers.showColumn ? (
                        <th className="border-0">
                          {' '}
                          {headers.keyName}
                          {headers?.component && headers?.component}
                        </th>
                      ) : null}
                    </Fragment>
                  </Can>
                ) : (
                  <Fragment key={headers.key}>
                    {headers.showColumn ? (
                      <th className="border-0">
                        {' '}
                        {headers.keyName}{' '}
                        {headers?.component && headers?.component}
                      </th>
                    ) : null}
                  </Fragment>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {tableData ? (
            tableData.map((item) => (
              <tr key={item.id}>
                {!noCheck && (
                  <td className="border-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={item.isChecked}
                      onChange={(e) => handleSingleCheck(e, item.id)}
                      checked={item.isChecked}
                    />
                  </td>
                )}
                {tableHeadersData.map((headers) =>
                  headers.performingAction && component ? (
                    <Can
                      isTable
                      key={headers.key}
                      performingAction={{
                        component: component,
                        action: headers.performingAction,
                      }}>
                      <Fragment key={headers.key}>
                        {headers.showColumn &&
                        headers.keyValue !== 'actions' ? (
                          <td className="border-0" data-testid="normal-cell">
                            {' '}
                            {typeof item[headers.keyValue] === 'boolean' ? (
                              item[headers.keyValue] ? (
                                <span className={headers.className}>
                                  <FontAwesomeIcon icon={faCheckCircle} />{' '}
                                  {headers.keyValue}
                                </span>
                              ) : (
                                <span className={headers.classNameInactive}>
                                  <FontAwesomeIcon icon={faTimesCircle} />{' '}
                                  {headers.keyValueInactive}
                                </span>
                              )
                            ) : item[headers.keyValue] ? (
                              headers.keyValue === 'permissions' ? (
                                resourcePermissionMap(item[headers.keyValue])
                              ) : headers.keyValue === 'defaultRoute' ? (
                                item[headers.keyValue].url
                              ) : (
                                item[headers.keyValue]
                              )
                            ) : (
                              'N/A'
                            )}
                          </td>
                        ) : null}
                        {headers.keyValue === 'actions' ? (
                          <td className="border-0">
                            <Dropdown drop="down" className="d-inline">
                              <Dropdown.Toggle
                                bsPrefix="super-btn"
                                id="dropdown-basic"
                                className="ellipsis">
                                <FontAwesomeIcon icon={faEllipsisH} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {headers.options.map((action) =>
                                  action.performingAction && component ? (
                                    <Can
                                      key={headers.key}
                                      performingAction={{
                                        component: component,
                                        action: action.performingAction,
                                      }}>
                                      <Fragment key={action.label}>
                                        <Dropdown.Item
                                          onClick={() =>
                                            /**
                                             * IMP. TODO
                                             * A small fix to ensure things doesn't break here.
                                             * For lenders api -
                                             * currently we are getting response as
                                             * lenderId/lenderName etc.
                                             * That's why need to pass lenderId here explicitly.
                                             * Once this has been fixed from api, we'll remove this.
                                             */
                                            actionCallback(
                                              item.id || item.lenderId,
                                              action,
                                              item
                                            )
                                          }>
                                          <span className={action.className}>
                                            <FontAwesomeIcon
                                              icon={action.icon}
                                            />{' '}
                                            {action.label}
                                          </span>
                                        </Dropdown.Item>
                                      </Fragment>
                                    </Can>
                                  ) : (
                                    <Fragment key={action.label}>
                                      <Dropdown.Item
                                        onClick={() =>
                                          actionCallback(
                                            item.id || item.lenderId,
                                            action,
                                            item
                                          )
                                        }>
                                        {' '}
                                        <span className={action.className}>
                                          <FontAwesomeIcon icon={action.icon} />{' '}
                                          {action.label}{' '}
                                        </span>
                                      </Dropdown.Item>
                                    </Fragment>
                                  )
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        ) : null}
                      </Fragment>
                    </Can>
                  ) : (
                    <Fragment key={headers.key}>
                      {headers.showColumn && headers.keyValue !== 'actions' ? (
                        <td className={`border-0 ${headers.className}`}>
                          {' '}
                          {typeof item[headers.keyValue] === 'boolean' ? (
                            item[headers.keyValue] ? (
                              <span className={headers.className}>
                                <FontAwesomeIcon icon={faCheckCircle} />{' '}
                                {headers.keyValue}
                              </span>
                            ) : (
                              <span className={headers.classNameInactive}>
                                <FontAwesomeIcon icon={faTimesCircle} />{' '}
                                {headers.keyValueInactive}
                              </span>
                            )
                          ) : item[headers.keyValue] ? (
                            headers.keyValue === 'permissions' ? (
                              resourcePermissionMap(item[headers.keyValue])
                            ) : headers.keyValue === 'defaultRoute' ? (
                              item[headers.keyValue].url
                            ) : (
                              item[headers.keyValue]
                            )
                          ) : (
                            'N/A'
                          )}
                        </td>
                      ) : null}
                      {headers.keyValue === 'actions' ? (
                        <td className="border-0">
                          {headers.type === 'CTA' ? (
                            headers.options.map((action) => (
                              <Fragment key={action.label}>
                                <div
                                  onClick={() =>
                                    actionCallback(
                                      item.id || item.lenderId,
                                      action,
                                      item
                                    )
                                  }>
                                  {headers.component}
                                </div>
                              </Fragment>
                            ))
                          ) : (
                            <Dropdown drop="down" className="d-inline">
                              <Dropdown.Toggle
                                bsPrefix="super-btn"
                                id="dropdown-basic"
                                className="ellipsis">
                                <FontAwesomeIcon icon={faEllipsisH} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {headers.options.map((action) =>
                                  action.performingAction && component ? (
                                    <Can
                                      key={headers.key}
                                      performingAction={{
                                        component: component,
                                        action: action.performingAction,
                                      }}>
                                      <Fragment key={action.label}>
                                        <Dropdown.Item
                                          onClick={() =>
                                            actionCallback(
                                              item.id || item.lenderId,
                                              action,
                                              item
                                            )
                                          }>
                                          <span className={action.className}>
                                            <FontAwesomeIcon
                                              icon={action.icon}
                                            />{' '}
                                            {action.label}
                                          </span>
                                        </Dropdown.Item>
                                      </Fragment>
                                    </Can>
                                  ) : (
                                    <Fragment key={action.label}>
                                      <Dropdown.Item
                                        onClick={() =>
                                          actionCallback(
                                            item.id || item.lenderId,
                                            action,
                                            item
                                          )
                                        }>
                                        {' '}
                                        <span className={action.className}>
                                          <FontAwesomeIcon icon={action.icon} />{' '}
                                          {action.label}{' '}
                                        </span>
                                      </Dropdown.Item>
                                    </Fragment>
                                  )
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </td>
                      ) : null}
                    </Fragment>
                  )
                )}

                {/* if required we will use this status and verified later <td className="border-0 fw-bold">{ verified ? <span className="text-success"><FontAwesomeIcon icon={faCheckCircle} /></span> : <FontAwesomeIcon icon={faInfoCircle} /> } email</td> */}
                {/* <td className="border-0 fw-bold"><span style={{color:colorMap[status]}}>{status}</span> </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
TableComponent.propTypes = {
  tableData: PropTypes.array,
  tableHeadersData: PropTypes.array,
  actionCallback: PropTypes.func,
  classes: PropTypes.string,
  component: PropTypes.elementType,
  noCheck: PropTypes.bool,
  headerClasses: PropTypes.string,
};
export default TableComponent;
