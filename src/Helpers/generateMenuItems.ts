import React from "react";

interface MenuItem {
    key: string;
    label: string | JSX.Element;
    style?: React.CSSProperties;
    isDropdown?: boolean;
    isSearch?: boolean;
    isButton?: boolean;
}

interface MenuItems {
    leftMenuItems: MenuItem[];
    rightMenuItems: MenuItem[];
}

export const generateMenuItems = (isAuth: boolean): MenuItems => {
    const leftMenuItems: MenuItem[] = [
        {key: 'main', label: 'Главная'},
        {key: 'roadmaps', label: 'Роадмапы'},
    ];

    const rightMenuItems: MenuItem[] = [];

    if (isAuth) {
        leftMenuItems.push({key: 'stared', label: 'Отмеченные'},
            {key: 'private', label: 'Доступные'},)
        rightMenuItems.push(
            {key: 'create', label:"", style: {marginLeft: "auto"}, isButton:true},
            {key: 'profile', label: "", isDropdown: true}
        );
    } else {
        rightMenuItems.push(
            {key: 'registration', label: 'Регистрация', style: {marginLeft: "auto"}},
            {key: 'login', label: 'Вход'}
        );
    }

    return {leftMenuItems, rightMenuItems};
};
