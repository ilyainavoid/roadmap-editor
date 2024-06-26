import {GraphAction, GraphActionType} from "../types/graphType.ts";
import {Edge, Node} from "@antv/x6";

export interface GraphState {
    graphData: {
        cells: (Node.Metadata | Edge.Metadata)[];
        nodes?: Node.Metadata[];
        edges?: Edge.Metadata[];
    };
}

const initialState: GraphState = {
    graphData: {
        cells: [],
        nodes: [],
        edges: [],
    },
};

const graphReducer = (state = initialState, action: GraphAction): GraphState => {
    switch (action.type) {
        case GraphActionType.SET_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload,
            };
        default:
            return state;
    }
};

export default graphReducer;