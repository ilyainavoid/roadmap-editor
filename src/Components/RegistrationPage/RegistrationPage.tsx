import {Card, Flex, Form, Input, Typography} from "antd";
import React from "react";
import {validationRules} from "../../Consts/validationRules.ts";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import PrimaryButton from "../Buttons/PrimaryButton.tsx";
import {postRegistrationUser} from "../../API/postRegistrationUser.ts";
const {Title} = Typography

interface RegistrationValues {
    email: string;
    username: string;
    password: string;
}

const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();



    async function onFinish(values: RegistrationValues) {
        console.log(values);
        let result = await postRegistrationUser({userCredentials: values})
        if(result){
            console.log(result)
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
                        <PrimaryButton text={"Зарегистрироваться"}/>
                    </Flex>
                    <Flex className={"text-container"}>
                        <p>Уже есть аккаунт? <a>Вход</a></p>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}

export default RegistrationForm;