import axiosInstance from "../axiosInstance.ts";

export const putRoadmapEdit = async (id: string) => {
    try {
        let response = await axiosInstance.delete(`/api/roadmaps/${id}`);
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
    }
}