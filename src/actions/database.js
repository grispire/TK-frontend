/* eslint-disable no-console */
export const GOT_CATEGORIES_ALL = 'GOT_CATEGORIES_ALL';
export const GOT_CATEGORY_BY_ID = 'GOT_CATEGORY_BY_ID';
export const GOT_PRODUCTS_ALL = 'GOT_PRODUCTS_ALL';
export const GOT_PRODUCTS_BY_ID = 'GOT_PRODUCTS_BY_ID';

export const gotCategoriesAll = (sid, categoriesArray) => ({
  type: GOT_CATEGORIES_ALL,
  sid,
  categoriesArray,
});

export const gotCategoryById = (sid, subcategoryArray, id) => ({
  type: GOT_CATEGORY_BY_ID,
  sid,
  subcategoryArray,
  id,
});

export const gotProductsAll = (sid, productsArray) => ({
  type: GOT_PRODUCTS_ALL,
  sid,
  productsArray,
});

export const gotProductsById = (sid, productsByIdArray, id) => ({
  type: GOT_PRODUCTS_BY_ID,
  sid,
  productsByIdArray,
  id,
});

export const getCategories = (sid, id) => (dispatch) => {
  // если id не указан - запрашиваются все категории
  if (id === null || typeof id !== 'number') {
    fetch('/categories', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // sid, полученный при логине
        sid,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(gotCategoriesAll(sid, data));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (typeof id === 'number') {
    // если id указан в числовом формате - запрашивается подкатегория по id
    fetch(`/categories/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        sid,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(gotCategoryById(sid, data, id));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error('Wrong id');
  }
};

export const getProducts = (sid, id) => (dispatch) => {
  // если id не указан/не число - запрашиваются все категории
  if (id === null || typeof id !== 'number') {
    fetch('/products', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        sid,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(gotProductsAll(sid, data));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (typeof id === 'number') {
    // если id указан в числовом формате - запрашивается подкатегория по id
    fetch(`/products/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        sid,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(gotProductsById(sid, data, id));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error('Wrong id');
  }
};
