/**
 * This Component recieves props for rendering Multiline bootstrap input data
 *
 * label:- String value which is displayed as Label
 * value:- Actual state Value
 * setValue:- For Changing the value on user input change
 * rows:- Number Input for the number of rows required to display
 *
 */
import {Form} from '@themesberg/react-bootstrap';
import React from 'react';

const MultiLineInput = ({label, value, setValue, rows = 3, placeholder}) => {
  return (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Form.Group>
  );
};

export default MultiLineInput;
