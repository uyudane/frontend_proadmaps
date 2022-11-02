import { Button, Container, Stack, TextField, Grid, Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Meta from 'component/Meta';
import SocialButton from 'component/SocialButton';
import UserIcon from 'component/UserIcon';
import stepState from 'recoil/atoms/stepState';
import type { Step } from 'types';

const MakeStepDialog = ({ handleClose, open }: { handleClose: any; open: any }) => {
  const setStep = useSetRecoilState(stepState);
  const step = useRecoilValue(stepState);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Step>({
    defaultValues: {
      url: step.url,
      title: step.title,
      introduction: step.introduction,
      required_time: step.required_time,
      date: step.date,
    },
  });

  // (あとでデフォルト値を設定するために使用する)
  // useEffect(() => {
  //   reset({
  //     ...user,
  //   });
  // }, [user, reset]);

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<Step> = async (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    setStep(data);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
              <Container maxWidth='md' sx={{ pt: 1 }}>
                <Stack spacing={4}>
                  <Grid container>
                    <Grid item xs={12}>
                      ・URL(任意)
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        // defaultValue={user.title}
                        // label='ユーザ名'
                        sx={{ width: '100%', bgcolor: '#ffffff' }}
                        {...register('url', { required: true })}
                      />
                      {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・タイトル(必須)
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        // label='GitHubID'
                        // defaultValue={user.github_account}
                        sx={{ width: '100%', bgcolor: '#ffffff' }}
                        {...register('title', { required: true })}
                      />
                      {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・コメント(任意)
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        // defaultValue={user.twitter_account}
                        sx={{ width: '100%', bgcolor: '#ffffff' }}
                        {...register('introduction')}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・所要時間(任意)
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        // defaultValue={user.twitter_account}
                        sx={{ width: '100%', bgcolor: '#ffffff' }}
                        {...register('required_time')}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・実施年月(任意)
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja}>
                        {/* <TextField
                          // defaultValue={user.twitter_account}
                          sx={{ width: '100%', bgcolor: '#ffffff' }}
                          {...register('date')}
                        /> */}
                        <DatePicker
                          views={['year', 'month']}
                          // label='Year and Month'
                          minDate={dayjs('1990-01-01')}
                          maxDate={dayjs('2030-12-01')}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          inputFormat='YYYY年MM月'
                          mask='____年__月'
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} {...register('date')} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Stack>
              </Container>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MakeStepDialog;
