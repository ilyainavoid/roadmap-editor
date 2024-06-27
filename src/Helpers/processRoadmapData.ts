import {getSpecifiedRoadmap} from "../API/Roadmaps/getSpecifiedRoadmap.ts";
import axios from "axios";
import {setGraphData, setModifier} from "../Redux/actions/graphAction.ts";
import store from "../Redux/store.ts";
import {setRole} from "../Redux/actions/userAction.ts";
import {setProgress, updateStatus} from "../Redux/actions/progressAction.ts";

interface ProgressItem {
    Id: string;
    Status: string;
}

const processRoadmapData = async (mode: string, id: string, userProfile: UserProfile | null): Promise<boolean> => {

    try {
        const roadmapResponse = await getSpecifiedRoadmap(id);
        sessionStorage.setItem("roadmap", roadmapResponse);
        store.dispatch(setGraphData(roadmapResponse.content))
        store.dispatch(setProgress({
            topicsClosed: roadmapResponse.topicsClosed,
            topicsCount: roadmapResponse.topicsCount
        }));
        if (roadmapResponse.progress) {
            roadmapResponse.progress.forEach((item: ProgressItem) => {
                store.dispatch(updateStatus(item.Id, item.Status));
            });
        }
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
        store.dispatch(setModifier(roadmapResponse.status))
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

export default processRoadmapData;