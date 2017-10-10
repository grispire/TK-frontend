import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoryPicker from './CategoryPicker';

import { generateId } from '../helpers';

export const Catalog = ({ productsList, loggedIn, logOut }) => (
  <div className="main-wrapper">
    {/* если вход не выполнен (т.е отсутствует sid для запроса) - редирект на страницу логина */}
    {loggedIn ? <CategoryPicker /> : <Redirect to="/" />}
    <section className="products">
      <ul className="products-list">
        {productsList.map(product => (
          <li className="product" key={generateId()}>
            {product.title}
          </li>
        ))}
      </ul>
    </section>
    <div>
      <button className="log-out" onClick={() => logOut()}>
        LogOut
      </button>
    </div>
  </div>
);

Catalog.propTypes = {
  productsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  productsList: state.database.productsByIdArray,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: 'LOG_OUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
