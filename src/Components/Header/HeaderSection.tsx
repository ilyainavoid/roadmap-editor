import React from "react";
import {ConfigProvider, Layout, Menu} from 'antd';
import {generateMenuItems} from "../../Helpers/generateMenuItems.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {menuRoutes} from "../../Consts/menuRoutes.ts";
import styles from "../Header/header.module.css"

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
            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            headerBg: 'rgb(237,244,242)',

                        },
                        Menu: {
                            darkItemSelectedBg: '#4f7e5c',
                            darkItemBg: 'rgb(237,244,242)',
                            darkItemColor: 'rgb(124,131,99)',
                            darkItemHoverColor: 'rgb(180,191,143)',
                        }
                    }

                }}>

                <Header className={styles.antLayoutHeader}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={menuItems}
                        selectedKeys={[currentKey]}
                        onClick={handleMenuClick}
                    />
                </Header>

            </ConfigProvider>
        </>
    );
};

export default HeaderLayout;