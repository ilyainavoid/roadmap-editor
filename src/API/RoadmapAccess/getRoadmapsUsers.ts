import axiosInstance from "../axiosInstance.ts";

export const getRoadmapsUsers = async (id: string, name: string) => {
    try {

        if (name === "") {
            const response = await axiosInstance.get(`/api/roadmaps/${id}users`);
            console.log(response.data);

            return response.data;
        } else {
            const response = await axiosInstance.get(`/api/roadmaps/${id}users?username=${name}`);
            console.log(response.data);

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};