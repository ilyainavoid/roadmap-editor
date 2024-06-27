import axiosInstance from "../axiosInstance.ts";

export const getPrivateRoadmaps = async (page = 1) => {
    try {
        const response = await axiosInstance.get(`/api/roadmaps/private?page=${page}`);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};