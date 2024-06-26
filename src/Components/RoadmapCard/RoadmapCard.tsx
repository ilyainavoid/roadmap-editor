import React, { useState } from "react";
import { Card, Col, Row, Space, Typography, Progress } from "antd";
import styles from './card.module.css';
import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer.ts";

const { Text, Title } = Typography;

interface RoadmapCardProps {
    roadmap: RoadmapPaged;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap }) => {
    const [isStared, setIsStared] = useState<boolean>(roadmap.isStared);
    const [starsCount, setStarsCount] = useState<number>(roadmap.starsCount);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const profile = useSelector((state: RootState) => state.profile.profile);

    const progressPercent = parseInt(((roadmap.topicsClosed / roadmap.topicCount) * 100).toFixed(0), 10);

    const handleStarClick = (event: React.MouseEvent) => {
        if (isAuth && profile?.id !== roadmap.user.id) {
            event.stopPropagation();
            setIsStared(true);
            setStarsCount(starsCount + 1);
        }
    }

    const handleUnstarClick = (event: React.MouseEvent) => {
        if (isAuth && profile?.id !== roadmap.user.id) {
            event.stopPropagation();
            setIsStared(false);
            setStarsCount(starsCount - 1);
        }
    }

    const handleCardClick = () => {
        // Implement navigation logic
        console.log("Navigate to roadmap details");
    }

    const handleAuthorClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        // Implement navigation logic
        console.log("Navigate to user profile");
    }

    return (
        <Card hoverable className={styles.roadmapCard} onClick={handleCardClick}>
            <Title level={4} className={styles.title} ellipsis>
                {roadmap.name}
            </Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={18} lg={18}>
                    <Text className={styles.description} ellipsis>{roadmap.description}</Text>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                    <Space direction="vertical">
                        <Space className={styles.user} onClick={handleAuthorClick}>
                            <UserOutlined />
                            <Text className={styles.text} ellipsis>{roadmap.user.username}</Text>
                        </Space>
                        <Space>
                            {isStared ? (
                                <StarFilled className={"star"} onClick={handleUnstarClick} />
                            ) : (
                                <StarOutlined className={"unstar"} onClick={handleStarClick} />
                            )}
                            <Text>{starsCount}</Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
            {(isAuth && progressPercent > 0) && (<Progress percent={progressPercent} />)}
        </Card>
    );
};

export default RoadmapCard;