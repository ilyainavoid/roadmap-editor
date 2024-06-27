import { combineReducers } from 'redux';
import authReducer from "./reducers/authReducer.ts";
import profileReducer from "./reducers/profileReducer.ts";
import graphReducer from "./reducers/graphReducer.ts";
import userReducer from "./reducers/userReducer.ts";
import progressReducer from "./reducers/progressReducer.ts";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    graph: graphReducer,
    user: userReducer,
    progress: progressReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;