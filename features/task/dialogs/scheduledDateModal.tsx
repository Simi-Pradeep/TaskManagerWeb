import { MutableRefObject, useEffect, useRef, useState } from "react";
import { BucketName, IScheduledModalTaskInfo, Task } from "../taskModels";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ValidatedDatePicker from "../../../app/customFields/datePicket";
import { convertDateToServerFormat, getDateAfterTomorrowDate } from "../../../app/util";
import { Box, Button, Divider } from "@material-ui/core";
import { addTaskAsync } from "../taskActions";
import { useAppDispatch } from "../../../app/hooks";
import { ValidatorForm } from "react-material-ui-form-validator";


export interface IScheduledModalProps {
    open: boolean
    taskInfo: IScheduledModalTaskInfo | undefined
    onDateSelection: (taskInfo: IScheduledModalTaskInfo) => void
    onClose: () => void
}


export function ScheduledDateModal({open, taskInfo, onDateSelection, onClose}: IScheduledModalProps) {

    const [openModal, setOpen] = useState(false);
    const [scheduledDate, setScheduledDate]: any = useState(null);
    const [minDate, setMinDate]: any = useState(null);

    const dateRef = useRef();
    const formRef = useRef<ValidatorForm>(null) as React.LegacyRef<ValidatorForm>;

    const dispatch =  useAppDispatch();

    useEffect(() => {
        setScheduledDate(getDateAfterTomorrowDate());
        setMinDate(getDateAfterTomorrowDate());
    }, [taskInfo])

    useEffect(() =>{
        setOpen(open);
    },[open]);

    const handleClose = () => {
        onClose();
        resetAllFields();        
    }

    const resetAllFields = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);    
        if(taskInfo && taskInfo.currentTask) {
            taskInfo.currentTask.scheduledDate = convertDateToServerFormat(scheduledDate);
            onDateSelection(taskInfo);
        }        
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openModal}>
        <DialogTitle id="simple-dialog-title">Select New Scheduled Date</DialogTitle>
        <Divider></Divider>
            <Box m={5} mb={3} width='250px'  maxWidth='80vw'>
        <ValidatorForm
            ref={formRef}
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}        >
                <Box textAlign='center'>
              <ValidatedDatePicker
                style={{width:'100%'}}
                label="scheduledDate"
                onChange={setScheduledDate}
                name="scheduledDate"
                value={scheduledDate}   
                minDate={minDate}               
                validators={["required"]}
                errorMessages={["date is required"]}
                format="dd/MMM/yyyy"
                /> 
                </Box>
                <Box textAlign='right' pt={5} >
                    
                    <Button style={{marginRight:'15px'}} variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Box>

        </ValidatorForm>
        </Box>
    </Dialog> 
    )
}