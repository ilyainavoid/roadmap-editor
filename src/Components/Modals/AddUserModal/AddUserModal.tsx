import React, { useState } from "react";
import { Button, Modal } from "antd";
import DebounceSelect from "../../DebounceSelect/DebounceSelect.tsx";
import { getUsers } from "../../../API/Users/getUsers.ts";

interface UserValue {
    id: string;
    username: string;
}

const AddUserModal: React.FC<{ isModalOpen: boolean; setModalOpen: (isOpen: boolean) => void }> = ({ isModalOpen, setModalOpen }) => {
    const [users, setUsers] = useState<UserValue[]>([]);

    async function fetchUserList(username: string): Promise<{ key?: string; label: React.ReactNode; value: string | number }[]> {
        const users = await getUsers(username);
        return users.map((user: UserValue) => ({
            label: user.username,
            value: user.id,
        }));
    }

    const handleCancel = () => {
        setUsers([]);
        setModalOpen(false);
    };

    const handleOk = () => {
        console.log(users);
        setModalOpen(false);
    };

    const footer = [
        <Button key="back" onClick={handleCancel}>Отменить</Button>,
        <Button type="primary" key="submit" onClick={handleOk}>Сохранить</Button>
    ];

    return (
        <Modal open={isModalOpen} title="Добавить пользователей" onCancel={handleCancel} footer={footer}>
            <DebounceSelect
                mode="multiple"
                value={users.map(user => ({ label: user.username, value: user.id }))}
                fetchOptions={(search: string) => fetchUserList(search)}
                onChange={(newValue) => {
                    if (Array.isArray(newValue)) {
                        const selectedUsers = newValue.map((option) => ({
                            id: option.value as string,
                            username: option.label as string,
                        }));
                        setUsers(selectedUsers);
                    }
                }}
                style={{ width: '100%' }}
            />
        </Modal>
    );
};

export default AddUserModal;
