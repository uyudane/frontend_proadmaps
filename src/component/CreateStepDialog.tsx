import { Button, Container, Stack, TextField, Grid, Box, Select, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import CreateStepTitleTooltip from './CreateStepTitleTooltip';
import stepsState from 'recoil/atoms/stepsState';
import { getURLData } from 'services/roadmaps';
import type { Step } from 'types';

// 編集時に使用する関数。編集するオブジェクトの値を変更して、前後は元の値で上書く。
const replaceItemAtIndex = (arr: Step[], index: number, newValue: Step) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

type Props = {
  handleClose: () => void;
  open: boolean;
  // 新規のステップの際はgetStepIdが渡される
  getStepId?: () => number;
  // ステップの編集時にはindexが渡される
  index?: number;
};

const CreateStepDialog = ({
  handleClose,
  open,
  getStepId = undefined,
  index = undefined,
}: Props) => {
  const [steps, setSteps] = useRecoilState(stepsState);

  // IDを渡された場合(編集の場合)はデフォルト値がもとの値になり、新規作成の場合は空にする
  const currentStep =
    typeof index !== 'undefined'
      ? steps[index]
      : {
          id: undefined,
          url: '',
          title: '',
          introduction: '',
          required_time: '',
          year: '',
          month: '',
        };

  // フォームで使用するライブラリの取得。編集時に使用するデフォルトの値の設定
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Step>({
    defaultValues: {
      url: currentStep.url,
      title: currentStep.title,
      introduction: currentStep.introduction,
      required_time: currentStep.required_time,
      year: currentStep.year,
      month: currentStep.month,
    },
  });

  // 実施年月の年の部分の選択肢を作成
  const setYearOption = () => {
    const list = [];
    for (let i = 2010; i <= new Date().getFullYear(); i++) {
      list.push(
        <MenuItem key={`year${i}`} value={`${i}年`}>
          {i}年
        </MenuItem>,
      );
    }
    return list;
  };

  // 実施年月の月の部分の選択肢を作成
  const setMonthOption = () => {
    const list = [];
    for (let i = 1; i <= 12; i++) {
      list.push(
        <MenuItem key={`month${i}`} value={`${i}月`}>
          {i}月
        </MenuItem>,
      );
    }
    list.push(
      <MenuItem key={`month13`} value={'頃'}>
        頃
      </MenuItem>,
    );
    return list;
  };

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<Step> = async (data) => {
    // 新規作成時の処理(配列に新しいオブジェクトを追加)
    if (typeof index === 'undefined') {
      setSteps((oldSteps) => [
        ...oldSteps,
        {
          // 新規作成時はgetStepId()が渡されている想定
          id: currentStep?.id || getStepId!(),
          url: data.url,
          title: data.title,
          introduction: data.introduction,
          required_time: data.required_time,
          year: data.year,
          month: data.month,
          // step_numberは表示の際に使用するもので、作成時には関係ないためnullを入れる
          step_number: null,
        },
      ]);
      reset();
    } else {
      // 編集時の処理(配列の指定の値を変更する)
      const newList = replaceItemAtIndex(steps, index, {
        //index === 'undefined出ない時点で、idに値が入っている想定
        id: currentStep.id as number,
        url: data.url,
        title: data.title,
        introduction: data.introduction,
        required_time: data.required_time,
        year: data.year,
        month: data.month,
        // step_numberは表示の際に使用するもので、作成時には関係ないためnullを入れる
        step_number: null,
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

  // URLからOGP情報を読み出して、タイトルを自動的に埋める
  const getURL = async () => {
    const url = getValues('url');
    if (!url) {
      return;
    }
    const urlData = await getURLData({ url });
    const title = `【${urlData.site_name}】 ${urlData.title}`;
    // titleが取れなかった場合、もしくはURLが誤っていた場合は【】を設定する
    if (title === '【undefined】 undefined' || title === '【】 ') {
      setValue('title', '【】');
    } else {
      setValue('title', title);
    }
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
                            sx={{ width: '80%', bgcolor: '#ffffff' }}
                            placeholder='https://...'
                          />
                        )}
                      />
                      <Button variant='outlined' onClick={getURL} sx={{ width: '20%' }}>
                        タイトルを読み込む(数秒かかります)
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・タイトル(必須)
                      <CreateStepTitleTooltip />
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
                            placeholder='例.「書籍名」、「サイト名」、「簡単なアプリを作る」、「【実施予定】〇〇」等'
                          />
                        )}
                      />
                      {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      ・紹介文/コメント
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
                      ・所要時間/ボリューム
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        render={({ field }) => (
                          <Select {...field} sx={{ width: '50%', bgcolor: '#ffffff' }}>
                            <MenuItem key={'time1'} value={'小 (10h以内)'}>
                              小 (10h以内)
                            </MenuItem>
                            <MenuItem key={'time2'} value={'中 (10h〜40h程度)'}>
                              中 (10h〜40h程度)
                            </MenuItem>
                            <MenuItem key={'time3'} value={'大 (40h以上)'}>
                              大 (40h以上)
                            </MenuItem>
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

export default CreateStepDialog;
