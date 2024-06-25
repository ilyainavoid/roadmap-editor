import { Graph, Node } from '@antv/x6'

export const createThemeNode = (graph: Graph): Node => {
    return graph.createNode({
        shape: 'rect',
        x: 40,
        y: 40,
        width: 80,
        height: 40,
        label: 'Тема',
        attrs: {
            body: {
                fill: '#00ff2c',
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
        ports: {
            groups: {
                top: {
                    position: 'top',
                    attrs: {
                        circle: {
                            r: 6,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                        },
                    },
                },
                bottom: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            r: 6,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                        },
                    },
                },
                left: {
                    position: 'left',
                    attrs: {
                        circle: {
                            r: 6,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                        },
                    },
                },
                right: {
                    position: 'right',
                    attrs: {
                        circle: {
                            r: 6,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                        },
                    },
                },
            },
            items: [
                { id: 'port_left', group: 'left' },
                { id: 'port_right', group: 'right' },
                { id: 'port_bottom', group: 'bottom' },
                { id: 'port_top', group: 'top' },
            ],
        },
        tools: ['button-remove'],
    })
}

export const createTopicNode = (graph: Graph): Node => {
    return graph.createNode({
        shape: 'rect',
        x: 180,
        y: 40,
        width: 80,
        height: 40,
        label: 'Подтема',
        attrs: {
            body: {
                fill: '#ffeb00',
                stroke: '#8f8f8f',
                strokeWidth: 1,
                rx: 6,
                ry: 6,
            },
        },
        tools: ['button-remove'],
    })
}
