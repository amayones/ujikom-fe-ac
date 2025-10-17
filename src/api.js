import axios from "axios";

const api = axios.create({
    baseURL: "https://be-ujikom.amayones.my.id/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
