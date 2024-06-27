import axiosInstance from "../axiosInstance.ts";
import {getRefreshToken, removeTokens} from "../../Helpers/authHelpers.ts";


export const postLogoutUser = async () => {

    try {
        let token = getRefreshToken();
        if(token){
            let response = await axiosInstance.post(`/api/user/logout?refreshToken=${encodeURIComponent(token)}` );
            console.log(response)
            removeTokens();
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}