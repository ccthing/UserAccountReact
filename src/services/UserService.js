import axios from "axios";

const GET_ALL_USER_REST_API_URL = 'http://localhost:8080/user/getAll';
const CREATE_USER_REST_API_URL = 'http://localhost:8080/user/createUpdate';
const DELETE_USER_REST_API_URL = 'http://localhost:8080/user/delete';

class UserService {
    getUsers(){
        return axios.get(GET_ALL_USER_REST_API_URL);
    }

    createUser(user){
        return axios.post(CREATE_USER_REST_API_URL, user);
    }

    deleteUser(id){
        return axios.post(DELETE_USER_REST_API_URL + "/" + id);
    }


}

export default new UserService();