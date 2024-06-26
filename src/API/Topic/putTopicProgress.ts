import axiosInstance from "../axiosInstance.ts";

export const putTopicProgress = async (roadmapId: string, topicId: string, data: string) => {
    try {
        let response = await axiosInstance.put(`/api/roadmaps/${roadmapId}/topics/${topicId}/progress`, data);
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
    }
}