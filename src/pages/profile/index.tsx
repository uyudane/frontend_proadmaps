import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const ProfilePage = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={3}>
            プロフィール編集
          </Grid>
          <Grid item xs={9}>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': { m: 1, width: '80%' },
              }}
              noValidate
              autoComplete='off'
            >
              <TextField required id='name' label='名前' defaultValue='Hello World' />
              <Stack direction='row' alignItems='center' spacing={2}>
                <TextField required id='icon' label='アイコン' defaultValue='Hello World' />
                <Button variant='contained' component='label'>
                  Upload
                  <input hidden accept='image/*' multiple type='file' />
                </Button>
              </Stack>
              <TextField required id='email' label='メールアドレス' defaultValue='Hello World' />
              <TextField
                id='current_password'
                label='現在のパスワード'
                type='password'
                autoComplete='current-password'
              />
              <TextField
                id='password'
                label='新しいパスワード'
                type='password'
                autoComplete='current-password'
              />
              <TextField
                id='confirm_password'
                label='新しいパスワード(確認用)'
                type='password'
                autoComplete='current-password'
              />
              <TextField id='github_id' label='公開用Githubアカウント' defaultValue='Hello World' />
              <TextField
                id='twitter_id'
                label='公開用Twitterアカウント'
                defaultValue='Hello World'
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
