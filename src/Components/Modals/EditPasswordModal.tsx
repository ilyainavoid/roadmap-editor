import React from "react";
import {Modal, Form, Input} from "antd";
import {validationRules} from "../../Consts/validationRules.ts";

interface EditPasswordModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (values: PasswordChanges) => void;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({isOpen, onCancel, onSubmit,}) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            form.resetFields();
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    return (
        <Modal
            title="Редактировать пароль"
            open={isOpen}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Старый пароль"
                    name="oldPassword"
                    rules={validationRules.passwordValidation()}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="Новый Пароль"
                    name="newPassword"
                    rules={validationRules.passwordValidation()}
                >
                    <Input.Password/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPasswordModal;
