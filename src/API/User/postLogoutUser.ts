import axiosInstance from "../axiosInstance.ts";
import {getRefreshToken, removeTokens} from "../../Helpers/authHelpers.ts";


export const postLogoutUser = async () => {

    try {
        let response = await axiosInstance.post(`/api/user/logout?refreshToken=${getRefreshToken()}` );
        console.log(response)
        removeTokens();
        return response;
    } catch (error) {
        console.log(error)
    }
}