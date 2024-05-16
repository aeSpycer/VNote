import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "https://vnote-b.onrender.com";

const instance = axios.create({

    baseURL: `${URL}/api`,
    withCredentials: true

});

export default instance;
