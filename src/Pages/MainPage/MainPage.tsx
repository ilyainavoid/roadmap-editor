import { Button, Space, Typography } from "antd";
import React from "react";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../../Consts/routes.ts";
import { WELCOME_STRING } from "../../Consts/strings.ts";

const { Title } = Typography;

const MainPage: React.FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
                {isAuth ? (
                    <>
                        <Title level={1}>Недавно посещенные</Title>
                        <ListOfRoadmaps />
                    </>
                ) : (
                    <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
                        <Title level={1} style={{ fontSize: '24px' }}>
                            Привет, ты выбрал правильный путь
                        </Title>
                        <Title level={1} style={{ fontSize: '24px' }}>
                            Создавай дорожные карты, делись ими и изучай новое!
                        </Title>

                        <Space direction="horizontal" style={{ justifyContent: 'center', width: '100%', marginTop: "20px" }}>
                            <Button type="primary" onClick={() => navigate(routes.registration())}>Зарегистрироваться</Button>
                            <Button onClick={() => navigate(routes.login())}>Войти</Button>
                        </Space>
                    </Space>
                )}
            </Space>
        </div>
    );
};

export default MainPage;
