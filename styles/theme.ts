// styles/theme.ts

import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
        common: {
            black: '#19192B',
            white: '#ffffff',
        },
        primary: {
            light: '#ffddc1',
            main: '#ffab91',
            dark: '#c97b63',
            contrastText: '#19192B',
        },
        secondary: {
            light: '#8e8e8e',
            main: '#616161',
            dark: '#373737',
            contrastText: '#ffffff',
        },
        grey: {
            '500': '#bcbcbc',
            '700': '#79797a',
        },
        info: {
            main: '#1bb2f1',
        },
        success: {
            main: '#00d589',
        },
        error: {
            main: '#832838',
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: 'Roboto',
    },
});

export default theme;
