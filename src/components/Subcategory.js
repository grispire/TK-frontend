import React from 'react';
import PropTypes from 'prop-types';

export const Subcategory = ({ id, title, onClick, className }) => (
  <li
    className={`subcategory ${className}`}
    id={id}
    role="presentation"
    onClick={() => onClick(id)}
  >
    {title}
  </li>
);

Subcategory.defaultProps = {
  className: '',
};

Subcategory.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Subcategory;
