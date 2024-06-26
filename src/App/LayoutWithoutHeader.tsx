import {Provider} from "react-redux";
import store from "../Redux/store.ts";
import {Outlet} from "react-router-dom";
import React from "react";
import {NotificationProvider} from "../Providers/NotificationProvider.tsx";
import MainConfigProvider from "../Providers/MainConfigProvider.tsx";

const LayoutWithoutHeader: React.FC = () => {

    return (
        <>
            <Provider store={store}>
                <MainConfigProvider>
                    <NotificationProvider>
                        <Outlet/>
                    </NotificationProvider>
                </MainConfigProvider>
            </Provider>
        </>
    )
}

export default LayoutWithoutHeader;