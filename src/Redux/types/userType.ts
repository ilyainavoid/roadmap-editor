export interface UserState {
    role: string | null;
}

export enum UserActionType {
    SET_USER_ROLE = 'SET_USER_ROLE'
}

interface SetUserAction {
    type: UserActionType.SET_USER_ROLE;
    payload: string | null;
}

export type UserAction = SetUserAction;
