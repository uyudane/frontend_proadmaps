import { SignalCellularNull } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import stepsState from 'recoil/atoms/stepsState';
import type { Step } from 'types';

// 編集時に使用する関数。編集するオブジェクトの値を変更して、前後は元の値で上書く。
const replaceItemAtIndex = (arr: Step[], index: number, newValue: Step) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const MakeStepDialog = ({
  handleClose,
  open,
  getStepId = undefined,
  itemId = undefined,
}: {
  handleClose: () => void;
  open: boolean;
  getStepId?: () => number;
  itemId?: number;
}) => {
  const [steps, setSteps] = useRecoilState(stepsState);

  // IDを渡された場合(編集の場合)はデフォルト値がもとの値になり、新規作成の場合は空にする
  const currentStep =
    typeof itemId !== 'undefined'
      ? steps.find((step) => step.id === itemId)
      : { url: '', title: '', introduction: '', required_time: '', date: '' };

  // 実施日時の設定で使用(実施年月の情報が新規作成の際に前の情報を持ってしまう際の対処)
  // const defaultDate = dayjs(currentStep?.date.replace('年', '-').replace('月', ''));
  // console.log(`実験${defaultDate}`);
  // const [dateValue, setDateValue] = useState<Dayjs | null>(itemId === 0 ? defaultDate : null);

  // const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Step>({
    defaultValues: {
      url: currentStep?.url,
      title: currentStep?.title,
      introduction: currentStep?.introduction,
      required_time: currentStep?.required_time,
      date: '',
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<Step> = async (data) => {
    // 新規作成時の処理(配列に新しいオブジェクトを追加)
    if (typeof itemId === 'undefined') {
      setSteps((oldSteps) => [
        ...oldSteps,
        {
          id: getStepId!(),
          url: data.url,
          title: data.title,
          introduction: data.introduction,
          required_time: data.required_time,
          date: data.date,
        },
      ]);
      reset();
    } else {
      // 編集時の処理(配列の指定の値を変更する)
      const newList = replaceItemAtIndex(steps, itemId, {
        id: itemId,
        url: data.url,
        title: data.title,
        introduction: data.introduction,
        required_time: data.required_time,
        date: data.date,
      });
      setSteps(newList);
    }
    handleClose();
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
                        {...register('url')}
                      />
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
                        <DatePicker
                          views={['year', 'month']}
                          value={value}
                          openTo='year'
                          onChange={handleChange}
                          inputFormat='YYYY年MM月'
                          mask='____年__月'
                          renderInput={(params) => <TextField {...params} {...register('date')} />}
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
