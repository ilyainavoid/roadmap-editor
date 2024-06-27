import axiosInstance from "../axiosInstance.ts";


export const getRoadmaps = async (name: string, page = 1) => {
    try {

        if (name === "") {
            const response = await axiosInstance.get(`/api/roadmaps?page=${page}`);
            console.log(response.data);
            return response.data;
        } else {
            const response = await axiosInstance.get(`/api/roadmaps?name=${name}&page=${page}`);
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};