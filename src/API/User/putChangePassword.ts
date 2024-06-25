import axiosInstance from "../axiosInstance.ts";

export const putChangePassword = async ({values}: { values: PasswordChanges }) => {
    try {
        let response = await axiosInstance.put(`/api/user/change_password`, values);
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
    }
}