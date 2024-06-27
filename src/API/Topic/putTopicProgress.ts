import axiosInstance from "../axiosInstance.ts";

export const putTopicProgress = async (roadmapId: string | undefined, topicId: string, data: string) => {
    try {
        let response = await axiosInstance.put(`/api/roadmaps/${roadmapId}/topics/${topicId}/progress?progressStatus=${data}`);
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
    }
}