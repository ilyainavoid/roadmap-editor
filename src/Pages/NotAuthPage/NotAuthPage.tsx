import {useNavigate} from "react-router-dom";
import React from "react";
import {Button, Result} from "antd";
import {routes} from "../../Consts/routes.ts";

const NotAuthorizedPage: React.FC = () => {
    const navigate = useNavigate()

    const buttons = [
        <Button key={'toRoot'} onClick={()=> navigate(routes.root())}>На главную</Button>,
        <Button key={'toLogin'} type="primary" onClick={()=> navigate(routes.login())}>Войти</Button>,
    ];

    return(
        <>
            <Result
                status="403"
                title="403"
                subTitle="Извините, вы не авторизированиы, чтобы посетить эту страницу."
                extra={buttons}
            />
        </>
    );
}
export default NotAuthorizedPage;
