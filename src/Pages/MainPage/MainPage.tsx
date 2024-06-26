import {Flex, Typography} from "antd";
import React from "react";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../Redux/rootReducer.ts";
import {WELCOME_STRING} from "../../Consts/strings.ts";

const {Title, Text} = Typography;

const MainPage: React.FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    return (
        <>
            <Flex className="container" vertical>
                {isAuth ? (
                    <>
                        <Title level={1}>Недавно посещенные</Title>
                        <ListOfRoadmaps/>
                    </>


                ) : (<>
                        <Text>{WELCOME_STRING}</Text>
                    </>

                )}
            </Flex>
        </>

    );
};

export default MainPage