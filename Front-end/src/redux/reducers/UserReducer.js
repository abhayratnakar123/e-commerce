import { getCookie } from "../../helpers/Cookie";

const initialState = {
  authToken: getCookie("authToken") || null,
  cart: null,
  totalCartPrice: null,
};

const UPDATE_USER = "UPDATE_USER";
const UPDATE_CART = "UPDATE_CART";
const UPDATE_TOTAL_CART_PRICE = "UPDATE_TOTAL_CART_PRICE";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      const authToken = action.payload;
      return {
        ...state,
        authToken: authToken,
      };
    case UPDATE_CART:
      const cartData = action.payload;
      return {
        ...state,
        cart:cartData===null?null: [...cartData],
        // Recalculate totalCartPrice based on the initial cart data
        totalCartPrice:cartData===null?null: calculateTotalCartPrice([...cartData]),
      };
    case UPDATE_TOTAL_CART_PRICE:
      const totalCartPrice = action.payload;
      return {
        ...state,
        totalCartPrice: totalCartPrice,
      };
    case UPDATE_QUANTITY:
      const { quantity: updatedQuantity, id: updatedProductId } =
        action.payload;
      const updatedCartData = state.cart.map((item) =>
        item._id === updatedProductId
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      const updatedTotalCartPrice = calculateTotalCartPrice(updatedCartData);
      return {
        ...state,
        cart: updatedCartData,
        totalCartPrice: updatedTotalCartPrice,
      };
    case REMOVE_CART_PRODUCT:
      const removeCartProductId = action.payload;
      const updatedCartAfterRemoving = state.cart.filter(
        (item) => item._id !== removeCartProductId
      );
      const cartTotal = calculateTotalCartPrice(updatedCartAfterRemoving);
      return {
        ...state,
        cart: updatedCartAfterRemoving,
        totalCartPrice: cartTotal,
      };
    case ADD_PRODUCT_TO_CART:
      const addedProduct = action.payload; 
      return {
        ...state,
        cart: [addedProduct, ...state.cart],
      };
    default:
      return state;
  }
};

// Helper function to calculate total cart price
const calculateTotalCartPrice = (cartData) => {
  return cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
