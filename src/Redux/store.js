import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import loaderReducer from "./Loader/loaderSlice"
import roomReducer from "./rooms/roomSlice"
import formReducer from "./formData/formSlice"
import { persistStore,persistReducer  } from "redux-persist";
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";


const persistConfig={
  key:'auth',
  storage,
};

const roomPersistConfig = {
  key: 'rooms',
  storage,
};

const formPersistConfig = {
  key: 'form',
  storage,
};

const rootReducer=combineReducers({
  auth: persistReducer(persistConfig, authReducer), // Only auth is persisted
    loader:loaderReducer,
    rooms: persistReducer(roomPersistConfig, roomReducer), // Persisting rooms
    form: persistReducer(formPersistConfig, formReducer), // Persisting form data
    // rooms:roomReducer,
     // form: formReducer,

})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE', 
          'persist/PAUSE', 
          'persist/FLUSH', 
          'persist/PURGE', 
          'persist/REGISTER'
        ],
      },
    }),
});

export const persistor = persistStore(store);