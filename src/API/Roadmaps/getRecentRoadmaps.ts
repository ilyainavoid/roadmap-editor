import axiosInstance from "../axiosInstance.ts";

export const getRecentRoadmaps = async () => {
    try {
        const response = await axiosInstance.get(`/api/roadmaps/recent`);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};