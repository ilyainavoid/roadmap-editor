import axiosInstance from "../axiosInstance.ts";

export const postRoadmapRemoveAccess = async (id: string, data : string[]) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/access/remove`, data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
};