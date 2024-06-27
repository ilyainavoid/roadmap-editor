import axiosInstance from "../axiosInstance.ts";

export const putRoadmapContent = async (id: string, data: string) => {
    try {
        let response = await axiosInstance.put(`/api/roadmaps/${id}/content`, data);
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
    }
}