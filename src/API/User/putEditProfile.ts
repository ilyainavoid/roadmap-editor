import axiosInstance from "../axiosInstance.ts";


export const putEditProfile = async ({values}: { values: EditProfile }) => {
    try {
        let response = await axiosInstance.put(`/api/user`, values);
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
    }
}