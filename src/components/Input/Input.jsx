import React from 'react';

import { PropTypes } from 'prop-types';
import { Input } from 'mdbreact';

export default function myInput(props) {
  const {
    value, elementConfig, onChange, valid, touched,
  } = props;

  let style = null;
  if (!valid && touched) {
    style = 'invalid';
  } else if (valid) {
    style = 'valid';
  }

  return (
    <div>
      <Input
        value={value}
        {...elementConfig}
        onChange={onChange}
        className={style}
      />
    </div>
  );
}

myInput.propTypes = {
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
};
