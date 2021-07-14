

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { loginApi, signUpApi } from "./userApi";
import { addUserInfoToCookie } from "./userUtil";


// export const loginUser = async ({user}:any) => {
//     const result =  await loginApi(user);
//     return result;
// })

export const loginAsync = createAsyncThunk('user/loginAsync', async ({user}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();  
    const result =  await loginApi(user);
    return result.loginUser?result.loginUser: null;
})

export const logoutAsync = createAsyncThunk('user/logoutAsync', async ({user}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();  
    const result =  await signUpApi(user);
    return result;
})

export const signupAsync = createAsyncThunk('user/signupAsync', async ({user}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();  
    const result =  await signUpApi(user);
    return result;
});


