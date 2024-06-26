import {UserAction, UserActionType, UserState} from "../types/userType.ts";

const initialState: UserState = {
    role: null
};

const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionType.SET_USER_ROLE:
            return {
                ...state,
                role: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
