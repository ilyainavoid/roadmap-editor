import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Card, Pagination, Typography, Avatar, Space, Row, Col, Empty, FloatButton} from "antd";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {UserOutlined} from "@ant-design/icons";
import styles from '../UsersRoadmapsPage/usersRoadmap.module.css'
import {getUsersRoadmaps} from "../../API/Users/getUsersRoadmaps.ts";
import {getUsers} from "../../API/Users/getUsers.ts";

const {Title, Text} = Typography;

const UsersRoadmapsPage: React.FC = () => {
    const {username} = useParams<string>();
    const [user, setUser] = useState<UserProfile>();
    const [roadmaps, setRoadmaps] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState(0);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(page);

    const fetchUser = async (username: undefined | string) => {
        if (username) {
            let response = await getUsers(username);
            if (response && Array.isArray(response)) {
                const user = response.find(user => user.username === username);
                if (user) {
                    setUser(user)
                }
            } else {
                console.log("error")
            }
        } else {
            console.log("error")
        }

    }

    const fetchRoadmaps = async (id: undefined | string, page: number) => {
        if (id) {
            let response = await getUsersRoadmaps(id, page);
            if(response.roadmaps){
                setRoadmaps(response.roadmaps);
                setTotal(response.pagination.count);
            }
        } else {
            console.log("error")
        }
    }


    useEffect(() => {
        fetchUser(username)
        fetchRoadmaps(user?.id, page)
        setCurrentPage(page);
    }, [page, user, username]);

    const handlePageChange = (page: number) => {
        setSearchParams({page: page.toString()});
    };


    return (
        <Row gutter={[16, 16]} justify="center" style={{marginTop: "20px", padding: "0 20px"}}>
            <Col xs={24} md={8} lg={6} style={{display: "flex", justifyContent: "center"}}>
                <Card className={styles.card}>
                    <Space direction="vertical" align="center" style={{width: "100%"}}>
                        <Avatar size={180} className="avatar" icon={<UserOutlined/>}/>
                        <div className={styles.ellipsisContainer}>
                            <Title ellipsis level={3} className={styles.ellipsisText}>{user?.username}</Title>
                            <Text ellipsis className={styles.ellipsisText}>{user?.email}</Text>
                        </div>
                    </Space>
                </Card>
            </Col>
            <Col xs={24} md={16} lg={18}>
                <Space direction="vertical" style={{width: '100%'}}>
                    <Title level={2}>Роадмапы</Title>
                    {
                        roadmaps.length > 0 ?
                            (<ListOfRoadmaps roadmaps={roadmaps}/>)
                            : (<Empty/>)}
                    {total > 1 && (
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
            <FloatButton.BackTop />
        </Row>
    );
};

export default UsersRoadmapsPage;
