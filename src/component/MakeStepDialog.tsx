import { Button, Container, Stack, TextField, Grid, Box, Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
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
      : { url: '', title: '', introduction: '', required_time: '', year: '', month: '' };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Step>({
    defaultValues: {
      url: currentStep?.url,
      title: currentStep?.title,
      introduction: currentStep?.introduction,
      required_time: currentStep?.required_time,
      year: currentStep?.year,
      month: currentStep?.month,
    },
  });

  // 実施年月の年の部分の選択肢を作成
  const setYearOption = () => {
    const list = [];
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      list.push(<MenuItem value={i}>{i}年</MenuItem>);
    }
    return list;
  };

  // 実施年月の月の部分の選択肢を作成
  const setMonthOption = () => {
    const list = [];
    for (let i = 1; i <= 12; i++) {
      list.push(<MenuItem value={i}>{i}月</MenuItem>);
    }
    list.push(<MenuItem value={13}>頃</MenuItem>);
    return list;
  };

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
          year: data.year,
          month: data.month,
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
        year: data.year,
        month: data.month,
      });
      setSteps(newList);
    }
    handleClose();
  };

  // キャンセル時の処理
  const cancel = () => {
    reset();
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
                      ・URL
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name='url'
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            sx={{ width: '100%', bgcolor: '#ffffff' }}
                            placeholder='https://...'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・タイトル(必須)
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name='title'
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            sx={{ width: '100%', bgcolor: '#ffffff' }}
                            placeholder='例.「書籍名」、「サイト名」、「エンジニアと喋る」等、「【今後やりたい】〇〇」'
                          />
                        )}
                      />
                      {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・コメント
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name='introduction'
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            multiline
                            rows={3}
                            sx={{ width: '100%', bgcolor: '#ffffff' }}
                            placeholder='ご自由にお書きください'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・所要時間
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        render={({ field }) => (
                          <Select {...field} sx={{ width: '50%', bgcolor: '#ffffff' }}>
                            <MenuItem value={10}>低 (丸1日あれば実施可能)</MenuItem>
                            <MenuItem value={20}>中 (丸1週間あれば実施可能)(10h〜30h程度)</MenuItem>
                            <MenuItem value={30}>高 (30h以上)</MenuItem>
                          </Select>
                        )}
                        name='required_time'
                        control={control}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・実施年月
                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                        <Controller
                          render={({ field }) => (
                            <Select {...field} sx={{ width: '20%', bgcolor: '#ffffff' }}>
                              {setYearOption()}
                            </Select>
                          )}
                          name='year'
                          control={control}
                        />
                        <Controller
                          render={({ field }) => (
                            <Select {...field} sx={{ width: '20%', bgcolor: '#ffffff' }}>
                              {setMonthOption()}
                            </Select>
                          )}
                          name='month'
                          control={control}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Container>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MakeStepDialog;
