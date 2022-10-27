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
      main: '#143F6B',
    },
    secondary: {
      main: '#E8630A',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
      // 検討
      // default: '#F5FAFF',
      // default: '#eeeeee',
      // default: '#FFF0E7',
    },
  },
  typography: {
    fontFamily: ['Yu Gothic', 'Roboto', 'sans-serif'].join(','),
    // ボタンの文字がデフォルトで大文字になっているため、小文字も許可
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
