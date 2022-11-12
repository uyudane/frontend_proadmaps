import { Button, TextField, Grid, Box } from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

const FreeSearchInput = ({ setFreeSearchWord }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      searchWord: '',
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<any> = async (data) => {
    setFreeSearchWord(data.searchWord);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Controller
            name='searchWord'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: '100%', bgcolor: '#ffffff' }}
                placeholder='ロードマップ/ステップのタイトルを検索します。'
              />
            )}
          />
          {errors.title && <Box color='red'>入力が必須の項目です</Box>}
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

export default FreeSearchInput;
