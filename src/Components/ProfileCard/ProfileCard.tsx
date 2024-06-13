import React, {useEffect, useState} from "react";
import {Avatar, Card, Col, Row, Space, Spin, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from "../ProfileCard/profile.module.css"
import {getUserProfile} from "../../API/User/getUserProfile.ts";

const {Title, Text} = Typography;

const ProfileCard: React.FC = () => {

    const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

    const fetchData = async () => {
        const data = await getUserProfile();
        setUserInfo(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!userInfo) {
        return <Spin size="large"/>;
    }

    return (
        <>
            <Card className={styles.card}>
                <Row align="middle" wrap>
                    <Col style={{position: 'relative', width: 'fit-content', marginRight: '50px'}}>
                        <Avatar size={180} className={styles.avatar} icon={<UserOutlined/>}/>
                    </Col>
                    <Col style={{width: '50%'}}>
                        <Space wrap>
                            <Space direction={"vertical"} wrap>
                                <Space direction={'vertical'}>
                                    <Title level={4}>Username:</Title>
                                    <Text style={{fontSize: 20}}>{userInfo.username}</Text>
                                </Space>
                                <Space direction={"vertical"}>
                                    <Title level={4}>Email:</Title>
                                    <Text style={{fontSize: 20}}>{userInfo.email}</Text>
                                </Space>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default ProfileCard;