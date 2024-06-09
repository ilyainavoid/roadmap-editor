import React from "react";
import {Card, Flex, Form, Input, Typography} from "antd";
import {validationRules} from "../../Consts/validationRules.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import PrimaryButton from "../Buttons/PrimaryButton.tsx";
import {postLoginUser} from "../../API/postLoginUser.ts";

const {Title} = Typography

interface LoginValues{
    username: string,
    password: string
}


const LoginForm: React.FC = () => {
    const [form] = Form.useForm();



    async function onFinish(values: LoginValues) {
        console.log(values);
        let result = await postLoginUser({userCredentials: values})
        if(result){
            console.log(result)
        }
        else {

        }
    }

    return (
        <>
            <Card className={"form-card"}>
                <Form form={form} layout="vertical" name={"loginForm"} onFinish={onFinish} initialValues={{remember: true}}>
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
                        <p>Еще нет аккаунта? <a>Регистрация</a></p>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}

export default LoginForm;