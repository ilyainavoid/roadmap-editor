import axiosInstance from "../axiosInstance.ts";
import store from "../../Redux/store.ts";
import {setAuth} from "../../Redux/actions/authAction.ts";
import {setProfile} from "../../Redux/actions/profileAction.ts";

export const getUserProfile = async () => {
    try {
        let response = await axiosInstance.get(`/api/user`);
        console.log(response.data);
        store.dispatch(setAuth(true));
        store.dispatch(setProfile(response.data));
        return response.data;
    } catch (error) {
        console.log(error)
        store.dispatch(setAuth(false))
    }
}