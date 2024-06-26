import React, { useEffect, useState } from "react";
import DiagramEditor from "../../Components/DiagramEditor/DiagramEditor.tsx";
import { Button, Flex, Select, Typography } from "antd";
import { CopyOutlined, RollbackOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import RoadmapViewer from "../../Components/RoadmapViewer/RoadmapViewer.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer.ts";

const DiagramPage: React.FC = () => {
    const { mode, id } = useParams<{ mode: string, id: string }>();
    const [currentInteractionMode, setCurrentInteractionMode] = useState<string>('');
    const userRole = useSelector((state: RootState) => state.user.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (mode) {
            setCurrentInteractionMode(mode);
        }
    }, [mode]);

    const handleModeChange = (value: string) => {
        setCurrentInteractionMode(value);
        navigate(`/roadmap/${value}`);
    };

    interface Option {
        value: string;
        label: string;
        disabled?: boolean;
    }

    const prepareSelectValues = (role: string | null): Option[]  => {
        if (role === 'owner') {
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

    return (
        <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <Flex style={{ padding: '20px' }} justify="space-between">
                <Flex align="center">
                    <Button icon={<RollbackOutlined />} onClick={() => {navigate(`/`);}}>На главную</Button>
                    <Typography.Title editable level={1} style={{ marginLeft: '100px', marginBottom: '5px' }}>
                        Some roadmap name
                    </Typography.Title>
                </Flex>
                <Flex align="center">
                    <Button icon={<CopyOutlined />}>Клонировать диаграмму</Button>
                    <Select
                        value={currentInteractionMode}
                        onChange={handleModeChange}
                        options={prepareSelectValues(userRole)}
                        style={{ width: '150px', marginLeft: '25px' }}
                    />
                </Flex>
            </Flex>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {mode === 'view' ? <RoadmapViewer /> : <DiagramEditor />}
            </div>
        </div>
    );
};

export default DiagramPage;
