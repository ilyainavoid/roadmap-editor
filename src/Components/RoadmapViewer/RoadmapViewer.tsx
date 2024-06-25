import React, {useEffect, useRef} from "react";
import {Graph} from "@antv/x6";

const RoadmapViewer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const graphRef = useRef<Graph | null>(null)


    useEffect(() => {
        if (!containerRef.current) return

        const graph = new Graph({
            container: containerRef.current,
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
            }
        })

        graph.centerContent()
        graphRef.current = graph

    }, [])

    return (
        <div className="app-content" ref={containerRef}/>
    )
}

export default RoadmapViewer;