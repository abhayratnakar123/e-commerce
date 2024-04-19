const initialState = {
    products: [],
  };
  
  const INITIALZE = "INITIALZE";  
  
  export const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case INITIALZE:
        const fetchedProducts = action.payload;
        if (Array.isArray(fetchedProducts)) {
          return {
            ...state,
            products: [...fetchedProducts],
          };
        }     
        break;
    
      default:
        return state;
    }
  };
  