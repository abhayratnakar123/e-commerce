const INITIALIZE_ORDERS = "INITIALIZE_ORDERS";
const UPDATE_ORDERS = "UPDATE_ORDERS";

// Actions
export const intitializeOrders = (payload) => ({
  type: INITIALIZE_ORDERS,
  payload,
});

export const updateOrders = (payload) => ({
  type: UPDATE_ORDERS,
  payload,
});
 

