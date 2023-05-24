import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import ItemsApi from "./ItemsApi";

const store = configureStore({
  reducer: {
    [ItemsApi.reducerPath]: ItemsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ItemsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
