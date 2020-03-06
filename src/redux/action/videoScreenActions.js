import * as types from './actionTypes';
import { instance } from '../../util/fetch';

export const getVideos = () => ({
    type: types.GET_VIDEOS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const response = await instance.get();
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    }),
});



export const loadMoreVideos = () => ({
    type: types.LOAD_MORE_VIDEOS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const response = await instance.get();
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    }),
});

