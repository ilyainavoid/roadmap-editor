import React, { useEffect, useState } from "react";
import DiagramEditor from "../../Components/DiagramEditor/DiagramEditor.tsx";
import {Button, Flex, Modal, Progress, Select, Tooltip, Typography} from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import RoadmapViewer from "../../Components/RoadmapViewer/RoadmapViewer.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer.ts";
import AddUserModal from "../../Components/Modals/AddUserModal.tsx";
import {postRoadmapPublish} from "../../API/RoadmapAccess/postRoadmapPublish.ts";
import {setModifier} from "../../Redux/actions/graphAction.ts";
import {getSpecifiedRoadmap} from "../../API/Roadmaps/getSpecifiedRoadmap.ts";

const calculateProgress = (closed: number, total: number): number => {
    if (total === 0) {
        return 0;
    }
    const progress = (closed / total) * 100;
    return parseInt(progress.toFixed(0), 10);
};

const DiagramPage: React.FC = () => {
    const { mode, id } = useParams<{ mode: string, id: string }>();
    const [currentInteractionMode, setCurrentInteractionMode] = useState<string>('');
    const userRole = useSelector((state: RootState) => state.user.role);
    const roadmapModifier = useSelector((state: RootState) => state.graph.modifier);
    const navigate = useNavigate();
    const progressData = useSelector((state: RootState) => state.progress.progressData);
    const [percentage, setPercentage] = useState<number>(calculateProgress(progressData.topicsClosed, progressData.topicsCount))
    const [isModalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        if (mode) {
            setCurrentInteractionMode(mode);
        }
    }, [mode]);

    useEffect(() => {
        if (roadmapModifier) {
            setModifier(roadmapModifier);
        }
    }, [roadmapModifier])

    useEffect(() => {
        setPercentage(calculateProgress(progressData.topicsClosed, progressData.topicsCount));
    }, [progressData]);

    const handleModeChange = (value: string) => {
        setCurrentInteractionMode(value);
        navigate(`/roadmap/${value}/${id}`);
    };

    interface Option {
        value: string;
        label: string;
        disabled?: boolean;
    }

    const prepareSelectValues = (role: string | null): Option[]  => {
        if (roadmapModifier === 'Public') {
            return [
                { value: 'edit', label: 'Редактирование', disabled: true},
                { value: 'view', label: 'Просмотр' },
            ];
        }
        else if (role === 'owner') {
            return [
                { value: 'edit', label: 'Редактирование' },
                { value: 'view', label: 'Просмотр' },
            ];
        }
        else {
            return [
                { value: 'edit', label: 'Редактирование', disabled: true},
                { value: 'view', label: 'Просмотр' },
            ];
        }
    }

    const handlePublish = async() => {
        if (id) {
            await postRoadmapPublish(id);
            setModifier("Public")
        }
    }

    return (
        <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <Flex style={{ padding: '20px' }} justify="space-between">
                <Flex align="center">
                    <Button icon={<RollbackOutlined />} onClick={() => {navigate(`/`);}}>На главную</Button>
                </Flex>
                <Flex align="center">
                    {(mode === 'view' && roadmapModifier === 'Private' && userRole === 'owner') ? <Button>Скопировать</Button> : <></>}
                    {(mode === 'edit' && roadmapModifier === 'Private' && userRole === 'owner') ? <><Button style={{marginRight: '10px'}} onClick={() => setModalOpen(true)}>Пригласить</Button>
                        <AddUserModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} /></> : <></>}
                    {(mode === 'edit' && roadmapModifier === 'Private' && userRole === 'owner') ?
                        <Flex>
                            <Tooltip title="после публикации роадмап будет недоступен для редактирования" color="red" key="red">
                                <Button onClick={handlePublish}>Опубликовать</Button>
                            </Tooltip>
                        </Flex> : <></>}
                    <Select
                        value={currentInteractionMode}
                        onChange={handleModeChange}
                        options={prepareSelectValues(userRole)}
                        style={{ width: '150px', marginLeft: '25px' }}
                    />
                </Flex>
            </Flex>
            <Flex align="center" justify="space-around" style={{paddingBottom: '20px'}}>
                {mode === 'view' ?  <Progress style={{width: '95vw'}} percent={percentage} /> : <></>}
            </Flex>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {mode === 'view' ? <RoadmapViewer id = {id} /> : <DiagramEditor id = {id} />}
            </div>
        </div>
    );
};

export default DiagramPage;
