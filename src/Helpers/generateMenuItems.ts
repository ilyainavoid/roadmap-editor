import React from "react";

interface MenuItem {
    key: string;
    label: string;
    style?: React.CSSProperties;
    isDropdown?: boolean
}

export const generateMenuItems = (isAuth: boolean): MenuItem[] => {
    let menuItems: MenuItem[] =
        [
            {key: 'main', label: 'Главная'},
            {key: 'roadmaps', label: 'Роадмапы'}
        ];

    if (isAuth) {
        menuItems.push(
            {key: 'stared', label: 'Отмеченные'},
            {key: 'private', label: 'Доступные'},
            {key: 'profile', label: 'Профиль', style: {marginLeft: 'auto'}, isDropdown: true}
        );
    } else {
        menuItems.push(
            {key: 'registration', label: 'Регистрация', style: {marginLeft: 'auto'}},
            {key: 'login', label: 'Вход'}
        );
    }

    return menuItems;
};
