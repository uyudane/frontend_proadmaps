import { Button, Container, Stack, TextField, Grid } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import Meta from 'component/meta';
import UserIcon from 'component/user_icon';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { updateUser, getUsers, getUser } from 'services/users';
import type { User, Users } from 'types';

function UserUpdatePage({ user }: any) {
  const { register, handleSubmit } = useForm<User>();
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const user_id = useRecoilValue(userState); // RecoilのTokneを取得する
  const router = useRouter();

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<User> = async (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    const result = await updateUser(data, token);
    if (result === 'OK') {
      router.push({
        pathname: `/profile/${user_id}`,
        query: { message: 'プロフィールを更新しました' },
      });
    }
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
                    defaultValue={user.name}
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

export const getStaticPaths = async () => {
  const result: Users = await getUsers();
  if (!result) return { paths: [], fallback: false };
  const paths = result.map((user) => ({
    params: { id: `${user.id}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const result: User = await getUser(Number(params.id));
  return { props: { user: result } };
};

export default UserUpdatePage;
