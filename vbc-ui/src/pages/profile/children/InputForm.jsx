/**
 * This is HOC component for rendering Input form for different inputs like select and text input
 * Props Recieved:-
      children:- UI elements to render 
      className:- Classes used for styling and alingment
      label:- Label that needs to be displayed when the isView is false
      lablevalue:- Lable that needs to be displayed when the isView is true
      type:- Type of Input
      isView:- boolean to determing the view is in edit mode
      ipValue:- value displayed when the view is in edit mode
      onChange:- function triggred on value change
      options:- array of options to be displayed for select input comonent
      toolTipText:- Text needs to be displayed when tooltip is avalibles
      isInvalid:- boolean values determing the correctness of the input value
      warningText:- Dispay warning when input entered is wrong
      name:- Name of the input field
      readOnly :- Boolean value to disable the input
      required:- Boolean value to make the input required when submiting the form
 */
import React from 'react';
import {Form} from '@themesberg/react-bootstrap';
import CustomOverHoverToolTip from '@/components/CustomOverHoverToolTip';

const InputForm = ({
  children,
  className,
  id,
  label,
  lablevalue,
  max,
  min,
  type,
  isView,
  ipValue,
  onChange,
  options,
  toolTipText,
  isInvalid,
  placeholder = '',
  warningText,
  name,
  maxLength,
  readOnly = false,
  required = true,
  radioData,
}) => {
  if (isView) {
    return (
      <div>
        <p className="p-0 roboto-regular-14 mb-1">{label} :</p>
        {children ? (
          <div className={`${children && 'd-flex gap-1'}`}>
            <h6 className="roboto-medium-14 ">
              {lablevalue ? lablevalue : 'Information not available'}
            </h6>
            {toolTipText && (
              <p className="p-0 roboto-regular-14 mb-1">
                <CustomOverHoverToolTip toolTipText={toolTipText}>
                  {children}
                </CustomOverHoverToolTip>
              </p>
            )}
          </div>
        ) : (
          <h6 className="roboto-medium-14 ">
            {lablevalue ? lablevalue : 'Information not available'}
          </h6>
        )}
      </div>
    );
  } else {
    if (type === 'select') {
      return (
        <Form.Group controlId={label}>
          <Form.Label>
            {' '}
            {required && <span className="patient-color">*</span>}
            {label}
          </Form.Label>
          <Form.Control
            value={ipValue}
            id={id && id}
            className={`input-normal ${className && className}`}
            onChange={onChange}
            required={required}
            disabled={readOnly}
            name={name}
            as={type}>
            <option value="" hidden>
              Select {label}
            </option>
            {options.map(({id, label, value}) => (
              <option key={id + label} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    } else if (type === 'radio') {
      return (
        <Form.Group controlId={label}>
          <Form.Label>
            {' '}
            {required && <span className="patient-color">*</span>}
            {label}
          </Form.Label>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              {radioData &&
                radioData.map((data, index) => (
                  <Form.Check
                    key={index}
                    inline
                    disabled={readOnly}
                    label={data?.label}
                    value={data?.value}
                    name={name}
                    checked={data?.value === ipValue}
                    onChange={onChange}
                    type={type}
                    id={`inline-${type}-1`}
                  />
                ))}
            </div>
          ))}
        </Form.Group>
      );
    }
    return (
      <Form.Group controlId={label}>
        <Form.Label>
          {' '}
          {required && <span className="patient-color">*</span>}
          {label}
        </Form.Label>
        <Form.Control
          className={`input-normal ${className}`}
          type={type}
          id={id && id}
          max={max && max}
          min={min && min}
          value={ipValue}
          required={required}
          onChange={onChange}
          isInvalid={isInvalid}
          readOnly={readOnly}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength && maxLength}
        />
        {isInvalid && (
          <Form.Control.Feedback type="invalid">
            {warningText}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
};
export default InputForm;
