import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Pagination, Typography, Avatar, Space, Row, Col } from "antd";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import { UserOutlined } from "@ant-design/icons";
import styles from '../UsersRoadmapsPage/usersRoadmap.module.css'

const { Title, Text } = Typography;

const UsersRoadmapsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState(50); // Example total, replace with actual total count

    const page = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    // Example user information
    const userInfo = {
        name: "John Doe",
        email: "john@doe.com",
    };

    return (
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "20px", padding: "0 20px" }}>
            <Col xs={24} md={8} lg={6} style={{ display: "flex", justifyContent: "center" }}>
                <Card className={styles.card} >
                    <Space direction="vertical" align="center" style={{ width: "100%" }}>
                        <Avatar size={180} className="avatar" icon={<UserOutlined />} />
                        <div style={{ textAlign: 'center', marginTop: "20px" }}>
                            <Title level={3}>{userInfo.name}</Title>
                            <Text>{userInfo.email}</Text>
                        </div>
                    </Space>
                </Card>
            </Col>
            <Col xs={24} md={16} lg={18}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={2}>Роадмапы</Title>
                    <ListOfRoadmaps />
                    {total > 0 && (
                        <div style={{width: "80%"}} className="pagination-container">
                            <Pagination
                                current={currentPage}
                                onChange={handlePageChange}
                                total={total}
                            />
                        </div>
                    )}
                </Space>
            </Col>
        </Row>
    );
};

export default UsersRoadmapsPage;
