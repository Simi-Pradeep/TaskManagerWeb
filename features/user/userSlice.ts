import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../../app/apiStatus";
import { loginAsync, signupAsync } from "./userActions";
import { User } from "./userModels";

interface IUserState {
    user: User | null;
    status: ApiStatus;
}

const initialState: IUserState = {
    user: null,
    status: ApiStatus.IDLE,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return { ...state, ...action };
            })
            .addCase(loginAsync.pending, (state, action) => {
                state.status = ApiStatus.LOADING;
            })
            .addCase(signupAsync.pending, (state, action) => {
                state.status = ApiStatus.LOADING;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = ApiStatus.FULLFILLED;
                state.user = action.payload;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.status = ApiStatus.FULLFILLED;
                state.user = action.payload;
            });
    },
});

export const { logoutUser } = userSlice.actions;
