import React, {useEffect, useState} from "react";
import {Avatar, Button, Card, Col, Form, Input, Row, Space, Spin, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import styles from "../ProfileCard/profile.module.css";
import {getUserProfile} from "../../API/User/getUserProfile";
import {putEditProfile} from "../../API/User/putEditProfile.ts";
import {useNotification} from "../../Providers/NotificationProvider.tsx";
import {
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS
} from "../../Consts/strings.ts";
import EditPasswordModal from "../Modals/EditPasswordModal.tsx";
import {putChangePassword} from "../../API/User/putChangePassword.ts";

const {Title, Text} = Typography;

const ProfileCard: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const {notify} = useNotification();

    const fetchData = async () => {
        const data = await getUserProfile();
        setUserInfo(data);
        form.setFieldsValue(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditPasswordClick = () => {
        setIsEditingPassword(true);
    };

    const handleCancelPasswordEdit = () => {
        setIsEditingPassword(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const handleFormSubmit = async (values: EditProfile) => {
        try {
            const response = await putEditProfile({values});

            if (response && response.status === 200) {
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo!,
                    email: values.email,
                    username: values.username,
                }));
                setIsEditing(false);
                notify("success", EDIT_PROFILE_SUCCESS);
            } else {
                notify("error", EDIT_PROFILE_FAIL);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            notify("error", EDIT_PROFILE_FAIL);
        }
    };


    const handlePasswordSubmit = async (values: PasswordChanges) => {
        try {
            const response = await putChangePassword({values});

            if (response && response.status === 200) {
                setIsEditingPassword(false);
                notify("success", CHANGE_PASSWORD_SUCCESS);
            } else {
                notify("error", CHANGE_PASSWORD_FAIL);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            notify("error", CHANGE_PASSWORD_FAIL);
        }
    };

    if (!userInfo) {
        return <Spin size="large"/>;
    }

    return (
        <Card className={styles.card}>
            <Row align="middle" gutter={[16, 16]}>
                <Col xs={24} md={8} className={styles.avatarContainer}>
                    <Avatar size={180} className={styles.avatar} icon={<UserOutlined/>}/>
                </Col>
                <Col xs={24} md={16}>
                    {isEditing ? (
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFormSubmit}
                            initialValues={{email: userInfo.email, username: userInfo.username}}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{required: true, message: "Введите почту"}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{required: true, message: "Введите имя"}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        Сохранить
                                    </Button>
                                    <Button onClick={handleCancelClick}>
                                        Отменить
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Space direction="vertical" size="middle">
                            <div className={styles.infoContainer}>
                                <Title level={4}>Email:</Title>
                                <Text style={{fontSize: 20}}>{userInfo.email}</Text>
                            </div>
                            <div className={styles.infoContainer}>
                                <Title level={4}>Username:</Title>
                                <Text style={{fontSize: 20}}>{userInfo.username}</Text>
                            </div>
                            <Space direction="horizontal" size="middle" wrap>
                                <Button type="primary" onClick={handleEditClick}>
                                    Редактировать
                                </Button>
                                <Button onClick={handleEditPasswordClick}>
                                    Сменить пароль
                                </Button>
                            </Space>
                        </Space>
                    )}
                </Col>
            </Row>
            <EditPasswordModal
                isOpen={isEditingPassword}
                onCancel={handleCancelPasswordEdit}
                onSubmit={handlePasswordSubmit}
            />
        </Card>
    );
};

export default ProfileCard;
