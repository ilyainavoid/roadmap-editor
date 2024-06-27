import React, { useEffect, useRef, useState } from 'react';
import { Graph } from '@antv/x6';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/rootReducer';
import { Drawer, Flex, Select } from 'antd';
import parse from 'html-react-parser';
import { putTopicProgress } from '../../API/Topic/putTopicProgress.ts';
import store from '../../Redux/store.ts';
import {
    decrementTopicsClosed,
    incrementTopicsClosed,
    updateStatus,
} from '../../Redux/actions/progressAction.ts';

interface RoadmapViewerProps {
    id: string | undefined;
}

const RoadmapViewer: React.FC<RoadmapViewerProps> = ({ id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<Graph | null>(null);
    const [open, setOpen] = useState(false);
    const [cellData, setCellData] = useState<any>(null);
    const [currentNodeId, setCurrentNodeId] = useState<string>('');
    const graphData = useSelector((state: RootState) => state.graph.graphData);
    const progressDetailed = useSelector((state: RootState) => state.progress.idStatusMap);
    const [status, setStatus] = useState<string>('Pending');
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    const applyNodeStyle = (node: any, status: string) => {
        switch (status) {
            case 'Pending':
                node.attr({
                    body: {
                        stroke: '#d9d9d9',
                        strokeWidth: 1,
                        fill: '#fff',
                    }
                });
                break;
            case 'InProgress':
                node.attr({
                    body: {
                        stroke: '#ffa500',
                        strokeWidth: 2,
                        fill: '#fff',
                    }
                });
                break;
            case 'ChangedByAuthor':
                node.attr({
                    body: {
                        stroke: '#1890ff',
                        strokeWidth: 2,
                        fill: '#fff',
                    }
                });
                break;
            case 'Closed':
                node.attr({
                    body: {
                        stroke: '#52c41a',
                        strokeWidth: 2,
                        fill: '#fff',
                    },
                    label: {
                        textDecoration: 'line-through',
                    },
                });
                break;
            default:
                break;
        }
    };

    const showDrawer = (data: any, nodeId: string) => {
        setCellData(data);
        setCurrentNodeId(nodeId);
        setStatus(progressDetailed[nodeId] || 'Pending');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setCellData(null);
        setCurrentNodeId('');
        setStatus('Pending');
    };

    const handleStatusChange = async (value: string) => {
        if (!currentNodeId) return;
        await putTopicProgress(id, currentNodeId, value);
        store.dispatch(updateStatus(currentNodeId, value));
        if (status !== 'Closed' && value === 'Closed') {
            store.dispatch(incrementTopicsClosed());
        } else if (status === 'Closed' && (value === 'InProgress' || value === 'ChangedByAuthor' || value === 'Pending')) {
            store.dispatch(decrementTopicsClosed());
        }
        setStatus(value);
        if (graphRef.current) {
            const node = graphRef.current.getCellById(currentNodeId);
            applyNodeStyle(node, value);
        }
    };

    const statusOptions = [
        { value: 'Pending', label: 'Не начато' },
        { value: 'InProgress', label: 'В процессе' },
        { value: 'Closed', label: 'Выполнено' },
        { value: 'ChangedByAuthor', label: 'Изменено автором' },
    ];

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
                allowBlank: false,
                allowMulti: false,
                allowLoop: false,
                allowNode: false,
                allowEdge: false,
                allowPort: false,
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

        const storedData = sessionStorage.getItem('graphData');

        if (storedData) {
            graph.fromJSON(JSON.parse(storedData));
        } else if (graphData && graphData.cells) {
            graph.fromJSON(graphData.cells);
        }

        graph.getNodes().forEach((node) => {
            const nodeId = node.id;
            const nodeStatus = progressDetailed[nodeId] || 'Pending';
            applyNodeStyle(node, nodeStatus);
            node.removeTools();
        });

        graph.on('cell:click', ({ cell }) => {
            const data = cell;
            showDrawer(data.getData(), data.id);
        });

        graph.centerContent();
        graphRef.current = graph;

        return () => {
            graph.dispose();
        };
    }, [graphData, progressDetailed]);

    return (
        <>
            <div className="app-content" ref={containerRef} />
            <Drawer title="Данные узла" width="600px" onClose={onClose} open={open}>
                <Flex vertical>
                    <Select style={{ marginBottom: '30px', width: '30%' }} onChange={handleStatusChange} disabled={!isAuth} options={statusOptions} value={status}></Select>
                    <p>{cellData ? parse(cellData.data) : ''}</p>
                </Flex>
            </Drawer>
        </>
    );
};

export default RoadmapViewer;
