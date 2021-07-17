import { convertDateToServerFormat } from "../../app/util";
import { Task, TaskInputForGraphQL } from "./taskModels";

export function asTaskInput(task: Task) {
    let taskInput: TaskInputForGraphQL = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        scheduledDate: task.scheduledDate,
        status: task.status,
        priority: task.priority,
        completedDate: task.completedDate,
        completionMarkedDate: task.completionMarkedDate,
    };
    return taskInput;
}
