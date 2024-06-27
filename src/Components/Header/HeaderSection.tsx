import React, {useEffect, useState} from "react";
import {ConfigProvider, Layout, Menu, Button} from 'antd';
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
import {routes} from "../../Consts/routes.ts";
import CreateRoadmapModal from "../Modals/CreateRoadmapModal.tsx";
import {postRoadmapCreate} from "../../API/Roadmaps/postRoadmapCreate.ts";
import SearchInput from "../SearchInput/SearchInput.tsx";

const {Header} = Layout;

const HeaderLayout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const profile = useSelector((state: RootState) => state.profile.profile);

    useEffect(() => {
        const fetchData = async () => {
            const profileInfo = await getUserProfile();
            dispatch(setProfile(profileInfo));
        };

        fetchData();
    }, [location]);

    const {leftMenuItems, rightMenuItems} = generateMenuItems(isAuth);

    const handleCreate = async (data: RoadmapCreate) => {
        let response = await postRoadmapCreate(data)
        if (response) {
            setIsOpen(false)
            navigate(routes.roadmap("edit", response))
        } else {
            console.log("error")
        }
    }

    const pathToKey: { [path: string]: string } = Object.keys(menuRoutes).reduce((acc, key) => {
        const path = menuRoutes[key];
        acc[path] = key;
        return acc;
    }, {} as { [path: string]: string });

    const handleMenuClick = (e: { key: string }) => {
        const path = menuRoutes[e.key];
        if (path && path !== routes.profile()) navigate(path);
    };

    const currentKey = pathToKey[location.pathname];

    const transformedLeftMenuItems = leftMenuItems.map(item => ({
        ...item
    }));

    const handleCreateClick = () => {
        setIsOpen(true)
    }

    const transformedRightMenuItems = rightMenuItems.map(item => {
        if (item.isDropdown) {
            return {
                key: item.key,
                label: <DropdownProfile username={profile?.username}/>,
                style: item.style,
            };
        }
        if (item.isButton) {
            return {
                key: item.key,
                label: <Button type={"primary"} onClick={handleCreateClick}>Создать</Button>,
                style: item.style,
            }
        }
        return {
            key: item.key,
            label: item.label,
            style: item.style,
        };
    });

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
                }}
            >
                <Header className={styles.antLayoutHeader}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={transformedLeftMenuItems}
                        selectedKeys={[currentKey]}
                        onClick={handleMenuClick}
                        style={{width: "40%"}}
                    />
                    <div className={styles.searchInputContainer}>
                        <SearchInput placeholder="Поиск" style={ {width:"100%",marginRight: "auto"}}/>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={transformedRightMenuItems}
                        selectedKeys={[currentKey]}
                        onClick={handleMenuClick}
                        style={{width: "25%"}}
                    />
                </Header>
            </ConfigProvider>
            <CreateRoadmapModal isOpen={isOpen} onCancel={()=>setIsOpen(false)} onSubmit={handleCreate}/>
        </>

    );
};

export default HeaderLayout;
