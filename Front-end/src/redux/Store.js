import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./reducers/UserReducer";
import { CategoriesReducer } from "./reducers/CategoriesReducer";
import { createLogger } from "redux-logger";
import { OrdersReducer } from "./reducers/OrdersReducer";

const logger = createLogger();

export default configureStore({
  reducer: { UserReducer, CategoriesReducer,OrdersReducer },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
