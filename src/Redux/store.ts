import rootReducer from './rootReducer';
import {configureStore} from "@reduxjs/toolkit"

export type AppDispatch = typeof store.dispatch;

const store = configureStore({reducer: rootReducer});

export default store;