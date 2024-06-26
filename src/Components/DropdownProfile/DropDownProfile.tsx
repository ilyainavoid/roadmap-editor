import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Space} from 'antd';
import {postLogoutUser} from '../../API/User/postLogoutUser.ts';
import { useNavigate} from "react-router-dom";
import {routes} from "../../Consts/routes.ts";

interface DropdownProfileProps {
    username?: string;
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({username}) => {
    const navigate = useNavigate()


    const logout = async () => {
        try {
            let response = await postLogoutUser();
            if (response && response.status === 200) {
                setTimeout(() => {
                    navigate(routes.login());
                }, 500);
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Профиль',
            onClick: () => {
                navigate(routes.profile());
            },
        },
        {
            key: '2',
            label: "Мои роадмапы",
            onClick: () => {
                navigate(routes.profile());
            },
        },
        {
            key: '3',
            danger: true,
            label: 'Выйти',
            onClick: ()=> logout(),
        },
    ];

    return (
        <Dropdown menu={{items}}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {username}
                    <DownOutlined/>
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropdownProfile;
