import { Button, TextField, Grid } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Tag } from 'types';

type Props = {
  setSearchTags: Dispatch<SetStateAction<Tag[] | undefined>>;
  setFreeSearchWord: Dispatch<SetStateAction<string | undefined>>;
};

type useFormProps = {
  searchWord: string;
};

const FreeSearchInput = ({ setSearchTags, setFreeSearchWord }: Props) => {
  const { handleSubmit, control } = useForm<useFormProps>({
    defaultValues: {
      searchWord: '',
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<useFormProps> = async (data) => {
    setSearchTags(undefined);
    setFreeSearchWord(data.searchWord);
  };

  return (
    <>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={9} md={8}>
          <Controller
            name='searchWord'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: '100%', bgcolor: '#ffffff' }}
                placeholder='タイトル/概要を検索します。'
              />
            )}
          />
        </Grid>
        <Grid item xs={2} md={2}>
          <Button
            onClick={handleSubmit(onSubmit)}
            color='primary'
            variant='contained'
            sx={{ ml: 2 }}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FreeSearchInput;
