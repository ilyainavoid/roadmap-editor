import {Button, Flex, FloatButton, Space, Typography} from "antd";
import React, {useEffect, useState} from "react";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../Redux/rootReducer.ts";
import {useNavigate} from "react-router-dom";
import {routes} from "../../Consts/routes.ts";
import {WELCOME_STRING} from "../../Consts/strings.ts";
import {getRecentRoadmaps} from "../../API/Roadmaps/getRecentRoadmaps.ts";

const {Title} = Typography;

const MainPage: React.FC = () => {
    const [roadmaps, setRoadmaps] = useState([])
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const navigate = useNavigate();

    const fetchData = async () => {
        let response = await getRecentRoadmaps();
        if (response.roadmaps) {
            setRoadmaps(response.roadmaps);
        }

    }

    useEffect(() => {
        fetchData()
    }, []);


    return (

        <>
            {(isAuth && roadmaps.length > 0) ? (
                <Flex className="container" vertical>
                    <Title level={1}>Недавно посещенные</Title>
                    <ListOfRoadmaps roadmaps={roadmaps}/>
                </Flex>
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                    <Space direction="vertical" style={{textAlign: 'center', width: '100%'}}>
                        <Title level={1} style={{fontSize: '24px'}}>
                            {WELCOME_STRING[0]}
                        </Title>
                        <Title level={1} style={{fontSize: '24px'}}>
                            {WELCOME_STRING[1]}
                        </Title>
                        {!isAuth && (
                            <Space direction="horizontal"
                                   style={{justifyContent: 'center', width: '100%', marginTop: "20px"}}>
                                <Button size={"large"} type="primary"
                                        onClick={() => navigate(routes.registration())}>Зарегистрироваться</Button>
                                <Button size={"large"} onClick={() => navigate(routes.login())}>Войти</Button>
                            </Space>
                        )}
                    </Space>
                    <FloatButton.BackTop />
                </div>
            )}
        </>
    );
};

export default MainPage;
