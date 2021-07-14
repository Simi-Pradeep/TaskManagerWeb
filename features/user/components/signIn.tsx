import { Box, Button, Grid, Snackbar, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { loginAsync } from "../userActions";
import { User } from "../userModels";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface ISignInProps {
    onSwithToSignUp: () => void
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SignIn({onSwithToSignUp}: ISignInProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]: any = useState("");
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const router = useRouter();

    const dispatch =  useAppDispatch();
    
    const formRef = useRef<ValidatorForm>(null) as React.LegacyRef<ValidatorForm>;

    const handleSubmit = () => {        
        const user = new User();
        user.username = username;
        user.password = password;
        //let response = loginUser(user);
        dispatch(loginAsync({user: user})).then((response: any) => {
            if(response?.payload?._id) {
                router.push("/usertask")
            } else {
                setError("Invalid Username or Password");     
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
                <Grid container spacing={6} justifyContent="center" alignItems="center">
                    
                    <Grid item>
                        <Typography variant="h6"><strong>Sign In</strong></Typography>
                    </Grid>
                    
                    <Box px={12}>
                        <Grid container item xs={12} spacing={1} justifyContent="center" alignItems="center">
                                
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

                            <Grid item xs={12} style={{textAlign:'center'}}>
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
                <Grid container item xs={12} spacing={3} justifyContent="center" alignItems="center">
                    <Grid item >
                        <Button variant="outlined" color="primary" onClick={() => onSwithToSignUp()}>Sign Up</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </Grid>
                </Grid>
                </Grid>
            </ValidatorForm>
    )
}
