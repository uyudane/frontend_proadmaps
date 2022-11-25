import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Button, Container, Stack, TextField, Grid, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import Meta from 'component/Meta';
import SocialButton from 'component/SocialButton';
import UserDeleteButton from 'component/UserDeleteButton';
import UserIcon from 'component/UserIcon';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { updateUser, useMyUser } from 'services/users';
import type { User, UserFullData } from 'types';

const SettingProfilePage: NextPage = () => {
  const { user, isLoading, isError } = useMyUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({ defaultValues: { name: '', github_account: '', twitter_account: '' } });

  // SWRの前のキャッシュが残って編集後に最新化されない事象への対応
  // useFormのreset機能を使用して、その後与えた値をdefaultに設定する。
  useEffect(() => {
    reset({
      ...user,
    });
  }, [user, reset]);

  const current_user = useRecoilValue(userState);
  const router = useRouter();
  const token = useRecoilValue(tokenState);

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<User> = async (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    const result = await updateUser(data, token);
    if (result === 'OK') {
      router.push({
        pathname: `/${current_user.sub}`,
        query: { successMessage: 'プロフィールを更新しました' },
      });
    } else {
      // バックエンドから200以外が返ってきた際に、エラーを伝える
      router.push({
        pathname: router.asPath,
        query: {
          errorMessage: '500（Internal Server Error） | プロフィールを更新に失敗しました',
        },
      });
    }
  };
  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError) return <div>エラー</div>;
  return (
    <>
      <Meta pageTitle='プロフィール編集' />
      <Grid container>
        <Grid item xs={12} md={2}>
          <Grid container alignItems='center' justifyContent='center' direction='column'>
            <Grid item>
              <UserIcon user={user as UserFullData} />
            </Grid>
            {/* エラーになっていないため、userはundefinedにはならない */}
            <Typography variant='h6'>{user!.name}</Typography>
            <Grid item>
              <SocialButton profileUser={user!} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <Container maxWidth='md' sx={{ pt: 1 }}>
            <Stack spacing={4}>
              <Grid container>
                <Grid item xs={12}>
                  ・ユーザ名(必須)
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    // defaultValue={user.name}
                    // label='ユーザ名'
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('name', { required: true })}
                  />
                  {errors.name && <Box color='red'>入力が必須の項目です</Box>}
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
                    // defaultValue={user.github_account}
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
                    // defaultValue={user.twitter_account}
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
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Grid container alignItems='center' justifyContent='center' direction='column'>
              <Grid item>
                <UserDeleteButton />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Grid container alignItems='flex-end' justifyContent='flex-end' direction='column'>
              <Grid item>
                <br />
                <br />
                <br />
                <br />
                <UserDeleteButton />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default withAuthenticationRequired(SettingProfilePage, {
  onRedirecting: () => <div>このページを開くにはログインが必要です。</div>,
});
