import {getSpecifiedRoadmap} from "../API/Roadmaps/getSpecifiedRoadmap.ts";
import axios from "axios";
import { setGraphData} from "../Redux/actions/graphAction.ts";
import store from "../Redux/store.ts";
import {setRole} from "../Redux/actions/userAction.ts";

const checkAccess = async (mode: string, id: string, userProfile: UserProfile | null): Promise<boolean> => {



    try {
        const roadmapResponse = await getSpecifiedRoadmap(id);
        store.dispatch(setGraphData(roadmapResponse.content))
        const checkRole = (): boolean => {
            const roadmapUserId = roadmapResponse.user.id;
            if (userProfile) {
                const userProfileId = userProfile.id;
                if (roadmapUserId === userProfileId) {
                    return true;
                }
            }
            return false;
        }

        const isUserOwner = checkRole();
        if (isUserOwner) {
            store.dispatch(setRole('owner'))
        }

        if (mode === 'edit') {
            return isUserOwner;
        }
        store.dispatch(setGraphData(roadmapResponse.content))
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 403) {
                return false;
            }
        }
        console.log(error);
        return false;
    }
}

export default checkAccess;