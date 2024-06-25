import {AuthAction, AuthActionType, AuthState} from "../types/authType.ts";

const initialState: AuthState = {
    isAuth: false,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.SET_AUTH:
            return { ...state, isAuth: action.payload };
        default:
            return state;
    }
};

export default authReducer;