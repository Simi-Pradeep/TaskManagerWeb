  
import { createTheme } from '@material-ui/core/styles';
import { blue, pink, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  spacing:7,
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: pink[800],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize:10
  }
});

export default theme;