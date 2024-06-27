import axiosInstance from "../axiosInstance.ts";

export const postRoadmapCopy = async (id : string) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/copy`);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};