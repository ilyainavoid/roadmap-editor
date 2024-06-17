import {Button, Flex} from "antd";
import React, {useState} from "react";
import ListOfRoadmaps from "../../Components/ListOfRadmaps/ListOfRoadmaps.tsx";
import AddUserModal from "../../Components/Modals/AddUserModal/AddUserModal.tsx";

const MainPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>Пользователи</Button>
            <Flex className={"container"}>
                <ListOfRoadmaps />
            </Flex>
            <AddUserModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        </>

    );
};

export default MainPage