import axiosInstance from "../axiosInstance.ts";

export const postRoadmapCreate = async (data: RoadmapCreate) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps`, data);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};