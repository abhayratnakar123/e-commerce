const UPDATE_USER = "UPDATE_USER";
const UPDATE_CART = "UPDATE_CART";
const UPDATE_TOTAL_CART_PRICE = "UPDATE_TOTAL_CART_PRICE";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT";
const ADD_PRODUCT_TO_CART="ADD_PRODUCT_TO_CART";

// Actions
export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});

export const updateCart = (payload) => ({
  type: UPDATE_CART,
  payload,
});

export const updateTotalCartPrice = (payload) => ({
  type: UPDATE_TOTAL_CART_PRICE,
  payload,
});

export const updateQuantity = (payload) => ({
  type: UPDATE_QUANTITY,
  payload,
});

export const removeCartProduct = (payload) => ({
  type: REMOVE_CART_PRODUCT,
  payload,
});
export const addCartProduct = (payload) => ({
  type: ADD_PRODUCT_TO_CART,
  payload,
});


