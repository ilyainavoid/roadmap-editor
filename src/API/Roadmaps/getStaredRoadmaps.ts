import axiosInstance from "../axiosInstance.ts";

export const getStaredRoadmaps = async (page = 1) => {
    try {
        const response = await axiosInstance.get(`/api/roadmaps/stared?page=${page}`);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};