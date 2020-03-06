/* eslint-disable no-undef */
/* eslint-disable no-ex-assign */
import { BASE_URL } from '../constants/Constants';



let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const instance = {
    get: async (url, auth = true, query) => {

        let response, responseJson, error;
        try {
            response = await fetch(`${BASE_URL}`, {
                method: 'get',
                headers: new Headers(headers),
            });
        }
        catch (error) {
            return Promise.reject(error);
        }

        try {
            responseJson = await response.json();
        }
        catch (error) {
        }

        if (response.status === 200) {
            return responseJson;
        }
        else if (response.status === 400) {
            return Promise.reject(responseJson.errors);
        }
        else if (response.status === 401) {
            return Promise.reject('Request failed with status 401');
        }

        return Promise.reject(responseJson.error);
    },
}
    ;
