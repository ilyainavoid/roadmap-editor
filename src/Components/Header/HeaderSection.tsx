import React from "react";
import {Layout, Menu} from 'antd';
import {generateMenuItems} from "../../Helpers/generateMenuItems.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {menuRoutes} from "../../Consts/menuRoutes.ts";

const {Header} = Layout;

const HeaderLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = generateMenuItems()

    const pathToKey: { [path: string]: string } = Object.keys(menuRoutes).reduce((acc, key) => {
        const path = menuRoutes[key];
        acc[path] = key;
        return acc;
    }, {} as { [path: string]: string });

    const handleMenuClick = (e: { key: string }) => {
        const path = menuRoutes[e.key];
        if (path) navigate(path);
    };

    const currentKey = pathToKey[location.pathname];

    return (
        <>
            <Header >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={menuItems}
                    selectedKeys={[currentKey]}
                    onClick={handleMenuClick}
                />
            </Header>
        </>
    );
};

export default HeaderLayout;