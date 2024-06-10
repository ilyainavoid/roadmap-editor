import {createBrowserRouter, Outlet} from "react-router-dom";
import Layout from "./Layout.tsx";
import ProtectedRoute from "../Providers/ProtectedRoute.tsx";
import {routes} from "../Consts/routes.ts";
import MainPage from "../Pages/MainPage/MainPage.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                element: (
                    <ProtectedRoute>
                        <Outlet/>
                    </ProtectedRoute>
                ),
                children: [],

            },
            {
                path: routes.root(),
                element : <MainPage/>
            },
            {
                path: routes.login(),
                element: <LoginPage/>
            }
        ]
    }
])