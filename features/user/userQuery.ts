export const createUserMutation = `
    mutation createUser($input:UserInput!) {
        createUser(input:$input) {                
                _id
                username              
            }
        }`;

export const loginMutation = `
    mutation loginUser($input:UserInput!) {
        loginUser(input:$input) {                
                _id
                username         
            }
        }`;
