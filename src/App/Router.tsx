import { createBrowserRouter, Outlet } from "react-router-dom";
import ProtectedRoute from "../Providers/ProtectedRoute.tsx";
import { routes } from "../Consts/routes.ts";
import MainPage from "../Pages/MainPage/MainPage.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";
import Layout from "./Layout.tsx";
import DiagramPage from "../Pages/DiagramPage/DiagramPage.tsx";
import DiagramProtectedRoute from "../Providers/DiagramProtectedRoute.tsx";
import PublicRoadmapPage from "../Pages/PublicRoadmapsPage/PublicRoadmapsPage.tsx";
import StaredRoadmapsPage from "../Pages/StaredRoadmapsPage/StaredRoadmapsPage.tsx";
import PrivateRoadmapsPage from "../Pages/PrivateRoadmapsPage/PrivateRoadmapsPage.tsx";
import MyRoadmapsPage from "../Pages/MyRoadmapsPage/MyRoadmapsPage.tsx";
import UsersRoadmapsPage from "../Pages/UsersRoadmapsPage/UsersRoadmapsPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout isHeaderVisible={true}/>,
        children: [
            {
                element: (
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: routes.profile(),
                        element: <ProfilePage/>
                    },
                    {
                        path: routes.stared(),
                        element: <StaredRoadmapsPage/>
                    },
                    {
                        path: routes.private(),
                        element: <PrivateRoadmapsPage/>
                    },
                    {
                        path: routes.myRoadmaps(),
                        element: <MyRoadmapsPage/>
                    }
                ],
            },
            {
                path: routes.root(),
                element: <MainPage />
            },
            {
                path: routes.login(),
                element: <LoginPage />
            },
            {
                path: routes.registration(),
                element: <RegistrationPage />
            },
            {
                path: routes.roadmaps(),
                element: <PublicRoadmapPage/>
            },
            {
                path: routes.usersRoadmaps(),
                element: <UsersRoadmapsPage/>
            }
        ],
    },
    {
        path: '/',
        element: <Layout isHeaderVisible={false}/>,
        children: [
            {
                element: (
                    <DiagramProtectedRoute>
                        <Outlet/>
                    </DiagramProtectedRoute>
                ),
                children: [
                    {
                        path: routes.roadmap(),
                        element: <DiagramPage/>
                    }
                ]
            },
        ]
    }
]);
