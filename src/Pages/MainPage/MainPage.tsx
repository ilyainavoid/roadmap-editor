import {Flex} from "antd";
import React from "react";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";

const MainPage: React.FC = () => {
    return (
        <Flex className={"container"}>
            <ListOfRoadmaps />
        </Flex>
    );
};

export default MainPage