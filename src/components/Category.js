import React from 'react';
import PropTypes from 'prop-types';

import { Subcategory } from './Subcategory';

import { generateId } from '../helpers';

export const Category = ({
  id,
  title,
  onClick,
  subcatArray,
  onSubcatClick,
  activeCategory,
  activeSubcategory,
}) => (
  <ul className="category">
    {/* Категория-заголовок */}
    <li
      id={id}
      onClick={() => {
        onClick(id);
      }}
      role="presentation"
      className={id === activeCategory ? 'category__active' : null}
    >
      {title}
    </li>
    {/* {Подкатегории} */}
    <ul className="subcategories-list">
      {id === activeCategory ? (
        subcatArray.map(subcategory => (
          <Subcategory
            id={subcategory.id}
            title={subcategory.title}
            key={generateId()}
            onClick={onSubcatClick}
            className={subcategory.id === activeSubcategory ? 'subcategory-active' : null}
          />
        ))
      ) : null}
    </ul>
  </ul>
);

Category.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onSubcatClick: PropTypes.func.isRequired,
  subcatArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCategory: PropTypes.number,
  activeSubcategory: PropTypes.number,
};

Category.defaultProps = {
  activeCategory: null,
  activeSubcategory: null,
};

export default Category;
