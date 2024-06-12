import axiosInstance from "../axiosInstance.ts";

export const getUserProfile = async () => {
    try {
        let response = await axiosInstance.get(`/api/user`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}