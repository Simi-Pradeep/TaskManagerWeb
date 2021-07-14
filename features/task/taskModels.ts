

export class Task {
    
    _id:string | null = null;
    title: string | null = null;
    description: string | null = null;
    dueDate: string | null = null;
    priority: TaskPriority | null = null;
    scheduledDate: string | null | null = null;
    status: TaskStatus | null = null;
    completedDate: string | null = null;
    completionMarkedDate: string | null = null;
}


export interface TaskInputForGraphQL {    
    title: string | null;
    description: string | null;
    dueDate: string | null;
    scheduledDate: string | null;
    priority: TaskPriority | null;
    status: TaskStatus | null;
    completedDate: string | null;
    completionMarkedDate: string | null;
}


export enum TaskStatus {
    COMPLETED='COMPLETED',
    IN_PROGRESS='IN_PROGRESS'
}

export enum TaskPriority {
    P1='P1',
    P2='P2',
    P3='P3'
}

export enum BucketName {
    BACKLOG = 'backlog',
    TODAY = 'today',
    TOMORROW = 'tomorrow',
    SCEDULED = 'scheduled',
    COMPLETED = 'completed',
    ARCHIVE = 'archive'
}

export interface BucketTask {
    task: Task,
    bucketName: BucketName
}

export class BucketList {
    [BucketName.BACKLOG]: Task[] = [];
    [BucketName.TODAY]: Task[] = [];
    [BucketName.TOMORROW]: Task[] = [];
    [BucketName.SCEDULED]: Task[] = [];
    [BucketName.COMPLETED]: Task[] = [];
    [BucketName.ARCHIVE]: Task[] = [];
}

export interface IScheduledModalTaskInfo {
    currentTask: Task | undefined
    fromBucket: BucketName,
    currentIndex: number,
    newIndex: number
}