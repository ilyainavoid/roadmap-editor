import { Node, Edge } from '@antv/x6';

export interface GraphState {
    graphData: {
        cells: (Node.Metadata | Edge.Metadata)[];
        nodes?: Node.Metadata[];
        edges?: Edge.Metadata[];
    };
    modifier: string;
}

export enum GraphActionType {
    SET_GRAPH_DATA = 'SET_GRAPH_DATA',
    SET_MODIFIER = 'SET_MODIFIER',
}

interface SetGraphDataAction {
    type: GraphActionType.SET_GRAPH_DATA;
    payload: {
        cells: (Node.Metadata | Edge.Metadata)[];
        nodes?: Node.Metadata[];
        edges?: Edge.Metadata[];
    };
}

interface SetModifierAction {
    type: GraphActionType.SET_MODIFIER;
    payload: string;
}

export type GraphAction = SetGraphDataAction | SetModifierAction;