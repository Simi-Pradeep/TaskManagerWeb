import { AppBar, Box, createStyles, CssBaseline, Divider, Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import { ArrowLeft, ArrowRight, ExitToApp, Inbox, Mail, Menu, Today } from "@material-ui/icons";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useRouter } from "next/dist/client/router";
import { logoutUser } from "../../../user/userSlice";
import styles from './Task.module.scss';
import { useLottie } from "lottie-react";
import { getTodaysDate, getTodaysDateAsString } from "../../../../app/util";
import clsx from 'clsx';


const drawerWidth = 240;
        

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      color:'white',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor:'white',
      color:'black',
      
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
      height: '40px',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      position:'relative'
    },
    nameBar: {
        padding:'10px 0px'
    },

    nameChar: {
        width: '35px',
        height: '35px',
        borderRadius:'50%',
        opacity:'0.8',
        flexGrow: 'unset',
        alignSelf: 'start',
        color:'white',
        textAlign:'center',
        lineHeight:'35px',
        marginLeft: '10px',
        display:'inline-block',
        fontSize: '16px',
        backgroundColor: 'hsl(214, 100%, 66%)'
    },
    nameFull: {
        marginLeft: '36px',
        display:'inline-block',
        fontSize: '16px',
        fontFamily: 'Yatra One'
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor:'hsl(214, 100%, 50%)',
      //background: '#00c6ff',  /* fallback for old browsers */
      //background: '-webkit-linear-gradient(to right, #0072ff, #00c6ff)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to right, #0072ff, #00c6ff)',/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

      color:'white',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    drawerLogo: {
        position:'absolute',
        top: '5px',
        left:'15px'
    },
    drawerClose: {
        backgroundColor:'hsl(214, 100%, 50%);',
        //background: '-webkit-linear-gradient(to right, #0072ff, #00c6ff)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to right, #0072ff, #00c6ff)',/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        color:'white',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      
      height:'100vh',
      backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)'
    },

    contentSpacing: {
        padding: theme.spacing(3),
    },

    titleBar: {
        backgroundColor:'white',
        boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px'

    },
    title: {
        fontFamily: 'Yatra One',
        color:'black',
        top: '-4px',
        position: 'relative',
        fontSize:'20px'
    }
  }),
);


export function TaskLayout(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [container, setContainer]: any = useState(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userName = useAppSelector((state) => state?.user?.user?.fullName);
  
  const router = useRouter();
  const dispath = useAppDispatch();

  useEffect(() => {
    setContainer(window !== undefined ? window.document.body : undefined);
  },[])  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(false);
  };

  const logout = () => {
    router.push('/login');
    dispath(logoutUser())  
    
  }

  const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
  }

  const drawer = (
      <>
        <div className={classes.toolbar}>
                {(open || mobileOpen) && 
                    <>
                        <Box className={classes.drawerLogo}>
                            {/* <img src='/nira.svg'/><br></br> */}
                            <div style={{fontSize: '40px', fontWeight:'bold'}}>sims</div>
                            <span style={{fontSize:'14px', position:'relative', top:'-10px'}}>Task Manager</span>
                            </Box>
                        <IconButton onClick={handleDrawerClose}>
                            <ArrowLeft />
                        </IconButton>
                    </>
                }
                {!open && !mobileOpen && 
                    <IconButton onClick={handleDrawerOpen}>
                        <ArrowRight /> 
                    </IconButton>
                }
            
            </div>
            <Divider style={{marginTop:'20px'}}/>
            <div className={classes.nameBar}>
                <div className={classes.nameChar} >S
                </div>
                <div className={classes.nameFull}>Simi</div>
            </div>
            <Divider />
            <List style={{position: 'absolute', bottom:'10px'}} >
                <ListItem button onClick={() => logout()}>
                    <ListItemIcon style={{color:'white'}}><ExitToApp/></ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem>
            </List>  
        </> 
  )

  

  return (
    <div className={classes.root}>
      <CssBaseline />  
      <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: mobileOpen,
                [classes.drawerClose]: !mobileOpen,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: mobileOpen,
                  [classes.drawerClose]: !mobileOpen,
                }),
              }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      <Hidden xsDown implementation="css"> 
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
          {drawer}            
      </Drawer>
      </Hidden>
      <main className={classes.content}>
        
            <Box width='100%' height='45px' px={2} pt='5px' borderRadius={2} className={classes.titleBar}>
                <Grid container alignItems='center'>
                    <Grid item xs={8} >       
                            <Hidden smUp>               
                                <Menu onClick={handleDrawerToggle} style={{color:'black', position:'relative', top:'-10px'}}></Menu>
                            </Hidden>  
                            &nbsp;
                            {/* <img src='/niraLogo.png' style={{width:'35px', height:'35px'}}></img> */}
                            <span style={{display: "inline-block",
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: 'black',
                                    lineHeight: '34px',
                                    textAlign: 'center',
                                    borderRadius: '50%',
                                    fontWeight: 'bold',
                                    fontSize: '30px'}}>s</span>
                            &nbsp;<span className={classes.title}>&nbsp;ToDo List</span>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'right',
                    color: '#4b4b4b', fontSize: '12px', fontWeight: 'bold'}} >
                        <Today style={{verticalAlign:'middle'}}></Today> {getTodaysDateAsString()}
                    </Grid>
                </Grid>
                
            </Box>
            <Box style={{width:'100%', maxWidth:'1200px'}} mx='auto' className={classes.contentSpacing}>
            {props?.children}
            </Box>
            <Hidden smDown>
                <Box position='fixed' bottom='0px' height='30px' width='100%' 
                fontSize='10px' textAlign='center' color='gray' >
                    @ 2021 - 2022 nira.com. All rights reserved.
                </Box>
            </Hidden>
      </main>
    </div>
  );
}