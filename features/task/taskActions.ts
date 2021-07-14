import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { getRandomUUIDString } from "../../app/util";
import { addTaskApi, fetchAllTasksApi, modifyTaskApi, reOrderTasksApi } from "./taskApi";
import { Task } from "./taskModels";
import { modifyTask, refreshTasks } from "./taskSlice";


const reOrderTasks = (tasks: Task[], newTaskIndex: number, currentTaskIndex: number) => {    
    console.log("Before current task removal--->", tasks);
    const currentTask = tasks.splice(currentTaskIndex,1);
    console.log("After current task removal--->", tasks);    
    
    tasks.splice(newTaskIndex, 0, currentTask[0]);
    console.log("After replacing task--->", tasks);
    return tasks;
}

const addTaskToExistingList = (tasks: Task[], newTask: Task, addToIndex?: number) => {    
    newTask._id = getRandomUUIDString();
    if(!addToIndex) {
        tasks.push(newTask);
    } else {
        tasks.splice(addToIndex, 0, newTask);
    }
    return tasks;
}

const getCurrentUser = (state: AppState) => {
    //let userId = state?.user?.user?._id;
    return state.user.user && state.user.user._id? state.user.user._id: '';//b302aa68-58bd-4d6a-b83c-f870cc477b68';//state?.user?.user?._id ||  '';//'b302aa68-58bd-4d6a-b83c-f870cc477b68';
}


export const fetchAllTasksAsync = createAsyncThunk('task/fetchAllTasksAsync', async (input, thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();
    const result = await fetchAllTasksApi(getCurrentUser(state));
    return result;
});


export const reOrderAsync = createAsyncThunk('task/reOrderTaskAsync', async ({prevTaskIndex, currentTaskIndex}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();    
    const reOrderedTasks = reOrderTasks(state.task.tasks,prevTaskIndex, currentTaskIndex);
    thunkApi.dispatch(refreshTasks({tasks: reOrderedTasks}));
    const result = await reOrderTasksApi('', prevTaskIndex, currentTaskIndex);
    return result;
});

export const modifyAndReOrderAsync = createAsyncThunk('task/modifyAndReOrderTaskAsync', async ({task, prevTaskIndex, currentTaskIndex}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();  
    const reOrderedTasks = reOrderTasks([...state.task.tasks], prevTaskIndex, currentTaskIndex);
    reOrderedTasks[prevTaskIndex] = task;
    console.log("---------------Final-------------------", reOrderedTasks);
    thunkApi.dispatch(refreshTasks({tasks: reOrderedTasks}));
    const modifyResult = await modifyTaskApi(getCurrentUser(state), task, currentTaskIndex);
    const result = await reOrderTasksApi(getCurrentUser(state), prevTaskIndex, currentTaskIndex);
    return result;
});

export const modifyTaskAsync = createAsyncThunk('task/modifyTaskAsync', async ({task, taskIndex}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();  
    thunkApi.dispatch(modifyTask({task: task, taskIndex: taskIndex}))
    const result =  await modifyTaskApi(getCurrentUser(state), task, taskIndex);
    return result;
});

export const addTaskAsync = createAsyncThunk('task/addTaskAsync', async ({task, taskIndex}:any , thunkApi) => {
    const state: AppState = <AppState>thunkApi.getState();  
    const reOrderedTasks = addTaskToExistingList([...state.task.tasks],task, taskIndex);
    thunkApi.dispatch(refreshTasks({tasks: reOrderedTasks}))
    const result =  await addTaskApi(getCurrentUser(state), task, taskIndex);
    return result;
})


