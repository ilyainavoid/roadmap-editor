import {ProfileAction, ProfileActionType,} from "../types/ProfileType.ts";

export const setProfile = (profile: UserProfile): ProfileAction => ({
    type: ProfileActionType.SET_PROFILE,
    payload: profile,
});