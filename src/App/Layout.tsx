import {Provider} from "react-redux";
import store from "../Redux/store.ts";
import {Outlet} from "react-router-dom";
import HeaderSection from "../Components/Header/HeaderSection.tsx";
import React from "react";
import {NotificationProvider} from "../Providers/NotificationProvider.tsx";
import MainConfigProvider from "../Providers/MainConfigProvider.tsx";

const Layout: React.FC = () => {

    return (
        <>
            <Provider store={store}>
                <MainConfigProvider>
                    <NotificationProvider>
                        <HeaderSection/>
                        <Outlet/>
                    </NotificationProvider>
                </MainConfigProvider>
            </Provider>
        </>
    )
}

export default Layout;