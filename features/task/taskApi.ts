import { getRandomUUIDString, getTodaysDate, getTodaysDateAsString } from "../../app/util";
import { Task } from "./taskModels";
import * as uuid from 'uuid';
import useSWR from "swr";
import { addTaskForUserMutation, fetchAllTasksForUserQuery, fetchAllUsersQuery, modifyTaskForUserMutation, reOrderTaskForUserMutation } from "./taskQuery";
import { request } from "graphql-request";
import { resolveHref } from "next/dist/next-server/lib/router/router";
import { asTaskInput } from "./taskMapper";

const GRAPHQL_API_URL: string = process.env.GRAPHQL_API_URL? process.env.GRAPHQL_API_URL: '';//'http://localhost:3001/graphql';


export async function reOrderTasksApi(userId: string, newTaskIndex: number, currentTaskIndex: number) {
    const data =  await request(GRAPHQL_API_URL, reOrderTaskForUserMutation, 
        {userId: userId, newTaskIndex: newTaskIndex, currentTaskIndex: currentTaskIndex});    
    return data.tasks;
}

export async function modifyTaskApi(userId: string, task:Task, taskIndex: number) {    
    const data =  await request(GRAPHQL_API_URL, modifyTaskForUserMutation, 
    {userId: userId, task: asTaskInput(task), taskIndex: taskIndex})
    return data.task;
}

export async function addTaskApi(userId: string, task:Task, taskIndex: number) {
    const data =  await request(GRAPHQL_API_URL, addTaskForUserMutation, 
    {userId: userId, task: asTaskInput(task), taskIndex: taskIndex})
    return data.task;
}

export async function fetchAllTasksApi(userId: string) {
    

    const data =  await request(GRAPHQL_API_URL, fetchAllTasksForUserQuery, {userId: userId})
    
    if(data.user?.tasks) {        
        return data.user.tasks;
    }

}