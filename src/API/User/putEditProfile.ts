import axiosInstance from "../axiosInstance.ts";

interface EditProfile {
    email: string;
    username: string;
}


export const putEditProfile = async (values: EditProfile) => {
    try {
        let response = await axiosInstance.put(`/api/user`, {
            values
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}