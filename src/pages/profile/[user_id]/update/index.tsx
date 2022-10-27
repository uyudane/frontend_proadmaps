import { Button, Container, Stack, TextField, Grid } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import Meta from 'component/meta';
import UserIcon from 'component/user_icon';
import tokenState from 'recoil/atoms/tokenState';
import { updateProfile, getProfiles, getProfile } from 'services/profiles';
import type { Profile, Profiles } from 'types';

function ProfileUpdatePage({ profile }: any) {
  const { register, handleSubmit } = useForm<Profile>();
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const router = useRouter();
  const [path_id, setData] = useState<number>();
  const fetchData = async () => {
    if (router.isReady) {
      const id = router.query.user_id;
      const data = Number(id); // id を使ってデータフェッチする処理の代わり
      setData(data);
    }
  };
  // URL が変更される（id が変更される）たびにデータをフェッチする
  useEffect(() => {
    fetchData();
  }, [router.query]);

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<Profile> = (data) => {
    fetchData();
    // バリデーションチェックOK！なときに行う処理を追加
    updateProfile(path_id!, data, token);
  };
  return (
    <>
      <p>{path_id}</p>
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
                    defaultValue={profile.name}
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
                    defaultValue={profile.github_account}
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
                    defaultValue={profile.twitter_account}
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
  const result: Profiles = await getProfiles();
  if (!result) return;
  const paths = result.map((profile) => ({
    params: { user_id: `${profile.user_id}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const result: Profile = await getProfile(Number(params.user_id));
  return { props: { profile: result } };
};

export default ProfileUpdatePage;
