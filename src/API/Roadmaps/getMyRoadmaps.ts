import axiosInstance from "../axiosInstance.ts";

export const getMyRoadmaps = async (page = 1) => {
    try {
        const response = await axiosInstance.get(`/api/roadmaps/my?page=${page}`);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};