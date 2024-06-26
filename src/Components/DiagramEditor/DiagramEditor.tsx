import React, { useRef, useState, useEffect } from 'react';
import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Stencil } from '@antv/x6-plugin-stencil';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Transform } from '@antv/x6-plugin-transform';
import { Dnd } from '@antv/x6-plugin-dnd';
import { Selection } from '@antv/x6-plugin-selection';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import 'react-quill/dist/quill.snow.css';
import { Typography, Modal, Input } from 'antd';
import ReactQuill from 'react-quill';
import './diagram.less';
import { createThemeNode, createTopicNode } from '../../Consts/nodes.ts';
import Toolbar from '../../Consts/toolbar.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/rootReducer.ts';

const DiagramEditor: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stencilContainerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<Graph | null>(null);

    const graphData = useSelector((state: RootState) => state.graph.graphData);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nodeData, setNodeData] = useState<{ id: string; label: string; data: string }>({
        id: '',
        label: '',
        data: '',
    });
    const [dataPreview, setDataPreview] = useState('');

    const showModal = (node: any) => {
        const nodeData = {
            id: node.id,
            label: node.attr('label/text'),
            data: node.getData()?.data || '',
        }
        setNodeData(nodeData);
        setDataPreview(nodeData.data);
        setIsModalVisible(true);
    };
    const handleOk = () => {
        const { id, label, data } = nodeData;
        const node = graphRef.current?.getCellById(id);
        if (node) {
            node.attr('label/text', label);
            node.setData({ data: data });
        }
        setIsModalVisible(false);
        setNodeData({ id: '', label: '', data: '' });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNodeData({ id: '', label: '', data: '' });
    };

    const handleQuillChange = (value: string) => {
        setNodeData({ ...nodeData, data: value });
        setDataPreview(value);
    };

    useEffect(() => {
        if (!containerRef.current || !stencilContainerRef.current) return;

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
            mousewheel: true,
        });

        if (graphData && graphData.cells) {
            graph.fromJSON(graphData.cells)
        }

        graph.use(new Snapline({ enabled: true, sharp: true }));
        graph.use(new Clipboard({ enabled: true }));
        graph.use(new Transform({ resizing: true }));
        graph.use(new Dnd({ target: graph }));
        graph.use(
            new Selection({
                enabled: true,
                multiple: true,
                rubberband: true,
                movable: true,
                showNodeSelectionBox: true,
            })
        );
        graph.use(new History({ enabled: true }));
        graph.use(
            new Keyboard({
                enabled: true,
                global: true,
            })
        );

        graph.bindKey('ctrl+c', () => {
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.copy(cells);
            }
            return false;
        });

        graph.bindKey('ctrl+v', () => {
            if (!graph.isClipboardEmpty()) {
                const cells = graph.paste({ offset: 32 });
                graph.cleanSelection();
                graph.select(cells);
            }
            return false;
        });

        graph.bindKey(['ctrl+z', 'meta+z'], () => {
            graph.undo();
            return false;
        });

        graph.bindKey(['ctrl+y', 'meta+y'], () => {
            graph.redo();
            return false;
        });

        graph.bindKey('delete', () => {
            const cells = graph.getSelectedCells();
            if (cells.length) {
                cells.forEach((cell) => cell.remove());
            }
            return false;
        });

        graph.bindKey(['ctrl+a', 'meta+a'], () => {
            const cells = graph.getCells();
            graph.select(cells);
            return false;
        });

        graph.centerContent();
        graphRef.current = graph;

        const stencil = new Stencil({
            title: 'Stencil',
            target: graph,
            search(cell, keyword) {
                return cell.shape.indexOf(keyword) !== -1;
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
        });

        stencilContainerRef.current.appendChild(stencil.container);

        const theme = createThemeNode(graph);
        const topic = createTopicNode(graph);

        stencil.load([theme], 'Theme');
        stencil.load([topic], 'Topic');

        graph.on('node:dblclick', ({ node }) => {
            showModal(node);
        });

        graph.on('history:change', () => {
            saveGraphState();
        });

        graph.on('node:removed', ({ node }) => {
            const edges = graph.getConnectedEdges(node);
            edges.forEach((edge) => {
                edge.remove();
            });
        });

        const saveGraphState = () => {
            const graphData = graph.toJSON();
            localStorage.setItem('graphData', JSON.stringify(graphData));
        };

        const loadGraphState = () => {
            const graphData = localStorage.getItem('graphData');
            if (graphData) {
                graph.fromJSON(JSON.parse(graphData));
            }
        };

        loadGraphState();

        return () => {
            graph.dispose();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const graphData = localStorage.getItem('graphData');
            if (graphData) {
                console.log('Sending data to server:', JSON.parse(graphData));
            }
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="stencil-app">
                <div className="app-stencil" ref={stencilContainerRef} />
                <div className="app-content" ref={containerRef} />
            </div>
            <Modal
                title="Edit Node"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    style={{ marginBottom: '10px' }}
                    value={nodeData.label}
                    onChange={(e) =>
                        setNodeData({ ...nodeData, label: e.target.value })
                    }
                    placeholder="Enter node label"
                />
                <ReactQuill
                    value={nodeData.data}
                    onChange={handleQuillChange}
                    modules={{ toolbar: Toolbar }}
                />
                <div
                    style={{
                        marginTop: '10px',
                        borderTop: '1px solid #f0f0f0',
                        paddingTop: '10px',
                    }}
                >
                    <Typography.Text strong>Preview:</Typography.Text>
                    <div
                        style={{
                            marginLeft: '20px',
                        }}
                        dangerouslySetInnerHTML={{ __html: dataPreview }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default DiagramEditor;
