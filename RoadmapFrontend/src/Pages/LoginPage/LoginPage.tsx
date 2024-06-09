import React from "react";
import {Flex} from "antd";
import LoginForm from "../../Components/LoginForm/LoginForm.tsx";

const LoginPage : React.FC = () => {
    return(
        <>
            <Flex className={"container"}>
                <LoginForm/>
            </Flex>
        </>
    )
}

export default LoginPage