//progressTypes.ts
export interface ProgressState {
    progressData: {
        topicsClosed: number;
        topicsCount: number;
    };
    idStatusMap: Record<string, string>;
}

export enum ProgressActionType {
    SET_PROGRESS = 'SET_PROGRESS',
    UPDATE_STATUS = 'UPDATE_STATUS',
    INCREMENT_TOPICS_CLOSED = 'INCREMENT_TOPICS_CLOSED',
    DECREMENT_TOPICS_CLOSED = 'DECREMENT_TOPICS_CLOSED',
}

interface SetProgressAction {
    type: ProgressActionType.SET_PROGRESS;
    payload: {
        topicsClosed: number;
        topicsCount: number;
    };
}

interface UpdateStatusAction {
    type: ProgressActionType.UPDATE_STATUS;
    payload: {
        id: string;
        status: string;
    };
}

interface IncrementTopicsClosedAction {
    type: ProgressActionType.INCREMENT_TOPICS_CLOSED;
}

interface DecrementTopicsClosedAction {
    type: ProgressActionType.DECREMENT_TOPICS_CLOSED;
}

export type ProgressAction =
    | SetProgressAction
    | UpdateStatusAction
    | IncrementTopicsClosedAction
    | DecrementTopicsClosedAction;
