export const fetchAllTasksForUserQuery= `
        query getUser($userId: ID!) {
            user(id:$userId) {
                tasks {
                    _id
                    title
                    description
                    dueDate
                    scheduledDate
                    status
                    priority
                    completedDate
                    completionMarkedDate
                }
            }
        }`

export const modifyTaskForUserMutation= `
    mutation modifyTask($userId:ID!,$task: TaskInput!, $taskIndex: Int!) {
        modifyTask(userId:$userId, task: $task, taskIndex: $taskIndex) {                
                _id
                title
                description
                dueDate
                scheduledDate
                status
                priority         
                completedDate
                completionMarkedDate     
            }
        }`

export const addTaskForUserMutation= `
mutation addTask($userId:ID!,$task: TaskInput!, $taskIndex: Int) {
    addTask(userId:$userId, task: $task, taskIndex: $taskIndex) {                
            _id
            title
            description
            dueDate
            scheduledDate
            status
            priority
            completedDate
            completionMarkedDate             
        }
    }`

export const reOrderTaskForUserMutation= `
        mutation reOrderTask($userId:ID!, $newTaskIndex: Int!, $currentTaskIndex: Int!) {
            reOrderTask(userId:$userId, newTaskIndex: $newTaskIndex, currentTaskIndex: $currentTaskIndex) {                
                    _id
                    title
                    description
                    dueDate
                    scheduledDate
                    status
                    priority   
                    completedDate
                    completionMarkedDate            
                }
            }`

export const fetchAllUsersQuery= `{
    users {
        _id
    }
}`