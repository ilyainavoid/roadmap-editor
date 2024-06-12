import {AuthAction, AuthActionType} from "../types/authType.ts";


export const setAuth = (isAuth: boolean): AuthAction => ({
    type: AuthActionType.SET_AUTH,
    payload: isAuth,
});
