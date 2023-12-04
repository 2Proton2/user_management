import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ 
    user: userReducer,
    auth: authReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store);