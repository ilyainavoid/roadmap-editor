import {UserAction, UserActionType} from "../types/userType.ts";

export const setRole = (role: string): UserAction => ({
    type: UserActionType.SET_USER_ROLE,
    payload: role
});
