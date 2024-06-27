import React from "react";
import {Modal, Form, Input, Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import {validationRules} from "../../Consts/validationRules.ts";

interface ModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (values: RoadmapCreate) => void;
}

const CreateRoadmapModal: React.FC<ModalProps> = ({isOpen, onCancel, onSubmit}) => {
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

    const footer = [
        <Button key="back" onClick={onCancel}>Отменить</Button>,
        <Button type="primary" key="submit" onClick={handleOk}>Создать</Button>
    ];

    return (
        <Modal
            title="Создать дорожную карту"
            open={isOpen}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
            footer={footer}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Название"
                    name="name"
                    rules={validationRules.roadmapNameValidation()}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <TextArea showCount maxLength={80} style={{ height: 120, resize: 'none' }}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateRoadmapModal;
