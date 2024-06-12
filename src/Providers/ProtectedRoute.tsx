import React, {ReactNode} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../Redux/rootReducer.ts";
import NotAuthorizedPage from "../Pages/NotAuthPage/NotAuthPage.tsx";


interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    return isAuth ?  <>{children}</> : <NotAuthorizedPage/>;
}

export default ProtectedRoute;