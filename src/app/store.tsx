import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "@features/currentUserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistorUserConfig = {
  key: "user",
  storage,
  whitelist: ["currentUser"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer<ReturnType<typeof currentUserReducer>>(
      persistorUserConfig,
      currentUserReducer
    ),
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
