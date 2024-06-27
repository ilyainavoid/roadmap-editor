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
import store from "../../Redux/store.ts";
import { setGraphData } from "../../Redux/actions/graphAction.ts";
import { putRoadmapContent } from "../../API/Roadmaps/putRoadmapContent.ts";

interface NodeData {
    label: string;
    data: string;
}

interface DiagramEditorProps {
    id: string | undefined;
}

const DiagramEditor: React.FC<DiagramEditorProps> = ({ id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stencilContainerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<Graph | null>(null);

    const graphData = useSelector((state: RootState) => state.graph.graphData);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nodeData, setNodeData] = useState<Map<string, NodeData>>(new Map());
    const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
    const [dataPreview, setDataPreview] = useState('');

    const showModal = (node: any) => {
        const id = node.id;
        const label = node.attr('label/text');
        const data = node.getData()?.data || '';
        setNodeData(new Map(nodeData.set(id, { label, data })));
        setDataPreview(data);
        setCurrentNodeId(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (currentNodeId) {
            const { label, data } = nodeData.get(currentNodeId) || { label: '', data: '' };
            const node = graphRef.current?.getCellById(currentNodeId);
            if (node) {
                node.attr('label/text', label);
                node.setData({ data });
            }
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleQuillChange = (value: string) => {
        if (currentNodeId) {
            const node = nodeData.get(currentNodeId);
            if (node) {
                node.data = value;
                setNodeData(new Map(nodeData.set(currentNodeId, node)));
                setDataPreview(value);
            }
        }
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

        const storedData = sessionStorage.getItem('graphData');
        if (storedData) {
            graph.fromJSON(JSON.parse(storedData));
        } else if (graphData && graphData.cells) {
            graph.fromJSON(graphData.cells);
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

        const historyChangeHandler = () => {
            console.log('History change event');
            saveGraphState();
        };

        const nodeDblClickHandler = ({ node }: any) => {
            showModal(node);
        };

        const nodeRemoveHandler = ({ node }: any) => {
            const edges = graph.getConnectedEdges(node);
            edges.forEach((edge) => {
                edge.remove();
            });
        };

        graph.on('history:change', historyChangeHandler);
        graph.on('node:dblclick', nodeDblClickHandler);
        graph.on('node:removed', nodeRemoveHandler);

        const saveGraphState = () => {
            const graphData = graph.toJSON();
            sessionStorage.setItem('graphData', JSON.stringify(graphData));
            store.dispatch(setGraphData(graphData));
        }

        return () => {
            graph.off('history:change', historyChangeHandler);
            graph.off('node:dblclick', nodeDblClickHandler);
            graph.off('node:removed', nodeRemoveHandler);
            saveGraphState();
            graph.dispose();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const storedData = sessionStorage.getItem('graphData');
            if (storedData) {
                try {
                    await putRoadmapContent(id, storedData);
                } catch (e) {
                    console.log(e);
                }
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [id]);

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
                {currentNodeId && (
                    <>
                        <Input
                            style={{ marginBottom: '10px' }}
                            value={nodeData.get(currentNodeId)?.label}
                            onChange={(e) =>
                                setNodeData(new Map(nodeData.set(currentNodeId, {
                                    ...nodeData.get(currentNodeId),
                                    label: e.target.value,
                                })))
                            }
                            placeholder="Enter node label"
                        />
                        <ReactQuill
                            value={nodeData.get(currentNodeId)?.data || ''}
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
                    </>
                )}
            </Modal>
        </div>
    );
};

export default DiagramEditor;
