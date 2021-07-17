import { isOldDate, isToday, isTomorrow } from "../../app/util";
import { BucketName, TaskStatus } from "./taskModels";
import { Task } from "./taskModels";

export function getBucketName(bucketAsString: string) {
    return <BucketName>bucketAsString;
}

export function getBucketNameForTask(task: Task): BucketName {
    if (!task.scheduledDate) return BucketName.BACKLOG;
    if (task.status == TaskStatus.COMPLETED) {
        if (task.completionMarkedDate && isToday(task.completionMarkedDate))
            return BucketName.COMPLETED;
        return BucketName.ARCHIVE;
    }
    if (isToday(task.scheduledDate)) return BucketName.TODAY;
    if (isOldDate(task.scheduledDate)) return BucketName.TODAY;
    if (isTomorrow(task.scheduledDate)) return BucketName.TOMORROW;
    return BucketName.SCEDULED;
}
