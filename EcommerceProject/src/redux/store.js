import { configureStore } from "@reduxjs/toolkit";
import { item_api } from "./api";

export default configureStore({
    reducer: {
        [item_api.reducerPath]: item_api.reducer,
    }
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(item_api.middleware),
});