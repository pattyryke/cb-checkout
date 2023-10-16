import { createTheme, ThemeProvider } from '@mui/material/styles';

// Primary: Pale Turquoise (#AFEEEE)
// Secondary: Dim Grey (#696969)

const myTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export default myTheme;