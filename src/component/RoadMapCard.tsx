import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Grid, Paper } from '@mui/material';
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
    <Paper sx={{ border: 0.5, p: 1, width: '30%', maxWidth: 'md', borderRadius: '16px' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='body1' color='text.secondary'>
            {user.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1' component='div' sx={{ mb: 0.5 }}>
            {roadmap.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <Typography variant='body2'>
            タグ:{' '}
            {roadmap.tags
              .map((tag) => tag.name)
              .join(',')
              .slice(0, 50)}
            ...
          </Typography>
        </Grid>
        <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
          <Grid item>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon fontSize='small' />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoadMapCard;
