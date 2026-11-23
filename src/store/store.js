import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import recipeReducer from "./recipeSlice";

const presistConfig = {
  key: "root",
  storage,
  whitelist: ["favoritesList"], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(presistConfig, recipeReducer);

export const store = configureStore({
  reducer: {
    recipes: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

export const persistor = persistStore(store);
