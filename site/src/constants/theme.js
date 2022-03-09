import { createTheme } from '@material-ui/core/styles';
export const theme = createTheme({
 typography: {
  fontFamily: [
   'Arial'
  ]
 },
 palette: {
  primary: {
   main: '#E0E6EE',
   contrastText: '#000'
  },
  secondary: {
   main: '#2E63F7',
   contrastText: '#FFFFFF'
  },
  terceary: {
   main: '#000000',
   contrastText: '#FFFFFF'
  },
  disabled: {
   main: '#d1d1d6',
   contrastText: '#d1d1d6'
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
 },
});