// RoadmapViewer.tsx

import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/rootReducer';

const RoadmapViewer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<Graph | null>(null);

    const graphData = useSelector((state: RootState) => state.graph.graphData);

    useEffect(() => {
        if (!containerRef.current) return;

        const graph = new Graph({
            container: containerRef.current,
            height: 1000,
            background: {
                color: '#F2F7FA',
            },
            grid: {
                visible: true,
            },
            connecting: {
                allowNode: true,
            },
            panning: {
                enabled: true,
                eventTypes: ['rightMouseDown'],
            },
            mousewheel: {
                enabled: true,
                modifiers: ['ctrl', 'meta'],
            },
            interacting: {
                nodeMovable: false,
            },
        });

        if (graphData && graphData.cells) {
            graph.fromJSON(graphData.cells)
        }

        graph.getNodes().forEach((node: Node)=> {
            node.removeTools();
        })

        graph.centerContent();
        graphRef.current = graph;
    }, [graphData]);

    return <div className="app-content" ref={containerRef} />;
};

export default RoadmapViewer;
