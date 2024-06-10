import axios from "axios";


export const postRegistrationUser = async ({userCredentials}: { userCredentials: any }) =>{
    try{
        let response = await axios.post(`/api/user/register`,
            userCredentials);
        console.log(response.data)
        return response.data;
    }
    catch (error){
        console.log(error)
    }
}