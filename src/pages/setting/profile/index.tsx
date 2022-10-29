import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Button, Container, Stack, TextField, Grid, Box, dividerClasses } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import UserIcon from 'component/UserIcon';
import Meta from 'component/meta';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { updateUser, useMyUser } from 'services/users';
import type { User } from 'types';

function SettingProfilePage() {
  const { user, isLoading, isError } = useMyUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const sub = useRecoilValue(userState); // RecoilのTokneを取得する
  const router = useRouter();
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<User> = async (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    const result = await updateUser(data, token);
    if (result === 'OK') {
      router.push({
        pathname: `/${sub}`,
        query: { message: 'プロフィールを更新しました' },
      });
    }
  };
  if (isLoading) return <div>ローディング</div>;
  if (isError) return <div>エラー</div>;
  return (
    <>
      <Meta pageTitle='プロフィール編集' />
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={2}>
          <Grid container alignItems='center' justifyContent='center' direction='column'>
            <Grid item>
              <UserIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <Container maxWidth='md' sx={{ pt: 1 }}>
            <Stack spacing={4}>
              <Grid container>
                <Grid item xs={12}>
                  ・ユーザ名(必須)
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    defaultValue={user.name}
                    // label='ユーザ名'
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('name', { required: true })}
                  />
                  {errors.name && <Box color='red'>入力が必須の項目です</Box>}
                  <Container></Container>
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
                    defaultValue={user.github_account}
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
                    defaultValue={user.twitter_account}
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

export default withAuthenticationRequired(SettingProfilePage, {
  onRedirecting: () => <div>このページを開くにはログインが必要です。</div>,
});
