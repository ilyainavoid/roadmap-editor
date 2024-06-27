import { ProgressAction, ProgressActionType } from "../types/progressType";

export const setProgress = (progressData: {
    topicsClosed: number;
    topicsCount: number;
}): ProgressAction => ({
    type: ProgressActionType.SET_PROGRESS,
    payload: progressData,
});

export const updateStatus = (id: string, status: string): ProgressAction => ({
    type: ProgressActionType.UPDATE_STATUS,
    payload: { id, status },
});

export const incrementTopicsClosed = (): ProgressAction => ({
    type: ProgressActionType.INCREMENT_TOPICS_CLOSED,
});

export const decrementTopicsClosed = (): ProgressAction => ({
    type: ProgressActionType.DECREMENT_TOPICS_CLOSED,
});