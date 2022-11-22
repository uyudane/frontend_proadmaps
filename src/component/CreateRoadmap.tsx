import { Button, Container, Stack, TextField, Grid, Box, Autocomplete, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import CreateRoadmapInfo from './CreateRoadmapInfo';
import RoadmapCancelButton from './RoadmapCancelButton';
import Meta from 'component/Meta';
import roadmapState from 'recoil/atoms/roadmapState';
import { getTags } from 'services/tags';
import type { Tag, RoadmapWhenCreating } from 'types';

type Props = {
  handleNext: () => void;
};

const CreateRoadmap = ({ handleNext }: Props) => {
  // タグの入力例を設定
  const [tagTemplate, setTagTemplate] = useState<string[]>([]);
  useEffect(() => {
    const execGetTags = async () => {
      // 過去に使用されたタグ
      const usedTags = await getTags();
      const usedTagsArray = usedTags.map((tag: Tag) => tag.name);
      // テンプレートとして追加したいタグ
      const template = [
        'Ruby',
        'Rails',
        'PHP',
        'Laravel',
        'Python',
        'Django',
        'データベース',
        'Vue.js',
        'Nuxt.js',
        'React',
        'Next.js',
        'HTML',
        'CSS',
        'JavaScript',
        '初学者',
      ];
      // テンプレートのタグと使用されたタグを結合して、重複を排除
      setTagTemplate(Array.from(new Set(template.concat(usedTagsArray))));
    };
    execGetTags();
  }, []);

  // tagの初期値の設定について、MUIのAutocompleteのmultipleを使用していたところ、
  // リロードすると「Hydration failed because the initial UI does not match what was rendered on the server」のエラーが出力。
  // おそらく、タグを表現しているチップが原因でサーバ側とクライアントでレンダリング結果が不一致となっているため、
  // useEffectで設定するようにする。
  useEffect(() => {
    setValue(
      'tags',
      roadmap.tags.map((tag: Tag) => tag.name),
    );
  }, []);

  const setRoadmap = useSetRecoilState(roadmapState);
  const roadmap = useRecoilValue(roadmapState);
  const [Infoopen, setInfoOpen] = useState(true);
  const handleInfoClose = () => setInfoOpen(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoadmapWhenCreating>({
    defaultValues: {
      ...roadmap,
      tags: [],
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<RoadmapWhenCreating> = async (data) => {
    // バリデーションチェックOKなときに行う処理を追加
    setRoadmap({
      ...data,
      // tagのデータについて、DBの設定に合わせてnameプロパティのオブジェクトに変換する
      tags: data.tags.map((tag) => ({ name: tag })),
      id: roadmap.id,
      is_published: roadmap.is_published,
    });
    handleNext();
  };

  return (
    <>
      <Meta pageTitle='プロフィール編集' />
      <CreateRoadmapInfo open={Infoopen} handleClose={handleInfoClose} />
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
                        placeholder='ポートフォリオ作成/エンジニア転職までの学習記録、○○脱初心者ロードマップ、○○の資格取得までにやったこと　等'
                      />
                    )}
                  />
                  {errors.title && <Box color='red'>入力が必須の項目です</Box>}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  ・タグ(必須)
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='tags'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        sx={{ bgcolor: '#FFFFFF' }}
                        {...field}
                        multiple
                        // id='tags-filled'
                        options={tagTemplate.map((option) => option)}
                        freeSolo
                        // 自由記述をタグのChipにする処理
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip
                              variant='filled'
                              label={option}
                              {...getTagProps({ index })}
                              key={`tag${index}`}
                              sx={{ bgcolor: '#F2DF3A' }}
                            />
                          ))
                        }
                        autoSelect
                        disableClearable
                        renderInput={(params) => (
                          <TextField {...params} placeholder='選択/自由記述' />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                  {errors.tags && <Box color='red'>入力が必須の項目です</Box>}
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
                        {...field}
                        options={[
                          'プログラミング完全未経験',
                          '別の言語を学習した経験あり',
                          '○○の学習経験あり',
                          'ポートフォリオ作成後',
                          '実務で少し使用経験あり',
                          '実務で使用経験があり、より知識を深めたい',
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
        <RoadmapCancelButton />
        <Button
          onClick={handleSubmit(onSubmit)}
          color='primary'
          variant='contained'
          sx={{ ml: 10 }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default CreateRoadmap;
