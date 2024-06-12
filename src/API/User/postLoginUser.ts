import axios from "axios";


export const postLoginUser = async ({userCredentials}: { userCredentials: any }) =>{
    try{
        let response = await axios.post(`/api/user/login`,
            userCredentials);
        console.log(response.data)
        return response.data;
    }
    catch (error){
        console.log(error)
    }
}