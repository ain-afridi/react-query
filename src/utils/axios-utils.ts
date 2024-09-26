import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

// Create the Axios client instance
const client = axios.create({ baseURL: 'http://localhost:4000' });

// Define the request function with TypeScript types
export const request = (options: AxiosRequestConfig) => {
    
    // client.defaults.headers.common.Authorization = 'Bearer token';
    const onSuccess = (response: AxiosResponse) => response;
    const onError = (error: AxiosError): AxiosError => {
        return error;
    };

    // Return the Axios request promise with proper handling
    return client(options).then(onSuccess).catch(onError);
};
