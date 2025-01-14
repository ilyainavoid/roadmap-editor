import {Button, Card, Flex, Form, Input, Typography} from "antd";
import React from "react";
import {validationRules} from "../../Consts/validationRules.ts";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {postRegistrationUser} from "../../API/User/postRegistrationUser.ts";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../Consts/routes.ts";
import {useNotification} from "../../Providers/NotificationProvider.tsx";
import {REGISTRATION_SUCCESS} from "../../Consts/strings.ts";
import {AppDispatch} from "../../Redux/store.ts";
import {useDispatch} from "react-redux";
import {setAuth} from "../../Redux/actions/authAction.ts";

const {Title} = Typography


const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const {notify} = useNotification();
    const dispatch: AppDispatch = useDispatch();

    async function onFinish(values: RegistrationValues) {
        console.log(values);
        let result = await postRegistrationUser({ userCredentials: values });
        if (result && 'accessToken' in result && 'refreshToken' in result) {
            console.log(result);
            notify('success', REGISTRATION_SUCCESS);
            dispatch(setAuth(true));
            navigate(routes.root());
        } else {
            if (result && 'error' in result) {
                notify('error', result.error);
            }
        }
    }

    return (
        <>
            <Card className={"form-card"}>
                <Form form={form} layout="vertical" name={"registrationForm"} onFinish={onFinish} initialValues={{remember: true}}>
                    <Flex className={"title-container"}>
                        <Title>Регистрация</Title>
                    </Flex>
                    <Form.Item name={"email"} label={"Эл. почта"} rules={validationRules.emailValidation()}>
                        <Input prefix={<MailOutlined />} placeholder={"Введите email"}/>
                    </Form.Item>
                    <Form.Item name={"username"} label={"Логин"} rules={validationRules.usernameValidation()}>
                        <Input prefix={<UserOutlined/>} placeholder={"Введите имя пользователя"}/>
                    </Form.Item>
                    <Form.Item name={"password"} label={"Пароль"} rules={validationRules.passwordValidation()}>
                        <Input.Password prefix={<LockOutlined/>} placeholder={"Введите пароль"}/>
                    </Form.Item>
                    <Flex className={"btn-container"}>
                        <Button type={'primary'} htmlType={'submit'}>Войти</Button>
                    </Flex>
                    <Flex className={"text-container"}>
                        <p>Уже есть аккаунт? <Link to={routes.login()}>Вход</Link></p>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}

export default RegistrationForm;