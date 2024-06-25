import axios from "axios";
import {setTokens} from "../../Helpers/authHelpers.ts";
import axiosInstance from "../axiosInstance.ts";
import {REGISTRATION_EMAIL_FAIL, REGISTRATION_USERNAME_FAIL} from "../../Consts/strings.ts";


export const postRegistrationUser = async ({userCredentials}: {
    userCredentials: RegistrationValues
}): Promise<TokenResponse | { error: string } | undefined> => {
    try {
        const response = await axios.post<TokenResponse>('/api/user/register', userCredentials);
        console.log(response.data);
        setTokens(response.data.accessToken, response.data.refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            if (error.response) {
                if (error.response.data.message === "User with this username already exists") {
                    return {error: REGISTRATION_USERNAME_FAIL};
                } else if (error.response.data.message === 'User with this email already exists') {
                    return {error: REGISTRATION_EMAIL_FAIL};
                }
                return error.response.data;
            }
        } else {
            console.error('Unexpected error:', error);
        }
        return undefined;
    }
};
