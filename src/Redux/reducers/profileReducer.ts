import {ProfileAction, ProfileActionType, ProfileState} from "../types/ProfileType.ts";

const initialState: ProfileState = {
    profile: null,
};

const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case ProfileActionType.SET_PROFILE:
            return { ...state, profile: action.payload };
        default:
            return state;
    }
};

export default profileReducer;