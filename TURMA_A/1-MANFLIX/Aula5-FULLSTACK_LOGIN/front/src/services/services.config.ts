import axios, {type AxiosResponse} from "axios";

export const BASE_URL= import.meta.env.VITE_BACKEND_URL;

export const getAxios = ()=>{
    const storage = localStorage.getItem("auth_token")
    let token = "";
    if(storage){
        token = storage.replace('"','').replace('"','');
        console.log("TOKEN CERTO", token)
    }
    const createdAxios = axios.create({
        baseURL: process.env.NODE_ENV === "development"? "/backend-api" : BASE_URL,
        timeout: 4000,   
        headers: {
            Authorization: `Token ${token}`,
        }
    });

    createdAxios.interceptors.response.use(getAxiosResponse);
    return createdAxios;
}

const getAxiosResponse = (response:AxiosResponse)=>{
    return response.data;
}