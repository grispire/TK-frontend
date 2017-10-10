import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Category from '../components/Category';

import { generateId } from '../helpers';
import { getCategories, getProducts } from '../actions/database';

export class CategoryPicker extends React.Component {
  componentWillMount() {
    this.props.getCategories(this.props.sid, null);
  }
  categoryPicked = (clickedId) => {
    if (+clickedId === this.props.activeCategory) return;
    this.props.getCategories(this.props.sid, +clickedId);
  };
  subcategoryPicked = (clickedSubcatId) => {
    if (+clickedSubcatId === this.props.activeSubcategory) return;
    this.props.getProductsList(this.props.sid, +clickedSubcatId);
  };

  render() {
    return (
      <section className="categories">
        <h2>Pick category</h2>
        <ul className="categories-list">
          {this.props.categoriesArray.map(category => (
            <Category
              id={category.id}
              title={category.title}
              key={generateId()}
              subcatArray={this.props.subcategoryArray}
              onClick={this.categoryPicked}
              onSubcatClick={this.subcategoryPicked}
              activeCategory={this.props.activeCategory}
              activeSubcategory={this.props.activeSubcategory}
            />
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  sid: state.auth.sid,
  categoriesArray: state.database.categoriesArray,
  subcategoryArray: state.database.subcategoryArray,
  activeCategory: state.database.activeCategory,
  activeSubcategory: state.database.activeSubcategory,
});

const mapDispatchToProps = dispatch => ({
  getCategories: (sid, id) => {
    dispatch(getCategories(sid, id));
  },
  getProductsList: (sid, id) => {
    dispatch(getProducts(sid, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPicker);

CategoryPicker.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProductsList: PropTypes.func.isRequired,
  categoriesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  subcategoryArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCategory: PropTypes.number,
  activeSubcategory: PropTypes.number,
  sid: PropTypes.number.isRequired,
};

CategoryPicker.defaultProps = {
  activeCategory: null,
  activeSubcategory: null,
};
