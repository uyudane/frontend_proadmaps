import { Button, TextField, Grid, Box, Autocomplete } from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

const TagSearchInput = () => {
  const tagTemplate = [
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
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      tags: [],
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<any> = async (data) => {
    // バリデーションチェックOKなときに行う処理を追加
    console.log(data);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          ・タグ(必須)
        </Grid>
        <Grid item xs={10}>
          <Controller
            name='tags'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Autocomplete
                sx={{ bgcolor: '#FFFFFF' }}
                {...field}
                multiple
                options={tagTemplate.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    label='Multiple values'
                    placeholder='Favorites'
                  />
                )}
                autoSelect
                onChange={(_, data) => field.onChange(data)}
              />
            )}
          />
          {errors.tags && <Box color='red'>入力が必須の項目です</Box>}
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleSubmit(onSubmit)}
            color='primary'
            variant='contained'
            sx={{ ml: 10 }}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TagSearchInput;
