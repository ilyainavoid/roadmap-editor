import axiosInstance from "../axiosInstance.ts";


export const getUsers = async (username: string)   => {
    try {
        let response = await axiosInstance.get(`/api/users?username=${username}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}