import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { getBucketName, getBucketNameForTask } from "../../taskUtil";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task, BucketList, BucketName, IScheduledModalTaskInfo } from "../../taskModels";
import { useDispatch } from "react-redux";
import { DragableTask} from "../dragabbleTask";
import { getTodaysDateAsString, getTomorrowsDateAsString, isEmpty } from "../../../../app/util";
import { Box, Divider, Grid } from "@material-ui/core";
import { fetchAllTasksAsync, modifyAndReOrderAsync } from "../../taskActions";
import { ScheduledDateModal } from '../../dialogs/scheduledDateModal';
import { TaskLayout } from "../taskLayout";

const BucketTheme = {
    backlog: '#c0deff',
    today: '#edd3fc',
    tomorrow: 'rgb(210 255 229)',//'#9affc4',
    scheduled: '#ffcdae'
}
export function TaskHome() {
    
    const [buckets, setToBucket]: [BucketList, Function] = useState(new BucketList());
    const [scheduledModalTaskInfo, setScheduledModalTaskInfo]: [IScheduledModalTaskInfo | undefined, Dispatch<SetStateAction<IScheduledModalTaskInfo | undefined>>] = useState();
    const [openScheduledModal, setOpenScheduledModal] = useState(false);
    const taskMasterList = useAppSelector((state) => state.task?.tasks); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTasksAsync())
    },[]);

    useEffect(() => {
        segerateTasksToBuckets(taskMasterList);     
    },[taskMasterList])

    function segerateTasksToBuckets(tasks: Task[]) {        
        const bucketList = new BucketList();    
        if(tasks) {    
            tasks.forEach(taskElement => {
                bucketList[getBucketNameForTask(taskElement)].push(taskElement);
            })
        }
        setToBucket(bucketList);
    }


    function performDropAfterEffect(task: Task, currentBucketName: BucketName, newBucketName: BucketName) {
        
        if(currentBucketName == newBucketName) return;
        
        switch(newBucketName) {
            case(BucketName.BACKLOG) : {
                task.scheduledDate = null;
                break;
            }
            case(BucketName.TODAY) : {
                task.scheduledDate = getTodaysDateAsString();
                break;
            }
            case(BucketName.TOMORROW) : {
                task.scheduledDate = getTomorrowsDateAsString();
                break;
            }
        }
        
    }
    
    function isNewScheduledTask(currentBucketName: BucketName, newBucketName: BucketName) {
        if(currentBucketName == newBucketName) return false;
        if(newBucketName == BucketName.SCEDULED) return true;
        return false;
    }

    const openScheduledDateSelectionModal = (task: Task, currentBucketName: BucketName, currentIndex: number, newIndex: number) => {
        let taskInfo: IScheduledModalTaskInfo  = {
            currentIndex: currentIndex,
            newIndex: newIndex,
            currentTask: task,
            fromBucket: currentBucketName
        }
        setScheduledModalTaskInfo(taskInfo);
        setOpenScheduledModal(true);

    }


    const onScheduledBucketDateSelection = (taskInfo: IScheduledModalTaskInfo) => {
        setScheduledModalTaskInfo(undefined);
        setOpenScheduledModal(false);
        dispatch(modifyAndReOrderAsync({task:taskInfo.currentTask, prevTaskIndex: taskInfo.newIndex, currentTaskIndex: taskInfo.currentIndex} ));
    }

    const resetScheduledModalInfo = () => {
        setScheduledModalTaskInfo(undefined);
        setOpenScheduledModal(false);
    }


    const onDragEnd = (result:DropResult) =>{
        const source = result.source;
        const destination = result.destination;

        const currentBucketName = getBucketName(source.droppableId);        
        let sourceTask = buckets[currentBucketName][source.index];       

        if(destination) {
            const newBucketName = getBucketName(destination.droppableId);

            let prevTaskIndex = 0;
            //Adding as last item in the bucket
            if(destination.index == buckets[newBucketName].length) {
                const prevTask = buckets[newBucketName][buckets[newBucketName].length-1];                
                prevTaskIndex = taskMasterList.indexOf(prevTask);
                prevTaskIndex = (prevTaskIndex < taskMasterList.length -1)? ++prevTaskIndex: prevTaskIndex;
            } else {
                const destinationTask = buckets[newBucketName][destination.index];
                prevTaskIndex = taskMasterList.indexOf(destinationTask);
            }
            const currentTaskIndex = taskMasterList.indexOf(sourceTask);
            
            //This object is reaonly as its coming from store. So need to create new copy befor modifying
            sourceTask = {...sourceTask};

            if(isNewScheduledTask(currentBucketName, newBucketName)) {
                openScheduledDateSelectionModal(sourceTask, currentBucketName, currentTaskIndex, prevTaskIndex)
            } else {
                performDropAfterEffect(sourceTask, currentBucketName, newBucketName);  

                //If the newTaskIndex is less than the current task index, then removal of the item
                //will shift the newTaskIndex one position up. So to compensate that, we need to reduce
                //one index val from newTaskIndex                
                if(currentTaskIndex < prevTaskIndex) {
                    prevTaskIndex = prevTaskIndex -1;
                }          
                dispatch(modifyAndReOrderAsync({task:sourceTask, prevTaskIndex, currentTaskIndex} ));
            }
        }
    }

    
        return (
            <TaskLayout>
                
                <Grid container style={{color:'black', fontWeight:'bold', fontSize:'16px'}}>
                    <Grid item xs={8}>My Tasks</Grid>
                </Grid>
                <Divider style={{margin:'10px 0px 20px 0px'}}></Divider>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <DragableTask droppableId={BucketName.BACKLOG} 
                            droppableList={buckets[BucketName.BACKLOG]} 
                            displayLabel='Backlog' bgColor={BucketTheme.backlog}></DragableTask>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <DragableTask droppableId={BucketName.TODAY} 
                            droppableList={buckets[BucketName.TODAY]} 
                            nonDroppableList={buckets[BucketName.COMPLETED]} 
                            displayLabel='Today' bgColor={BucketTheme.today}></DragableTask>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <DragableTask droppableId={BucketName.TOMORROW} 
                            droppableList={buckets[BucketName.TOMORROW]} 
                            displayLabel='Tomorrow' bgColor={BucketTheme.tomorrow}></DragableTask>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <DragableTask droppableId={BucketName.SCEDULED} 
                            droppableList={buckets[BucketName.SCEDULED]} 
                            displayLabel='Scheduled' bgColor={BucketTheme.scheduled}></DragableTask>
                        </Grid>
                    </Grid>                
                </DragDropContext>
                {openScheduledModal && 
                    <ScheduledDateModal taskInfo={scheduledModalTaskInfo}
                    onDateSelection={onScheduledBucketDateSelection} 
                    onClose={resetScheduledModalInfo}></ScheduledDateModal>
                }            
            </TaskLayout>
        );
    

}