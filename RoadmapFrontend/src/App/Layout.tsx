import {Provider} from "react-redux";
import store from "../Redux/store.ts";
import {Outlet} from "react-router-dom";
import HeaderSection from "../Components/Header/HeaderSection.tsx";
import React from "react";

const Layout: React.FC = () => {

    return (
        <>
            <Provider store={store}>
                <HeaderSection/>
                <Outlet/>
            </Provider>
        </>
    )

}

export default Layout;