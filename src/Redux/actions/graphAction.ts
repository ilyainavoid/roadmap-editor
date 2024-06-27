import { Edge, Node } from "@antv/x6";
import { GraphAction, GraphActionType } from "../types/graphType.ts";

export const setGraphData = (graphData: {
    cells: (Node.Metadata | Edge.Metadata)[];
    nodes?: Node.Metadata[];
    edges?: Edge.Metadata[];
}): GraphAction => ({
    type: GraphActionType.SET_GRAPH_DATA,
    payload: graphData,
});

export const setModifier = (modifier: string): GraphAction => ({
    type: GraphActionType.SET_MODIFIER,
    payload: modifier,
});