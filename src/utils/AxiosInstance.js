import axios from 'axios';
import config from 'config';

// Set config defaults when creating the instance

export const Axios = axios.create({
    baseURL: `${config.SERVER_IP}`
});

// Add a request interceptor
Axios.interceptors.request.use(
    (request) => {
        console.log(request);
        request.headers = {
            ...request.headers,
            Accept: 'application/json'
        };

        // Do something before request is sent
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        console.log(response);
        console.log('success');
        return response;
    },
    (error) => {
        console.log('response error');

        return Promise.reject(error);
    }
);
