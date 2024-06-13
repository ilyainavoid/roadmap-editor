import axiosInstance from "../axiosInstance.ts";
import {getRefreshToken} from "../../Helpers/authHelpers.ts";


export const postLogoutUser = async () => {

    try {
        let response = await axiosInstance.post(`/api/user/logout?refreshToken=${getRefreshToken()}` );
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
    }
}