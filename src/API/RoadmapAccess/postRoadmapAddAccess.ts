import axiosInstance from "../axiosInstance.ts";

export const postRoadmapAddAccess = async (id: undefined | string, data: string[]) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/access/add`, data);
        console.log(response);

        return response;

    } catch (error) {
        console.log(error);
    }
};