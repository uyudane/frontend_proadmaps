import { Button, TextField, Grid, Autocomplete } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Tag } from 'types';

type Props = {
  setSearchTags: Dispatch<SetStateAction<Tag[] | undefined>>;
  setFreeSearchWord: Dispatch<SetStateAction<string | undefined>>;
  tags: Tag[];
};

const TagSearchInput = ({ setSearchTags, setFreeSearchWord, tags }: Props) => {
  const tagTemplate = tags;

  type useFormProps = {
    tags: Tag[];
  };

  const { handleSubmit, control } = useForm<useFormProps>({
    defaultValues: {
      tags: [],
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<useFormProps> = async (data) => {
    // タグデータがない場合はundefinedにする。(全出力にするため)
    data.tags.length > 0 ? setSearchTags(data.tags) : setSearchTags(undefined);
    setFreeSearchWord(undefined);
  };

  return (
    <>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={9} md={8}>
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
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => (
                  <TextField {...params} placeholder='タグをAND検索します。' />
                )}
                autoSelect
                onChange={(_, data) => field.onChange(data)}
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

export default TagSearchInput;
