import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../../app/apiStatus";
import { fetchAllTasksAsync, reOrderAsync } from "./taskActions";
import { Task } from "./taskModels";

export interface TaskState {
    userId: string | null;
    tasks: Task[];
    status: ApiStatus;
}

const initialState: TaskState = {
    userId: null,
    tasks: [],
    status: ApiStatus.IDLE,
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {},

        modifyTask: (state, action) => {
            state.tasks[action.payload.taskIndex] = action.payload.task;
        },

        refreshTasks: (state, action) => {
            state.tasks = [...action.payload.tasks];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return { ...state, ...action };
            })
            .addCase(reOrderAsync.pending, (state) => {
                state.status = ApiStatus.LOADING;
                return state;
            })
            .addCase(reOrderAsync.fulfilled, (state, action) => {
                state.status = ApiStatus.FULLFILLED;
                state.tasks = action.payload;
                return state;
            })
            .addCase(reOrderAsync.rejected, (state) => {
                state.status = ApiStatus.REJECTED;
                return state;
            })
            .addCase(fetchAllTasksAsync.fulfilled, (state, action) => {
                state.tasks = action.payload ? [...action.payload] : [];
                return state;
            });
    },
});

export const { addTask, modifyTask, refreshTasks } = taskSlice.actions;
