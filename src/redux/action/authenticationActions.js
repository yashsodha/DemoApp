/* eslint-disable no-ex-assign */
import AsyncStorage from '@react-native-community/async-storage';
import * as types from './actionTypes';

export const login = (email, password) => ({
    type: types.LOGIN,
    payload: new Promise(async (resolve, reject) => {
        try {
            let user = {
                email,
                password
            }
            if (email === "admin@gmail.com" && password === "Simform.123") {
                AsyncStorage.setItem('user', JSON.stringify(user));
                return resolve(user, user.successAck = "Login successful");
            }
            return reject("Please enter correct username and password")
        }
        catch (error) {
            return reject(error);
        }
    }),
});

export const setLogged = (user) =>
    ({
        type: types.SET_LOGIN,
        payload: new Promise(async (resolve, reject) => {
            if (user) {
                return resolve(user);
            }
            return reject('data unavailable!');
        }),
    });

export const logout = () => ({
    type: types.LOGOUT,
    payload: new Promise(async (resolve, reject) => {
        await AsyncStorage.removeItem('user');
        resolve();
    }),
});

export default login;
