import React, {ReactNode, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/rootReducer.ts";
import NotAuthorizedPage from "../Pages/NotAuthPage/NotAuthPage.tsx";
import {getAccessToken} from "../Helpers/authHelpers.ts";
import {AppDispatch} from "../Redux/store.ts";
import {setAuth} from "../Redux/actions/authAction.ts";


interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(getAccessToken() != "") dispatch(setAuth(true))
    }, [dispatch]);


    return isAuth ?  <>{children}</> : <NotAuthorizedPage/>;
}

export default ProtectedRoute;