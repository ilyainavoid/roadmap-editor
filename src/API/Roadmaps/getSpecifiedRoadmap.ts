import axiosInstance from "../axiosInstance.ts";


export const getSpecifiedRoadmap = async (id: string)   => {
    try {
        let response = await axiosInstance.get(`/api/roadmaps/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}