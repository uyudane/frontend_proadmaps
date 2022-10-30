import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ResetTv } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Grid, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import Meta from 'component/Meta';
import SocialButton from 'component/SocialButton';
import UserIcon from 'component/UserIcon';
import { UserInputData } from 'pages/roadmap';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { useGetRoadMap } from 'services/roadmaps';
import type { Roadmap } from 'types';

const MakeRoadMap = ({ handleNext }: { handleNext: any }) => {
  // (あとで使う)下書き機能、編集機能でデフォルト値を取得するために使用
  // const { user, isLoading, isError } = useGetProadMap(); // Roadmap用にする必要あり
  const { currentState, setCurrentState } = useContext(UserInputData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Roadmap>({
    defaultValues: { title: '', introduction: '', start_skill: '', end_skill: '' },
  });

  // (あとでデフォルト値を設定するために使用する)
  // useEffect(() => {
  //   reset({
  //     ...user,
  //   });
  // }, [user, reset]);

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<Roadmap> = async (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data);
    setCurrentState(data);
    handleNext();
  };
  // if (isLoading) return <div>ローディング</div>;
  // if (isError) return <div>エラー</div>;
  return (
    <>
      <Meta pageTitle='プロフィール編集' />
      <Grid container>
        <Grid item xs={12} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <Container maxWidth='md' sx={{ pt: 1 }}>
            <Stack spacing={4}>
              <Grid container>
                <Grid item xs={12}>
                  ・タイトル(必須)
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    // defaultValue={user.title}
                    // label='ユーザ名'
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('title', { required: true })}
                  />
                  {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・概要、前書き(任意)
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // label='GitHubID'
                    // defaultValue={user.github_account}
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('introduction')}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・開始時スキル(任意)
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // defaultValue={user.twitter_account}
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('start_skill')}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・終了時スキル(任意)
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // defaultValue={user.twitter_account}
                    sx={{ width: '100%', bgcolor: '#ffffff' }}
                    {...register('end_skill')}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color='inherit' disabled sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleSubmit(onSubmit)} color='primary' variant='contained'>
          Next
        </Button>
      </Box>
    </>
  );
};

export default MakeRoadMap;
