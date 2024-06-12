import axios from "axios";
import {setTokens} from "../../Helpers/authHelpers.ts";
import axiosInstance from "../axiosInstance.ts";


export const postLoginUser = async ({userCredentials}: { userCredentials: LoginValues }) => {
    try {
        let response = await axios.post(`/api/user/login`,
            userCredentials);
        console.log(response.data)
        setTokens(response.data.accessToken, response.data.refreshToken)
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
        return response.data;
    } catch (error) {
        console.log(error)
    }
}