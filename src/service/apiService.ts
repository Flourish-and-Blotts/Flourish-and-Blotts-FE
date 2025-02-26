/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useSWR from "swr";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAPI = async (url: string) => {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("GET request error:", error);
        throw error;
    }
};

export const postAPI = async (url: string, data: any) => {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};

export const putAPI = async (url: string, data: any) => {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (error) {
        console.error("PUT request error:", error);
        throw error;
    }
};

export const deleteAPI = async (url: string) => {
    try {
        const response = await apiClient.delete(url);
        return response.data;
    } catch (error) {
        console.error("DELETE request error:", error);
        throw error;
    }
};

const fetcher = (url: string) => apiClient.get(url).then(res => res.data)

export const useDataSWR = (url: string, payload: Record<string, any>) => {
    const queryParams = new URLSearchParams(payload).toString();
    const paginatedUrl = `${url}?${queryParams}`;
    return useSWR(paginatedUrl, fetcher);
}