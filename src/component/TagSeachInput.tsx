import { Button, TextField, Grid, Box, Autocomplete } from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

const TagSearchInput = ({ setSearchTags, tags }: any) => {
  const tagTemplate = tags;

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
    setSearchTags(data.tags);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Controller
            name='tags'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Autocomplete
                sx={{ bgcolor: '#FFFFFF' }}
                {...field}
                multiple
                options={tagTemplate}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} placeholder='ロードマップのタグを検索します。' />
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
