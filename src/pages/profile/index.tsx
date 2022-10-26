import { Button, Container, Stack, TextField, Grid, Box, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import Meta from 'component/meta';
import UserIcon from 'component/user_icon';

// フォームの型
interface SampleFormInput {
  name: string;
  github: string;
  twitter: string;
}

function ProfilePage() {
  const { register, handleSubmit } = useForm<SampleFormInput>();

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<SampleFormInput> = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data);
  };
  return (
    <>
      <Meta pageTitle='プロフィール編集' />
      <Grid container>
        <Grid item xs={2} sx={{ p: 1 }}>
          <Container>プロフィール編集</Container>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={2}>
          <Container>
            <UserIcon />
          </Container>
        </Grid>
        <Grid item xs={9} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <Container maxWidth='md' sx={{ pt: 1 }}>
            <Stack spacing={4}>
              <Grid container>
                <Grid item xs={12}>
                  ・ユーザ名
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    // label='ユーザ名'
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('name')}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・公開用Githubアカウント
                </Grid>
                <Grid item xs={3}>
                  {/* <Typography component='span'>https://github.com/</Typography> */}
                  <TextField
                    disabled
                    defaultValue='https://github.com/'
                    sx={{ width: '100%', bgcolor: '#aaaaaa' }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    // label='GitHubID'
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('github')}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・公開用Twitterアカウント
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    disabled
                    defaultValue='https://twitter.com/'
                    sx={{ width: '100%', bgcolor: '#aaaaaa' }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ width: '100%', bgcolor: '#ffffff' }} {...register('twitter')} />
                </Grid>
              </Grid>
              <Button
                color='primary'
                variant='contained'
                size='large'
                onClick={handleSubmit(onSubmit)}
              >
                更新する
              </Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
