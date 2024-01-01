import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // ירוק
    },
    secondary: {
      main: '#00BCD4', // טורקיז
    },
  },
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
      {/* קוד האפליקציה שלך יש לשים כאן */}
    // </ThemeProvider>
  );
}

export default App;
