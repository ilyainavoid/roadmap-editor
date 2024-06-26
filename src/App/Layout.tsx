import {Outlet} from "react-router-dom";
import HeaderSection from "../Components/Header/HeaderSection.tsx";
import React from "react";
import {NotificationProvider} from "../Providers/NotificationProvider.tsx";
import MainConfigProvider from "../Providers/MainConfigProvider.tsx";

interface LayoutProps {
    isHeaderVisible: boolean;
}

const Layout: React.FC<LayoutProps> = ({isHeaderVisible}) => {
    return (
        <MainConfigProvider>
            <NotificationProvider>
                {isHeaderVisible && <HeaderSection/>}
                <Outlet/>
            </NotificationProvider>
        </MainConfigProvider>
    );
}

export default Layout;
