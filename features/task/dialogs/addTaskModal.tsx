import { useRef, useState } from "react";
import { BucketName, Task } from "../taskModels";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import { Box, Button, Divider, Grid, MenuItem, TextField } from "@material-ui/core";
import { useAppDispatch } from "../../../app/hooks";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ValidatedDatePicker from "../../../app/customFields/datePicket";
import { useEffect } from "react";
import { convertDateToServerFormat, getDateAfterTomorrowDate, getTodaysDate, getTodaysDateAsString, getTomorrowDate, getTomorrowsDateAsString } from "../../../app/util";
import { addTaskAsync } from "../taskActions";
import { DatePicker } from "@material-ui/pickers";

export interface IAddTaskProps {
    open: boolean,
    bucketName: BucketName
}

export function AddTask({open, bucketName}: IAddTaskProps) {


    //const [newTask, setTask] = useState(new Task());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openModal, setOpen] = useState(false);
    const [scheduledDate, setScheduledDate]: any = useState(null);
    const [dueDate, setDueDate]: any = useState(null);
    const [priority, setPriority]: any = useState(null);
    const [disableDate, setDisableDate] = useState(false);
    const [minDate, setMinimumDate]: any = useState(null);

    const dispatch =  useAppDispatch();
    
    const formRef = useRef<ValidatorForm>(null) as React.LegacyRef<ValidatorForm>;

    useEffect(() =>{
        if(bucketName == BucketName.TODAY) {
            setScheduledDate(getTodaysDate());
            setDisableDate(true);
        } else if(bucketName == BucketName.TOMORROW) {
            //newTask.scheduledDate = getTomorrowsDateAsString();
            setScheduledDate(getTomorrowDate());
            setDisableDate(true);
        } else if(bucketName == BucketName.SCEDULED) {
            setScheduledDate(getDateAfterTomorrowDate());
            setMinimumDate(getDateAfterTomorrowDate());
        }
    },[bucketName]);

    useEffect(() =>{
        setOpen(open);
    },[open]);

    const handleClose = () => {
        //setOpen(false);
        resetAllFields();
    }

    const resetAllFields = () => {
        setOpen(false);
        setTitle('');
        setDescription('');
        setScheduledDate(null);
        setDueDate(null);
        setPriority(null);
    }
    
    const handleSubmit = () => {
        setOpen(false);
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.scheduledDate = scheduledDate? convertDateToServerFormat(scheduledDate): null;
        newTask.dueDate = convertDateToServerFormat(dueDate);
        newTask.priority = priority;
        dispatch(addTaskAsync({task: newTask}));
        resetAllFields();
    }

       
    return(
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openModal}>
            <DialogTitle id="simple-dialog-title">Add a new Task</DialogTitle>
            <Divider></Divider>
            <Box px={5} width='400px' maxWidth='80vw'>
            <ValidatorForm
                ref={formRef}
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <TextValidator
                        style={{width:'100%'}}
                        label="Title"
                        onChange={(event:any) => setTitle(event.target.value)}
                        name="title"
                        value={title}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                        style={{width:'100%'}}
                        label="Description"
                        onChange={(event:any) => setDescription(event.target.value)}
                        name="description"
                        value={description}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    </Grid>
                    {
                bucketName != BucketName.BACKLOG &&
                         <Grid item xs={6}>      

                 <ValidatedDatePicker
                 style={{width:'100%'}}
                    label="scheduledDate"
                    onChange={setScheduledDate}
                    name="scheduledDate"
                    value={scheduledDate}
                    disabled={disableDate}     
                    minDate={minDate}               
                    validators={["required"]}
                    errorMessages={["date is required"]}
                    format="dd/MMM/yyyy"
                    /> 
                    </Grid>
                }
                <Grid item xs={6}>      

                    <ValidatedDatePicker
                    style={{width:'100%'}}
                    label="Due Date"
                    onChange={setDueDate}
                    name="dueDate"
                    value={dueDate}   
                    minDate={new Date()}               
                    validators={["required"]}
                    errorMessages={["date is required"]}
                    format="dd/MMM/yyyy"
                    /> 
                </Grid>

                <Grid item xs={6}>      

                <SelectValidator
                    style={{width:'100%'}}
                    label="Priority"
                    onChange={(event:any) => setPriority(event.target.value)}
                    name="priority"
                    value={priority}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    >
                         <MenuItem value="P1">P1</MenuItem>
                         <MenuItem value="P2">P2</MenuItem>
                         <MenuItem value="P3">P3</MenuItem>
                    </SelectValidator>

                </Grid>
                
                </Grid>
                
                <Box py={2} >                    
                    <Grid item container spacing={2} justifyContent="flex-end" alignItems="center">
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </ValidatorForm>
            </Box>
        </Dialog>
  
    )
}