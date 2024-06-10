import {Flex} from "antd";
import React from "react";
import RegistrationForm from "../../Components/RegistrationPage/RegistrationPage.tsx";

const RegistrationPage: React.FC = () => {
    return (
        <>
            <Flex className={"container"}>
                <RegistrationForm/>
            </Flex>
        </>
    )
}

export default RegistrationPage;