import React from "react";
import {Modal, Form, Input, Button} from "antd";
import TextArea from "antd/es/input/TextArea";

interface ModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (values: RoadmapCreate) => void;
    name: string,
    description: string,
}

const EditRoadmapModal: React.FC<ModalProps> = ({isOpen, onCancel, onSubmit, name, description}) => {
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
        <Button type="primary" key="submit" onClick={handleOk}>Сохранить</Button>
    ];

    return (
        <Modal
            title="Редактирование дорожной карты"
            open={isOpen}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
            footer={footer}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: name,
                    description: description
                }}
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
                >
                    <TextArea showCount maxLength={80} style={{ height: 120, resize: 'none' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRoadmapModal;
