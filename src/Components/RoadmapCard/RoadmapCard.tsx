import React from "react";
import {Card, Col, Row, Space, Typography} from "antd";
import styles from './card.module.css'
import {LikeOutlined, UserOutlined} from "@ant-design/icons";

const {Text,Title} = Typography;

export interface Roadmap {
    title: string;
    description: string;
    author: string;
    likes: number;
}

interface RoadmapCardProps {
    roadmap: Roadmap;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap }) => {
    return (
        <Card hoverable className={styles.roadmapCard}>
            <Title level={4}>{roadmap.title}</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16} lg={16}>
                    <p>{roadmap.description}</p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <Space direction="vertical">
                        <Space>
                            <UserOutlined />
                            <Text>{roadmap.author}</Text>
                        </Space>
                        <Space>
                            <LikeOutlined />
                            <Text>{roadmap.likes} Likes</Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};


export default RoadmapCard;