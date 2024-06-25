import React, {useEffect} from "react";
import {ConfigProvider, Layout, Menu} from 'antd';
import {generateMenuItems} from "../../Helpers/generateMenuItems";
import {useLocation, useNavigate} from "react-router-dom";
import {menuRoutes} from "../../Consts/menuRoutes";
import styles from "../Header/header.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux/rootReducer";
import DropdownProfile from "../DropdownProfile/DropDownProfile.tsx";
import {getUserProfile} from "../../API/User/getUserProfile.ts";
import {setProfile} from "../../Redux/actions/profileAction.ts";
import {AppDispatch} from "../../Redux/store.ts";

const {Header} = Layout;

const HeaderLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const profile = useSelector((state: RootState) => state.profile.profile)

    useEffect(() => {
        const fetchData = async () => {

            const profileInfo = await getUserProfile()
            dispatch(setProfile(profileInfo))
        }

        fetchData()
    }, [location]);

    const menuItems = generateMenuItems(isAuth);

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

    const transformedMenuItems = menuItems.map(item => {
        if (item.isDropdown) {
            return {
                key: item.key,
                label: <DropdownProfile username={profile?.username}/>,
                style: item.style,
            };
        }
        return {
            key: item.key,
            label: item.label,
            style: item.style,
        };
    });

    return (
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
            }}
        >
            <Header className={styles.antLayoutHeader}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={transformedMenuItems}
                    selectedKeys={[currentKey]}
                    onClick={handleMenuClick}
                />
            </Header>
        </ConfigProvider>
    );
};

export default HeaderLayout;
