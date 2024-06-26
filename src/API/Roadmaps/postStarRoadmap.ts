import axiosInstance from "../axiosInstance.ts";

export const postStarRoadmap = async (id: string) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/star`);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};