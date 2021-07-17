import '../styles/globals.css';
import "reflect-metadata";
import type { AppContext, AppProps } from 'next/app'
import { wrapper } from '../app/store';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import App from 'next/app';
// import DateFnsUtils from '@date-io/date-fns';
// import { PersistGate } from 'redux-persist/integration/react';
// import persistStore from 'redux-persist/es/persistStore';
import { useStore } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';

interface MyAppProps extends AppProps {}

function MyApp({ Component, pageProps }: MyAppProps) {

    const getInitialProps = async ({ Component, ctx }: AppContext) => {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    //const store = useStore();

    useEffect(() => {
    // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return( 
        <>
     
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {/* <PersistGate persistor={persistStore(store)} loading={<div>Loading</div>}> */}
                    <Component {...pageProps} />
                    {/* </PersistGate> */}
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </>
    )
}



// class MyApp extends App<MyAppProps> {
//   static async getInitialProps({ Component, ctx }: AppContext) {
//     const pageProps = Component.getInitialProps
//       ? await Component.getInitialProps(ctx)
//       : {};

//     return { pageProps };
//   }

//   componentDidMount() {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector('#jss-server-side');
//     if (jssStyles && jssStyles.parentNode) {
//       jssStyles.parentNode.removeChild(jssStyles);
//     }
//   }


//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <>
     
//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <PersistGate persistor={persistor} loading={<div>Loading</div>}>
//               <Component {...pageProps} />
//             </PersistGate>
//         </MuiPickersUtilsProvider>
//       </ThemeProvider>
//     </>
//     );
//   }
// }
export default wrapper.withRedux(MyApp);
