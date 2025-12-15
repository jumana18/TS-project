import { axiosInstence } from "./axios"


export const getUserData = async ()=>{
    const data = await axiosInstence.get("/user/get");
    return data
}