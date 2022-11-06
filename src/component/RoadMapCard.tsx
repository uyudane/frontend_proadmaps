import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Roadmap, Step, UserState } from 'types';

const RoadMapCard = ({
  roadmap,
  steps,
  user,
}: {
  roadmap: Roadmap;
  steps: Step[];
  user: UserState;
}) => {
  return (
    <Box sx={{ border: 1, p: 1, maxWidth: '500px', borderRadius: '16px' }}>
      <Grid container>
        <Grid container>
          <Grid container>
            <Typography variant='body1' color='text.secondary'>
              {user.name}
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant='subtitle1' component='div' sx={{ mb: 0.5 }}>
              {roadmap.title}
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant='body2' sx={{ mb: 1 }} color='text.secondary' lineHeight={1.5}>
              開始時スキル: {roadmap.start_skill}
              <br />
              終了時スキル: {roadmap.end_skill}
              <br />
              総ステップ数: {steps.length}
              <br />
              概要: {roadmap.introduction.slice(0, 60)}...
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant='body2'>タグ: {roadmap.tags.join(',').slice(0, 50)}...</Typography>
          </Grid>
          <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon fontSize='small' />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoadMapCard;
