import { Node, Edge } from '@antv/x6';

export interface GraphState {
    graphData: {
        cells: (Node.Metadata | Edge.Metadata)[];
        nodes?: Node.Metadata[];
        edges?: Edge.Metadata[];
    };
}

export enum GraphActionType {
    SET_GRAPH_DATA = 'SET_GRAPH_DATA',
}

interface SetGraphDataAction {
    type: GraphActionType.SET_GRAPH_DATA;
    payload: {
        cells: (Node.Metadata | Edge.Metadata)[];
        nodes?: Node.Metadata[];
        edges?: Edge.Metadata[];
    };
}

export type GraphAction = SetGraphDataAction;
