import axiosInstance from "../axiosInstance.ts";

export const postRoadmapPublish = async (id: string) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/publish`);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};