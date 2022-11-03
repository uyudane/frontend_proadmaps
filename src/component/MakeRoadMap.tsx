import { Button, Container, Stack, TextField, Grid, Box, Autocomplete } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import MakeRoadMapInfo from './MakeRoadMapInfo';
import Meta from 'component/Meta';
import roadmapState from 'recoil/atoms/roadmapState';
import type { Roadmap } from 'types';

const MakeRoadMap = ({ handleNext }: { handleNext: () => void }) => {
  // (あとで使う)下書き機能、編集機能でデフォルト値を取得するために使用
  // const { user, isLoading, isError } = useGetProadMap(); // Roadmap用にする必要あり

  const setRoadmap = useSetRecoilState(roadmapState);
  const roadmap = useRecoilValue(roadmapState);

  const [Infoopen, setInfoOpen] = useState(true);
  const handleInfoClose = () => setInfoOpen(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Roadmap>({
    defaultValues: {
      title: roadmap.title,
      introduction: roadmap.introduction,
      start_skill: roadmap.start_skill,
      end_skill: roadmap.end_skill,
    },
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
    setRoadmap(data);
    handleNext();
  };
  return (
    <>
      <Meta pageTitle='プロフィール編集' />
      <MakeRoadMapInfo open={Infoopen} handleClose={handleInfoClose} />
      <Grid container>
        <Grid item xs={12} sx={{ pt: 2, pb: 4, bgcolor: '#eeeeee' }}>
          <Container maxWidth='md' sx={{ pt: 1 }}>
            <Stack spacing={4}>
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
                        placeholder='ポートフォリオ作成までの学習記録、○○脱初心者ロードマップ、○○の資格を取るまでにやったこと　等'
                      />
                    )}
                  />
                  {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・概要、前書き
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='introduction'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ width: '100%', bgcolor: '#ffffff' }}
                        multiline
                        rows={4}
                        placeholder='ご自由にお書きください'
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・開始時スキル
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        sx={{ width: '50%', bgcolor: '#ffffff' }}
                        freeSolo
                        autoSelect
                        disableClearable
                        {...field}
                        options={[
                          'プログラミング完全未経験',
                          '別の言語を学習した経験あり',
                          '○○の学習経験あり',
                          'ポートフォリオ作成後',
                          '実務で少し使用経験あり',
                          '実務で使用経験がありより知識を深める',
                          '会社の研修で○○を少し学習した程度',
                          'その他(自由記述)',
                        ]}
                        renderInput={(params) => (
                          <TextField {...params} placeholder='選択/自由記述' />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                    name='start_skill'
                    control={control}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・終了時スキル
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        sx={{ width: '50%', bgcolor: '#ffffff' }}
                        freeSolo
                        autoSelect
                        disableClearable
                        {...field}
                        options={[
                          '入門脱出！',
                          '基礎はOK',
                          'ポートフォリオに取り掛かれる',
                          '実務に取り掛かれる',
                          '実務で自信を持って開発できる',
                          '第一人者★',
                          'その他(自由記述)',
                          '',
                        ]}
                        renderInput={(params) => (
                          <TextField {...params} placeholder='選択/自由記述' />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                    name='end_skill'
                    control={control}
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
