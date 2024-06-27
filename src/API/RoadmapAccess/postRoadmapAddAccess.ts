import axiosInstance from "../axiosInstance.ts";

export const postRoadmapAddAccess = async (id: string, data : string[]) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/access/add`, data);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};