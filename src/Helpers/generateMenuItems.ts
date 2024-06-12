import React from "react";

interface MenuItem {
    key: string;
    label: string;
    style?: React.CSSProperties;
}

export const generateMenuItems = (isAuth: boolean): MenuItem[] => {
    let menuItems: MenuItem[] = [{key: 'main', label: 'Главная'}];

    if (isAuth) {
        menuItems.push(
            {key: 'profile', label: 'Профиль', style: {marginLeft: 'auto'}},
            {key: 'logout', label: 'Выйти'}
        )
    } else {
        menuItems.push(
            {key: 'registration', label: 'Регистрация', style: {marginLeft: 'auto'}},
            {key: 'login', label: 'Вход'}
        );
    }


    return menuItems;
};
