import React, { useRef, useEffect } from 'react'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Transform } from '@antv/x6-plugin-transform'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import 'react-quill/dist/quill.snow.css'
import './diagram.less'
import { Keyboard } from '@antv/x6-plugin-keyboard'

const themeAttrs = {
    body: {
        fill: '#00ff2c',
        stroke: '#8f8f8f',
        strokeWidth: 1,
    },
}

const topicAttrs = {
    body: {
        fill: '#ffeb00',
        stroke: '#8f8f8f',
        strokeWidth: 1,
        rx: 6,
        ry: 6,
    },
}

const ports = {
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
}

const DiagramEditor: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const stencilContainerRef = useRef<HTMLDivElement>(null)
    const graphRef = useRef<Graph | null>(null)

    useEffect(() => {
        if (!containerRef.current || !stencilContainerRef.current) return

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
        })

        graph.use(new Snapline({ enabled: true, sharp: true }))
        graph.use(new Clipboard({ enabled: true }))
        graph.use(new Transform({ resizing: true }))
        graph.use(new Dnd({ target: graph }))
        graph.use(new Selection({
            enabled: true,
            multiple: true,
            rubberband: true,
            movable: true,
            showNodeSelectionBox: true,
        }))
        graph.use(new History({ enabled: true }))
        graph.use(new Keyboard({
            enabled: true,
            global: true,
        }))

        graph.bindKey('ctrl+c', () => {
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.copy(cells)
            }
            return false;
        })

        graph.bindKey('ctrl+v', () => {
            if (!graph.isClipboardEmpty()) {
                const cells = graph.paste({ offset: 32 });
                graph.cleanSelection();
                graph.select(cells);
            }
            return false;
        })

        graph.centerContent()
        graphRef.current = graph

        const stencil = new Stencil({
            title: 'Stencil',
            target: graph,
            search(cell, keyword) {
                return cell.shape.indexOf(keyword) !== -1
            },
            placeholder: 'Search by shape name',
            notFoundText: 'Not Found',
            collapsable: true,
            stencilGraphHeight: 0,
            groups: [
                {
                    name: 'Theme',
                    title: 'Theme',
                },
                {
                    name: 'Topic',
                    title: 'Topic',
                },
            ],
        })

        stencilContainerRef.current.appendChild(stencil.container)

        const theme = graph.createNode({
            shape: 'rect',
            x: 40,
            y: 40,
            width: 80,
            height: 40,
            label: 'Тема',
            attrs: themeAttrs,
            ports: { ...ports },
            tools: ['button-remove']
        })

        const topic = graph.createNode({
            shape: 'rect',
            x: 180,
            y: 40,
            width: 80,
            height: 40,
            label: 'Подтема',
            attrs: topicAttrs,
            tools: ['button-remove']
        })

        stencil.load([theme], 'Theme')
        stencil.load([topic], 'Topic')

        graph.on('node:dblclick', ({ node }) => {
            const label = prompt('Enter new label:', node.attr('label/text'))
            if (label !== null) {
                node.attr('label/text', label)
            }
        })

        graph.on('history:change', () => {
            console.log('History changed')
        })

        graph.on('node:removed', ({ node }) => {
            const edges = graph.getConnectedEdges(node)
            edges.forEach(edge => {
                edge.remove()
            })
        })

        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
                event.preventDefault()
                graph.undo()
            }
            if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
                event.preventDefault()
                graph.redo()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)

    }, [])

    return (
        <div className="stencil-app">
            <div className="app-stencil" ref={stencilContainerRef} />
            <div className="app-content" ref={containerRef} />
        </div>
    )
}

export default DiagramEditor;