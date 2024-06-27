import axiosInstance from "../axiosInstance.ts";

export const putRoadmapEdit = async (id: string, data: RoadmapCreate) => {
    try {
        let response = await axiosInstance.put(`/api/roadmaps/${id}`, data);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
    }
}