import axiosInstance from "../axiosInstance.ts";

export const getUsersRoadmaps = async (userId: string, page = 1)   => {
    try {
        let response = await axiosInstance.get(`/api/users/${userId}/roadmaps?page=${page}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}