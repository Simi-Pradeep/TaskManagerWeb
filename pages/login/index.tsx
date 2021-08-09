import { Box, Grid, Paper } from "@material-ui/core";
import { useState } from "react";
import { SignIn } from "../../features/user/components/signIn";
import { SignUp } from "../../features/user/components/signUp";
import mainPageStyles from "../../styles/Home.module.css";
import loginStyles from "./Login.module.scss";
import { useLottie } from "lottie-react";
import Image from "next/image";
import niraLogo from "../../public/nira.svg";
import taskImg from "../../public/task.svg";
import topBgImg from "../../public/bg.png";
//import groovyWalkAnimation from "./29564-working-man.json";

export default function LoginPage() {
    const [isSignInPage, setIsSignInPage] = useState(true);

    return (
        <div className={mainPageStyles.container}>
            <div className={loginStyles.lottieContainer}></div>
            <div className={loginStyles.taskImgContainer}>
                <Image src={taskImg}></Image>
                {/* <img src='./task.svg' style={{width:'300px'}}></img> */}
            </div>
            <Box
                boxShadow={3}
                borderRadius="10px"
                width="700px"
                maxWidth="80vw"
            >
                <Grid container>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        className={loginStyles.logoPanel}
                    >
                        <Box
                            position="absolute"
                            style={{
                                backgroundImage: "url('./niraloginbg.svg')",
                                opacity: "0.2",
                                backgroundSize: "contain",
                            }}
                            width="100%"
                            height="100%"
                        ></Box>
                        <Box m="auto" textAlign="center" color="white">
                            {/* <Image src={niraLogo}></Image>
                            <br></br> */}
                            <div
                                style={{ fontSize: "48px", fontWeight: "bold" }}
                            >
                                sims
                            </div>
                            <div style={{ fontSize: "20px" }}>Task Manager</div>
                            <div>
                                Your one stop solution for task management
                            </div>
                        </Box>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        className={loginStyles.signInPanel}
                    >
                        <Box
                            m="auto"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {isSignInPage && (
                                <SignIn
                                    onSwithToSignUp={() =>
                                        setIsSignInPage(false)
                                    }
                                ></SignIn>
                            )}
                            {!isSignInPage && (
                                <SignUp
                                    onSwithToSignIn={() =>
                                        setIsSignInPage(true)
                                    }
                                ></SignUp>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
