import { configureStore } from "@reduxjs/toolkit";
import login from "./login";
import tournacenter from './api'
import userprofile from './profile'
import admin from './admin'
import tdm from './tdm'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "BattleFiestae",
    version: 1,
    storage: storage
}
const reducer = combineReducers({
    login: login,
    tournacenter: tournacenter,
    userprofile:userprofile,
    admin:admin,
    tdm:tdm
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default store;