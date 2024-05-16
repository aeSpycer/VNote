import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const instance = axios.create({

    baseURL: `${URL}/api`,
    withCredentials: true

});

export default instance;