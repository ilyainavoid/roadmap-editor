import {Provider} from "react-redux";
import store from "../Redux/store.ts";
import {Outlet} from "react-router-dom";
import HeaderSection from "../Components/Header/HeaderSection.tsx";
import React from "react";
import {NotificationProvider} from "../Providers/NotificationProvider.tsx";

const Layout: React.FC = () => {

    return (
        <>
            <Provider store={store}>
                <NotificationProvider>
                    <HeaderSection/>
                    <Outlet/>
                </NotificationProvider>
            </Provider>
        </>
    )
}

export default Layout;