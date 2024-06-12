export interface AuthState {
    isAuth: boolean;
}

export enum AuthActionType {
    SET_AUTH = 'SET_AUTH',
}

interface SetAuthAction {
    type: AuthActionType.SET_AUTH;
    payload: boolean;
}

export type AuthAction = SetAuthAction;