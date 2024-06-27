import React from "react";
import {Modal, Button, Typography} from "antd";

const {Text} = Typography;

interface ModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    name: string
}

const DeleteRoadmapModal: React.FC<ModalProps> = ({isOpen, onCancel, onSubmit, name}) => {


    const footer = [
        <Button key="back" onClick={onCancel}>Отменить</Button>,
        <Button danger={true} type="primary" key="submit" onClick={onSubmit}>Удалить</Button>
    ];

    return (
        <Modal
            title="Удалить дорожную карту"
            open={isOpen}
            onCancel={onCancel}
            onOk={onSubmit}
            destroyOnClose
            footer={footer}
        >
            <Text>Вы действителтно хотите удалить <Text italic>{name}?</Text></Text>
        </Modal>
    );
};

export default DeleteRoadmapModal;
