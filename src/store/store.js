import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import recipeReducer from "./recipeSlice";

const presistConfig = {
  key: "root",
  storage,
  whitelist: ["favoritesList", "searchParam", "recipeList"], // Persist favorites and active search results
};

const persistedReducer = persistReducer(presistConfig, recipeReducer);

export const store = configureStore({
  reducer: {
    recipes: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
