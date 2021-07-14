import { Box, Button, Grid,Typography, Snackbar } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { loginAsync, signupAsync } from "../userActions";
import { User } from "../userModels";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface ISignUpProps {
    onSwithToSignIn: () => void
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export function SignUp({onSwithToSignIn}: ISignUpProps) {

    const [fullname, setFullName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError]: any = useState("");
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const router = useRouter();

    const dispatch =  useAppDispatch();
    
    const formRef = useRef<ValidatorForm>(null) as React.LegacyRef<ValidatorForm>;

    const handleSubmit = () => {        
        const user = new User();
        user.username = username;
        user.password = password;
        user.fullName = fullname;
        //let response = loginUser(user);
        dispatch(signupAsync({user: user})).then(response => {
            
            if(response?.payload?._id) {
                router.push("/usertask")
            } else {
                setError("Signup failed");     
                setOpenErrorAlert(true);           
            }
        });
        
    }

    const handleErrorAlertClose = () => {
        setOpenErrorAlert(false);
        setError("");  
    }

    return (
        <ValidatorForm
                ref={formRef}
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}>
                <Snackbar open={openErrorAlert} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleErrorAlertClose}>
                    <Alert onClose={handleErrorAlertClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
                <Grid container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item>
                        <Typography variant="h6"><strong>Sign Up</strong></Typography>
                    </Grid>
                    <Box px={12}>
                    <Grid container item xs={12} spacing={1} justifyContent="center" alignItems="center">
                        
                        <Grid item xs={12}style={{textAlign:'center'}}> 
                            <TextValidator
                                style={{width:'100%'}}
                                label="Full Name"
                                onChange={(event:any) => setFullName(event.target.value)}
                                name="fullname"
                                value={fullname}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                        <Grid item xs={12}style={{textAlign:'center'}}> 
                            <TextValidator
                            style={{width:'100%'}}
                                label="User Name"
                                onChange={(event:any) => setUsername(event.target.value)}
                                name="username"
                                value={username}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                        <Grid item xs={12}style={{textAlign:'center'}}> 
                            <TextValidator
                            style={{width:'100%'}}
                                label="Password"
                                onChange={(event:any) => setPassword(event.target.value)}
                                name="password"
                                value={password}
                                type="password"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    </Box>
                    <Grid container spacing={3} item xs={12} justifyContent="center" alignItems="center">
                        <Grid item >
                            <Button variant="outlined" color="primary" onClick={() => onSwithToSignIn()}>Go Back</Button>
                        </Grid>
                        <Grid item >
                            <Button variant="contained" color="primary" type="submit">Sign Up</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </ValidatorForm>
    )
}
