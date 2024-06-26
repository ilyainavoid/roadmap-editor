import {createBrowserRouter, Outlet} from "react-router-dom";
import ProtectedRoute from "../Providers/ProtectedRoute.tsx";
import {routes} from "../Consts/routes.ts";
import MainPage from "../Pages/MainPage/MainPage.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";
import Layout from "./Layout.tsx";
import CreateDiagramPage from "../Pages/CreateDiagramPage/CreateDiagramPage.tsx";
import PublicRoadmapPage from "../Pages/PublicRoadmapsPage/PublicRoadmapsPage.tsx";
import StaredRoadmapsPage from "../Pages/StaredRoadmapsPage/StaredRoadmapsPage.tsx";

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
                children: [
                    {
                        path: routes.profile(),
                        element: <ProfilePage/>
                    },
                    {
                        path: routes.stared(),
                        element: <StaredRoadmapsPage/>
                    }
                ],
            },
            {
                path: routes.root(),
                element: <MainPage/>
            },
            {
                path: routes.login(),
                element: <LoginPage/>
            },
            {
                path: routes.registration(),
                element: <RegistrationPage/>
            },
            {
              path: routes.roadmaps(),
              element: <PublicRoadmapPage/>
            },
            {
                path: routes.creatediagram(),
                element: <CreateDiagramPage/>
            }
        ]
    }
])