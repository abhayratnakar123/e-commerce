const initialState = {
    orders: null,
  };
  
  const INITIALIZE_ORDERS = "INITIALIZE_ORDERS";
  const UPDATE_ORDERS = "UPDATE_ORDERS";
  
  export const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
      case INITIALIZE_ORDERS:
        const orders = action.payload;
        return {
          ...state,
          orders: orders,
        };
      case UPDATE_ORDERS:
        const order = action.payload;
        return {
          ...state,
          orders: [order, ...state.orders],
        };
      default:
        return state;
    }
  };
  