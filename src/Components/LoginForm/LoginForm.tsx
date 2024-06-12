import React from "react";
import {Card, Flex, Form, Input, Typography} from "antd";
import {validationRules} from "../../Consts/validationRules.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import PrimaryButton from "../Buttons/PrimaryButton.tsx";
import {postLoginUser} from "../../API/User/postLoginUser.ts";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../Consts/routes.ts";
import {useNotification} from "../../Providers/NotificationProvider.tsx";
import {LOGIN_FAIL, LOGIN_SUCCESS} from "../../Consts/strings.ts";
import {useDispatch} from "react-redux";
import {setAuth} from "../../Redux/actions/authAction.ts";
import {AppDispatch} from "../../Redux/store.ts";

const {Title} = Typography


const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const {notify} = useNotification();
    const dispatch: AppDispatch = useDispatch();

    async function onFinish(values: LoginValues) {
        console.log(values);
        let result = await postLoginUser({userCredentials: values})
        if (result) {
            console.log(result)
            notify("success", LOGIN_SUCCESS)
            dispatch(setAuth(true));
            navigate(routes.root());
        } else {
            notify("error", LOGIN_FAIL)
        }
    }

    return (
        <>
            <Card className={"form-card"}>
                <Form form={form} layout="vertical" name={"loginForm"} onFinish={onFinish}
                      initialValues={{remember: true}}>
                    <Flex className={"title-container"}>
                        <Title>Вход</Title>
                    </Flex>
                    <Form.Item name={"username"} label={"Логин"} rules={validationRules.emailOrUsernameValidation()}>
                        <Input prefix={<UserOutlined/>} placeholder={"Введите email или имя пользователя"}/>
                    </Form.Item>
                    <Form.Item name={"password"} label={"Пароль"} rules={validationRules.passwordValidation()}>
                        <Input.Password prefix={<LockOutlined/>} placeholder={"Введите пароль"}/>
                    </Form.Item>
                    <Flex className={"btn-container"}>
                        <PrimaryButton text={"Войти"}/>
                    </Flex>
                    <Flex className={"text-container"}>
                        <p>Еще нет аккаунта? <Link to={routes.registration()}>Регистрация</Link></p>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}

export default LoginForm;