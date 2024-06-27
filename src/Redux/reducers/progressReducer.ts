import { ProgressAction, ProgressActionType, ProgressState } from "../types/progressType";

const initialState: ProgressState = {
    progressData: {
        topicsClosed: 0,
        topicsCount: 0,
    },
    idStatusMap: {},
};

const progressReducer = (state = initialState, action: ProgressAction): ProgressState => {
    switch (action.type) {
        case ProgressActionType.SET_PROGRESS:
            return {
                ...state,
                progressData: action.payload,
            };
        case ProgressActionType.UPDATE_STATUS:
            return {
                ...state,
                idStatusMap: {
                    ...state.idStatusMap,
                    [action.payload.id]: action.payload.status,
                },
            };
        case ProgressActionType.INCREMENT_TOPICS_CLOSED:
            return {
                ...state,
                progressData: {
                    ...state.progressData,
                    topicsClosed: state.progressData.topicsClosed + 1,
                },
            };
        case ProgressActionType.DECREMENT_TOPICS_CLOSED:
            return {
                ...state,
                progressData: {
                    ...state.progressData,
                    topicsClosed: state.progressData.topicsClosed - 1,
                },
            };
        default:
            return state;
    }
};

export default progressReducer;