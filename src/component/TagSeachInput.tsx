import { Button, TextField, Grid, Box, Autocomplete } from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

const TagSearchInput = ({ setSearchTags, setFreeSearchWord, tags }: any) => {
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
    // タグデータがない場合はundefinedにする。(全出力にするため)
    data.tags.length > 0 ? setSearchTags(data.tags) : setSearchTags();
    setFreeSearchWord();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Controller
            name='tags'
            control={control}
            render={({ field }) => (
              <Autocomplete
                sx={{ bgcolor: '#FFFFFF' }}
                {...field}
                multiple
                options={tagTemplate}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} placeholder='ロードマップのタグをAND検索します。' />
                )}
                autoSelect
                onChange={(_, data) => field.onChange(data)}
              />
            )}
          />
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
