import React from "react";
import {postLogoutUser} from "../API/User/postLogoutUser.ts";
import {routes} from "../Consts/routes.ts";

interface MenuItem {
    key: string;
    label: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const generateMenuItems = (isAuth: boolean, navigate: any): MenuItem[] => {
    let menuItems: MenuItem[] = [{ key: 'main', label: 'Главная' }];

    if (isAuth) {
        menuItems.push(
            { key: 'profile', label: 'Профиль', style: { marginLeft: 'auto' } },
            { key: 'logout', label: 'Выйти', onClick: async () => await handleLogout(navigate) }
        );
    } else {
        menuItems.push(
            { key: 'registration', label: 'Регистрация', style: { marginLeft: 'auto' } },
            { key: 'login', label: 'Вход' }
        );
    }

    return menuItems;
};

const handleLogout = async (navigate: any) => {
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