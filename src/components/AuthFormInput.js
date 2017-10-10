import React from 'react';
import PropTypes from 'prop-types';

export const AuthFormInput = ({
  header,
  name,
  id,
  type = 'text',
  errorText,
  onInput,
  labelClassName = 'input-error',
}) => (
  <div>
    <label htmlFor={id}>{header}</label>
    <input
      name={name}
      type={type}
      id={id}
      onKeyDown={(e) => {
        if (e.key === ' ') e.preventDefault();
      }}
      onInput={e => onInput(e)}
    />
    <label htmlFor={id} className={labelClassName}>
      {errorText}
    </label>
  </div>
);

export default AuthFormInput;

AuthFormInput.propTypes = {
  header: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  errorText: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
};

AuthFormInput.defaultProps = {
  type: 'text',
  labelClassName: 'input-error',
};
