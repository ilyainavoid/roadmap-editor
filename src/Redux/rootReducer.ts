import { combineReducers } from 'redux';
import authReducer from "./reducers/authReducer.ts";
import profileReducer from "./reducers/profileReducer.ts";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;