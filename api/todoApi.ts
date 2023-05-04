import axios from "axios";

export const todoApi = axios.create({
    baseURL: process.env.API_URL
})