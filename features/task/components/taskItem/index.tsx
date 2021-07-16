import { Chip, createStyles, Grid, makeStyles, Theme, Tooltip } from "@material-ui/core";
import { Beenhere } from "@material-ui/icons";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useState } from "react";
import { isOldDate } from "../../../../app/util";
import { CompleteTaskModal } from "../../dialogs/completeTaskModal";
import { Task, TaskStatus } from "../../taskModels";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    completeIcon: {
        cursor:'pointer', 
        fontSize:'16px', 
        color:'lightgray',
        
        '&:hover': {
            color:'#ff649b'
         },
    }
  }),
);

export interface ITaskItemProps {
    task: Task,
    isClosable: boolean,
    disabled?: boolean
}

export function TaskItem({task, isClosable, disabled = false}: any) {
    //const {task, isClosable} = props;
    const [openCompletedStatusModal, setOpenCompletedStatusModal] = useState(false);

    const inlineStyles = useStyles();

    return(
        <Grid container style={disabled?{backgroundColor:'Red'}:{}} spacing={1}>
            <Grid container item xs={12} style={{fontWeight:'bold',fontSize: '11px'}}>
                <Grid item xs={11}>
                    {task?.title}
                </Grid>

                <Grid item xs={1}>
                        {isClosable && task?.status != TaskStatus.COMPLETED &&
                        <>
                            <Tooltip title="Mark Completed" aria-label="add">
                                <Beenhere onClick={() => setOpenCompletedStatusModal(true)} className={inlineStyles.completeIcon}></Beenhere>
                            </Tooltip>
                            <CompleteTaskModal task={task} open={openCompletedStatusModal} onClose={() => setOpenCompletedStatusModal(false)}></CompleteTaskModal>
                        </>
                    }
                </Grid>
            </Grid>

            <Grid item xs={12} style={{fontWeight:'normal', fontSize: '10px'}} >
                {task.description}
            </Grid>

            <Grid container item xs={12} style={{fontWeight:'normal', fontSize: '10px',color:'lightgray', paddingTop:'10px'}} >
                <Grid item xs={6} >
                    {task.scheduledDate && 
                    isOldDate(task.scheduledDate)
                        ? <Tooltip title="Old scheduled date" aria-label="old scheduled date">
                            <span style={{color:'orange'}}>{task.scheduledDate}</span>
                        </Tooltip>
                        : task.scheduledDate
                    }
                </Grid>

                <Grid item xs={6} style={{textAlign:'right'}}>                
                   {task.status != TaskStatus.COMPLETED &&  <>Due On : {
                   task.dueDate && 
                    isOldDate(task.dueDate)
                        ? <Tooltip title="Past the due date" aria-label="Past due date">
                            <strong style={{color:'red'}}>{task.dueDate}</strong>
                            {/* <Chip label={task.dueDate} size="small" color='secondary'/> */}
                        </Tooltip>
                        : task.dueDate
                    
                   }</>}
                   {task.status == TaskStatus.COMPLETED &&  
                   <>
                        <Tooltip title="Not Eligible For Dragging" aria-label="Not Eligible For Dragging">
                            <Chip label="Completed" size="small" disabled variant="outlined" />
                        </Tooltip>                    
                   </>}                  
                </Grid>
            </Grid>            
        </Grid>
    )
}