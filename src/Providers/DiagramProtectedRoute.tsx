import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import processRoadmapData from "../Helpers/processRoadmapData.ts";
import NotAuthorizedPage from "../Pages/NotAuthPage/NotAuthPage.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../Redux/rootReducer.ts";

const DiagramProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, id } = useParams<{ mode: string, id: string }>();
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const userProfile = useSelector((state: RootState) => state.profile.profile)

    useEffect(() => {
        const checkUserAccess = async () => {
            if (mode && id) {
                const access = await processRoadmapData(mode, id, userProfile);
                setHasAccess(access);
            } else {
                setHasAccess(false);
            }
        };
        checkUserAccess();
    }, [mode, id]);

    if (hasAccess === null) {
        return null;
    }

    return hasAccess ? <>{children}</> : <NotAuthorizedPage/>;
}

export default DiagramProtectedRoute;
