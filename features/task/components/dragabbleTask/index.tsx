import { Box, Grid, IconButton, Paper } from '@material-ui/core';
import { AddCircle, ArrowBackTwoTone, PlusOne, PlusOneRounded, SignalWifi1BarLockSharp } from '@material-ui/icons';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DragDropContextProps, DropResult } from 'react-beautiful-dnd';
import { getRandomUUIDString } from '../../../../app/util';
import { AddTask } from '../../dialogs/addTaskModal';
import { Task, BucketList, BucketName, TaskPriority } from '../../taskModels';
import { TaskItem } from '../taskItem';



const grid = 8;

const priorityColor = {
    [TaskPriority.P1]: 'red',
    [TaskPriority.P2]: 'orange',
    [TaskPriority.P3]: '#0e99fc',
}

const getItemStyle = (isDragging:any, draggableStyle:any, isDisabled = false, priority?: TaskPriority | null) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderLeft: `3px solid ${priority?priorityColor[priority]:'transparent'}`,

    background: isDisabled?'lightgray':( isDragging ? `${priority?priorityColor[priority]:'white'}` :'white'),
    color: isDisabled? '#999999': ( isDragging ? 'white': 'black'),
    ...draggableStyle
});



const getListStyle = (isDraggingOver:any, bgColor: string) => ({
    background: isDraggingOver ? 'lightblue' : bgColor,//'white',    
    padding: grid,
    width: '100%'
});



export interface IDragableTaskProps {
    droppableId: BucketName;
    droppableList: Task[];
    nonDroppableList?: Task[];
    displayLabel: string;
    bgColor: string;
}

export function DragableTask({droppableId, droppableList, nonDroppableList, displayLabel, bgColor}: IDragableTaskProps) {

    const [openAddModal, setOpenAddModal] = useState(false);

    return (
        <div style={{position:'relative'}}>
            <Box style={{maxHeight:'80vh',overflow:'auto'}} boxShadow={1} borderRadius={4}>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver, bgColor)}>
                        <Grid container style={{color:'gray'}} >
                            <Grid item xs={8}>
                                <span style={{fontWeight: 'bold',color: '#1f2033'}}>{displayLabel}</span>
                                <strong style={{color:'brown'}}>&nbsp;({droppableList? droppableList.length: '0'})</strong>
                            </Grid>
                            <Grid item xs={4} style={{textAlign:'right'}}>                                
                                <AddCircle style={{cursor:'pointer'}} onClick={() => setOpenAddModal(!openAddModal)}></AddCircle>
                            </Grid>
                        </Grid>

                        {droppableList.map((item: Task, index: number) => (                            
                            <Draggable
                                key={item._id}
                                draggableId={item._id? item._id: getRandomUUIDString()}
                                index={index}>
                                {(provided, snapshot) => (
                                    <Paper
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            false,
                                            item.priority
                                        )}>
                                        <TaskItem task={item} isClosable={droppableId == BucketName.TODAY}></TaskItem>
                                    </Paper>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}

                    </div>
                )}
            </Droppable>
            {nonDroppableList && nonDroppableList.length > 0 && 
                <div style={{...getListStyle(false, bgColor), paddingTop:'0px'}}>
                    <Box style={{color:'gray'}} pb={1}>
                    <span style={{fontWeight: 'normal',color: '#1f2033'}}>Completed Today</span>
                    <strong style={{color:'brown'}}>&nbsp;({nonDroppableList? nonDroppableList.length: '0'})</strong>
                    </Box>

                {nonDroppableList.map((item: Task, index: number) => (
                    <Paper style={getItemStyle(false,{}, true, item.priority)}  key={item._id}> 
                            <TaskItem task={item} isClosable={false}>  {item.title}</TaskItem>                    
                       
                    </Paper>
                )
                )}

                </div>
            }
             </Box>          
           
            <AddTask bucketName={droppableId} open={openAddModal} ></AddTask>
        </div>
    )
}