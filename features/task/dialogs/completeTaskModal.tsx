import { useEffect, useRef, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { convertDateToServerFormat, getTodaysDate, getYesterdaysDate } from "../../../app/util";
import { Task, TaskStatus } from "../taskModels";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Typography } from "@material-ui/core";
import ValidatedDatePicker from "../../../app/customFields/datePicket";
import { modifyTask } from "../taskSlice";
import { modifyTaskAsync } from "../taskActions";
import { useSelector } from "react-redux";

export interface ICompleteTaskModalProps {
    open: boolean
    task: Task
    onClose: () => void
}

export function CompleteTaskModal({open, task, onClose}: ICompleteTaskModalProps) {

    const [openModal, setOpen] = useState(false);
    const [completionDate, setCompletionDate]: any = useState(getTodaysDate());
    const [isCompletedPreviously, setIsCompletedPreviously]: any = useState(false);
    const [maxDate]: any = useState(getYesterdaysDate());

    const taskMasterList = useAppSelector((state) => state.task.tasks);

    const formRef = useRef<ValidatorForm>(null) as React.LegacyRef<ValidatorForm>;

    const dispatch =  useAppDispatch();


    useEffect(() =>{
        setOpen(open);
    },[open]);

    const handleClose = () => {
        onClose();
        //setOpen(false);
        resetAllFields();
    }

    const resetAllFields = () => {
        setOpen(false);
        setCompletionDate(getTodaysDate());
        setIsCompletedPreviously(false);
    }

    const handleSubmit = () => {
       
        const taskIndex = taskMasterList.indexOf(task);
        task = {...task};
        task.status = TaskStatus.COMPLETED;
        task.completedDate = convertDateToServerFormat(completionDate);
        task.completionMarkedDate = convertDateToServerFormat(getTodaysDate());
        
        dispatch(modifyTaskAsync({task, taskIndex}));
        onClose();
        //setOpen(false); 
        resetAllFields();
    }

    const onSetPreviousCompletedDateClick = (event: any) => {
        setCompletionDate(getYesterdaysDate());
        setIsCompletedPreviously(event.target.checked);
    }

   return(
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openModal}>
            <DialogTitle id="simple-dialog-title">Confirm Completiton </DialogTitle>
            <Divider></Divider>
            <Box textAlign='center' p={3}>
                <Typography variant='h6'>
                    Are you sure you want to mark the task as completed?
                </Typography>
                
            </Box>
            <Box width='500px'  maxWidth='80vw' p={3} pt={0}>
            <ValidatorForm
                ref={formRef}
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)} >
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item style={{color:'gray', fontSize:'10px'}}>
                            <FormControlLabel
                                label="Is Completed Previously?"
                                control={
                                <Checkbox
                                    checked={isCompletedPreviously}
                                    onChange={onSetPreviousCompletedDateClick}
                                    name="isPreviouslyCompleted"
                                    color="primary"
                                />
                                }
                                
                            />
                        </Grid>
                        <Grid item>
                        {
                            isCompletedPreviously &&
                            <ValidatedDatePicker
                                label="completionDate"
                                onChange={setCompletionDate}
                                name="completionDate"
                                value={completionDate}   
                                maxDate={maxDate}               
                                validators={["required"]}
                                errorMessages={["date is required"]}
                                format="dd/MMM/yyyy"
                            /> 
                        }
                        </Grid>
                        <Divider style={{padding:'10px 0px'}}></Divider>
                        <Grid item container spacing={2} justifyContent="flex-end" alignItems="center">
                            <Grid item>
                                <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary"  type="submit">Confirm</Button>
                            </Grid>
                        </Grid>
                    </Grid>
            </ValidatorForm>
            </Box>
             
        </Dialog> 
   ) 

}