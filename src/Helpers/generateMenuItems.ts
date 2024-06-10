import React from "react";

interface MenuItem {
    key: string;
    label: string;
    style?: React.CSSProperties;
}

export const generateMenuItems = (): MenuItem[] => {
    let menuItems: MenuItem[] = [{ key: 'main', label: 'Главная' }];

    menuItems.push(
        { key: 'registration', label: 'Регистрация', style: { marginLeft: 'auto' } },
        { key: 'login', label: 'Вход' }
    );

    return menuItems;
};
