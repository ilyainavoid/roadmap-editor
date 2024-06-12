import { combineReducers } from 'redux';
import authReducer from "./reducers/authReducer.ts";


export interface AuthState {
    isAuth: boolean;
}

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;