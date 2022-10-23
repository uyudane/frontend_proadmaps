// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   // TODO:テーマ設定を行います
// });

// export default theme;
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E8630A',
    },
    secondary: {
      main: '#E8630A',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
