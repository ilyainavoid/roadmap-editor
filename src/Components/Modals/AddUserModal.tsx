import React, { useState } from "react";
import { Button, Modal, Tabs, TabsProps, Space } from "antd";
import DebounceSelect from "../DebounceSelect/DebounceSelect.tsx";
import { getUsers } from "../../API/Users/getUsers.ts";
import { getRoadmapsUsers } from "../../API/RoadmapAccess/getRoadmapsUsers.ts";
import { useParams } from "react-router-dom";
import {postRoadmapAddAccess} from "../../API/RoadmapAccess/postRoadmapAddAccess.ts";
import {postRoadmapRemoveAccess} from "../../API/RoadmapAccess/postRoadmapRemoveAccess.ts";

interface UserValue {
    id: string;
    username: string;
}

const AddUserModal: React.FC<{ isModalOpen: boolean; setModalOpen: (isOpen: boolean) => void }> = ({ isModalOpen, setModalOpen }) => {
    const [usersToAdd, setUsersToAdd] = useState<UserValue[]>([]);
    const [usersToDelete, setUsersToDelete] = useState<UserValue[]>([]);
    const { id } = useParams<{ id: string }>();
    const [tabKey, setTabKey] = useState<string>('add');

    async function fetchUserList(username: string): Promise<{ key?: string; label: React.ReactNode; value: string | number }[]> {
        const users = await getUsers(username);
        return users.map((user: UserValue) => ({
            label: user.username,
            value: user.id,
        }));
    }

    async function fetchUserListWithAccess(username: string): Promise<{ key?: string; label: React.ReactNode; value: string | number }[]> {
        const users = await getRoadmapsUsers(id, username);
        return users.map((user: UserValue) => ({
            label: user.username,
            value: user.id,
        }));
    }

    const handleCancel = () => {
        setUsersToAdd([]);
        setUsersToDelete([]);
        setModalOpen(false);
    };

    const addUsers = async () => {
        console.log('Adding users:', usersToAdd);
        const userIdsToAdd = usersToAdd.map(user => user.id);
        console.log('User IDs to add:', userIdsToAdd);
        setUsersToAdd([]);
        let response = await postRoadmapAddAccess(id, userIdsToAdd)
        if (response) {
            setModalOpen(false);
            setUsersToAdd([]);
            setUsersToDelete([]);
        }
        else {
            console.log("error")
        }
    };

    const deleteUsers = async () => {
        console.log('Deleting users:', usersToDelete);
        const userIdsToDelete = usersToDelete.map(user => user.id);
        console.log('User IDs to delete:', userIdsToDelete);
        let response = await postRoadmapRemoveAccess(id, userIdsToDelete)
        if (response) {
            setModalOpen(false);
            setUsersToAdd([]);
            setUsersToDelete([]);
        }
        else {
            console.log("error")
        }

    };

    const footer = (
        <Space>
            <Button key="cancel" onClick={handleCancel}>Отменить</Button>
            {tabKey === 'add' ? (
                <Button type="primary" key="add" onClick={addUsers}>Добавить</Button>
            ) : (
                <Button type="primary" key="delete" onClick={deleteUsers}>Удалить</Button>
            )}
        </Space>
    );

    const addTabContent = (
        <DebounceSelect
            mode="multiple"
            value={usersToAdd.map(user => ({ label: user.username, value: user.id }))}
            fetchOptions={(search: string) => fetchUserList(search)}
            onChange={(newValue) => {
                if (Array.isArray(newValue)) {
                    const selectedUsers = newValue.map((option) => ({
                        id: option.value as string,
                        username: option.label as string,
                    }));
                    setUsersToAdd(selectedUsers);
                }
            }}
            style={{ width: '100%' }}
        />
    );

    const deleteTabContent = (
        <DebounceSelect
            mode="multiple"
            value={usersToDelete.map(user => ({ label: user.username, value: user.id }))}
            fetchOptions={(search: string) => fetchUserListWithAccess(search)}
            onChange={(newValue) => {
                if (Array.isArray(newValue)) {
                    const selectedUsers = newValue.map((option) => ({
                        id: option.value as string,
                        username: option.label as string,
                    }));
                    setUsersToDelete(selectedUsers);
                }
            }}
            style={{ width: '100%' }}
        />
    );

    const tabItems: TabsProps['items'] = [
        {
            key: 'add',
            label: 'Добавить',
            children: addTabContent,
        },
        {
            key: 'delete',
            label: 'Удалить',
            children: deleteTabContent,
        },
    ];

    return (
        <Modal destroyOnClose open={isModalOpen} title="Настроить доступ" onCancel={handleCancel} footer={footer}>
            <Tabs activeKey={tabKey} onChange={setTabKey} items={tabItems} />
        </Modal>
    );
};

export default AddUserModal;
