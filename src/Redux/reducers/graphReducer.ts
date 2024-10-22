import { GraphAction, GraphActionType, GraphState } from "../types/graphType.ts";

const initialState: GraphState = {
    graphData: {
        cells: [],
        nodes: [],
        edges: [],
    },
    modifier: '',
};

const graphReducer = (state = initialState, action: GraphAction): GraphState => {
    switch (action.type) {
        case GraphActionType.SET_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload,
            };
        case GraphActionType.SET_MODIFIER:
            return {
                ...state,
                modifier: action.payload,
            };
        default:
            return state;
    }
};

export default graphReducer;