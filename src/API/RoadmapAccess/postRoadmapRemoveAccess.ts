import axiosInstance from "../axiosInstance.ts";

export const postRoadmapRemoveAccess = async (id: undefined | string, data: string[]) => {
    try {
        const response = await axiosInstance.post(`/api/roadmaps/${id}/access/remove`, data);
        console.log(response);

        return response;

    } catch (error) {
        console.log(error);
    }
};