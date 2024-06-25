import React, {useEffect, useState} from "react";
import DiagramEditor from "../../Components/DiagramEditor/DiagramEditor.tsx";
import { Button, Flex, Select, Typography } from "antd";
import { CopyOutlined, RollbackOutlined } from "@ant-design/icons";
import {useParams} from "react-router-dom";
import RoadmapViewer from "../../Components/RoadmapViewer/RoadmapViewer.tsx";

const DiagramPage: React.FC = () => {
    const { mode } = useParams<{ mode: string }>();
    const [currentInteractionMode, setCurrentInteractionMode] = useState<string>('');



    useEffect(() => {
        if (mode) {
            setCurrentInteractionMode(mode);
        }
    }, [mode]);

    return (
        <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <Flex style={{ padding: '20px' }} justify="space-between">
                <Flex align="center">
                    <Button icon={<RollbackOutlined />}>На главную</Button>
                    <Typography.Title editable level={1} style={{ marginLeft: '100px', marginBottom: '5px' }}>
                        Some diagram name
                    </Typography.Title>
                </Flex>
                <Flex align="center">
                    <Button icon={<CopyOutlined />}>Клонировать диаграмму</Button>
                    <Select
                        options={[
                            { value: 'edit', label: 'Редактирование' },
                            { value: 'view', label: 'Просмотр' },
                        ]}
                        style={{ width: '150px', marginLeft: '25px' }}
                    />
                </Flex>
            </Flex>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {mode === 'view' ? <RoadmapViewer/> : <DiagramEditor/>}
            </div>
        </div>
    )
}

export default DiagramPage;
