import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

import expenseReducer from "./expenseSlice";
const store = configureStore({

    reducer: {auth:authReducer,expenses:expenseReducer,theme:themeReducer}
})

export default store