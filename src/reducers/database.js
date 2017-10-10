import {
  GOT_CATEGORIES_ALL,
  GOT_CATEGORY_BY_ID,
  GOT_PRODUCTS_ALL,
  GOT_PRODUCTS_BY_ID,
} from '../actions/database';

const initialState = {
  categoriesArray: [],
  productsArray: [],
  productsByIdArray: [],
  activeCategory: null,
  activeSubcategory: null,
  subcategoryArray: [],
};

export default function database(state = initialState, action) {
  switch (action.type) {
    case GOT_CATEGORIES_ALL:
      return {
        ...state,
        sid: action.sid,
        categoriesArray: action.categoriesArray,
      };
    case GOT_CATEGORY_BY_ID:
      return {
        ...state,
        activeCategory: action.id,
        sid: action.sid,
        subcategoryArray: action.subcategoryArray,
      };
    case GOT_PRODUCTS_ALL:
      return {
        ...state,
        sid: action.sid,
        productsArray: action.productsArray,
        productsByIdArray: action.productsByIdArray,
      };
    case GOT_PRODUCTS_BY_ID:
      return {
        ...state,
        sid: action.sid,
        activeSubcategory: action.id,
        productsArray: action.productsArray,
        productsByIdArray: action.productsByIdArray,
      };

    default:
      return state;
  }
}
