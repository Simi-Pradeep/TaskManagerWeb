import request from "graphql-request";
import { asUserInput } from "./userMapper";
import { User } from "./userModels";
import { createUserMutation, loginMutation } from "./userQuery";

//const GRAPHQL_API_URL = 'http://localhost:3001/graphql';
const GRAPHQL_API_URL: string = process.env.GRAPHQL_API_URL? process.env.GRAPHQL_API_URL: '';//'http://localhost:3001/graphql';


export async function loginApi(user: User) {
    const data =  await request(GRAPHQL_API_URL, loginMutation, 
        {input:asUserInput(user)});    
    return data;
}

export async function signUpApi(user: User) {
    const data =  await request(GRAPHQL_API_URL, createUserMutation, 
        {input:asUserInput(user)});    
    return data;
}