
export interface ProfileState {
    profile: UserProfile | null;
}

export enum ProfileActionType {
    SET_PROFILE = 'SET_PROFILE',
}

interface SetProfileAction {
    type: ProfileActionType.SET_PROFILE;
    payload: UserProfile;
}

export type ProfileAction = SetProfileAction;