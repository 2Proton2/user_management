import axiosInstance from "./axios/axios.service";

const userService = {};

userService.login = async function(path, obj){
    try{
        const response = await axiosInstance.post(`/${path}/login`, obj);
        return{
            response: response.status,
            data: response.data.result
        }
    }
    catch(err){
        console.error(`Not able to login : ${err}`);
    }
}

userService.addUser = async function(path, obj){
    try {
        const response = await axiosInstance.post(path, obj)
        return {
            response: response.status,
            data: response.data.result
        }
    } catch (error) {
        console.error(`Error in registering the user`)
    }
}

userService.logout = async function(){
    try{
        const response = await axiosInstance.post(`/${path}/logout`);
        return{
            response: response.status,
            data: response.data.result
        }
    }
    catch(err){
        console.error(`Not able to logout : ${err}`);
    }
}

userService.getOne = async (path, ctxt) => {
    try{
        console.log('path => ', path);
        const response = await axiosInstance.get(`${path}`);
        return{
            response: response.status,
            data: response.data.result
        }
    }
    catch(err){
        console.error(`Not able to fetch the details : ${err}`);
    }
}

userService.getAll = async (path) => {
    try {
        const response = await axiosInstance.get(`${path}`);
        return{
            response: response.status,
            data: response.data.result
        }
    } catch (err) {
        console.error(`Not able to fetch the details : ${err}`);
    }
}

userService.deleteUser = async (path) => {
    try {
        const response = await axiosInstance.delete(`${path}`);
        return{
            response: response.status,
            data: response.data.result
        }
    } catch (err) {
        console.error(`Not able to fetch the details : ${err}`);
    }
}

export default userService;