import axios from 'axios';

import type { AxiosRequestConfig } from 'axios'
import { urlBuilder } from '../utils/string.util';

// Define a helper function for making API requests
async function makeRequest(method: string, path: string, data?: any, queryParams?: any) {

    const url : string = urlBuilder(path,queryParams);
    //const { readAuthAsync } = useAuthInfo();
    //const token : TTokenResponse | undefined = await readAuthAsync();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      
    //   if (token?.accessToken) {
    //     headers['Authorization'] = 'Bearer ' + token.accessToken;
    //   }

    const options : AxiosRequestConfig = {
        url: url,
        method,
        headers: headers
    };

    // Add request body if data is provided
    if (data) {
        options.data = JSON.stringify(data);
    }

    // Make the API request
    try {
        const response = await axios(options);
        return response.data;

    }
    catch (err : any) {
        console.log('Error: ', err);
    }

    // Return the response data
}

// Define your REST API request methods
export async function get(path: string, queryParams?: any) {
    return makeRequest('GET', path, undefined, queryParams);
}

export async function post(path: string, data?: any) {
    return makeRequest('POST', path, data);
}

export async function put(path: string, data?: any) {
    return makeRequest('PUT', path, data);
}

export async function del(path: string, data?: any) {
    return makeRequest('DELETE', path, data);
}