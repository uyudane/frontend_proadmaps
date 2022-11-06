import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Roadmap, Step, UserState } from 'types';

const RoadMapIntroduction = ({
  roadmap,
  steps,
  user,
}: {
  roadmap: Roadmap;
  steps: Step[];
  user: UserState;
}) => {
  return (
    <>
      <Box sx={{ maxWidth: 'xl', m: 2 }}>
        <Grid container>
          <Grid container xs={10}>
            <Grid container>
              <Typography variant='h6'>{user.name}</Typography>
            </Grid>
            <Grid container>
              <Typography variant='h5' component='div' sx={{ mb: 0.5 }}>
                {roadmap.title}
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant='body1'>タグ: {roadmap.tags.join(',')}</Typography>
            </Grid>
            <Grid container>
              <Typography variant='body1' sx={{ mb: 1 }} lineHeight={1.5}>
                開始時スキル: {roadmap.start_skill}
                <br />
                終了時スキル: {roadmap.end_skill}
                <br />
                総ステップ数: {steps.length}
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant='body1'>{roadmap.introduction}</Typography>
            </Grid>
          </Grid>
          <Grid container xs={2} direction='column' justifyContent='center' alignItems='flex-end'>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RoadMapIntroduction;
