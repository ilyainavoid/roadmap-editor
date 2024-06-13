import {Flex} from "antd";
import React, {useEffect} from "react";
import RegistrationForm from "../../Components/RegistrationPage/RegistrationForm.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../Redux/rootReducer.ts";
import {useNavigate} from "react-router-dom";
import {routes} from "../../Consts/routes.ts";

const RegistrationPage: React.FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate(routes.root());
        }
    }, [isAuth, navigate]);

    return (
        <>
            <Flex className={"container"}>
                <RegistrationForm/>
            </Flex>
        </>
    )
}

export default RegistrationPage;