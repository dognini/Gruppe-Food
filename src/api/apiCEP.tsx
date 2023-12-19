import axios from "axios";

const apiCEP = axios.create({
    baseURL: import.meta.env.VITE_URL_CEP
});

export default apiCEP;