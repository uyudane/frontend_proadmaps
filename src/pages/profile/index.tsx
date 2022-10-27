import { Button, Container, Stack, TextField, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import Meta from 'component/meta';
import UserIcon from 'component/user_icon';
import tokenState from 'recoil/atoms/tokenState';
import { postProfiles } from 'services/profiles';
import type { Profile } from 'types';

function ProfilePage() {
  const { register, handleSubmit } = useForm<Profile>();
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<Profile> = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    postProfiles(data, token);
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
                  ・ユーザ名(必須)
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
                  ・公開用Githubアカウント(任意)
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
                    {...register('github_account')}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・公開用Twitterアカウント(任意)
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    disabled
                    defaultValue='https://twitter.com/'
                    sx={{ width: '100%', bgcolor: '#aaaaaa' }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('twitter_account')}
                  />
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
