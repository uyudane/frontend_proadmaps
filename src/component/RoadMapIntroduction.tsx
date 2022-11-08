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
      <Box sx={{ width: '100%', m: 2 }}>
        <Grid container alignItems='center'>
          <Grid item xs={11}>
            <Grid item xs={12}>
              <Typography variant='h6'>{user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' component='div' sx={{ mb: 0.5 }}>
                {roadmap.title}
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                タグ
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5 }} lineHeight={1.5}>
                {roadmap.tags.map((tag) => tag.name).join(',')}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                開始時スキル
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5 }} lineHeight={1.5}>
                {roadmap.start_skill}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                終了時スキル
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5 }} lineHeight={1.5}>
                {roadmap.end_skill}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                総ステップ数
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5 }} lineHeight={1.5}>
                {steps.length}
              </Typography>
            </Grid>
            <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
              概要
            </Typography>
            <Grid item xs={12}>
              <Typography variant='body1'>{roadmap.introduction}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container direction='column' justifyContent='center' alignItems='flex-end'>
              <Grid item>
                <IconButton aria-label='add to favorites'>
                  <FavoriteIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label='share'>
                  <ShareIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RoadMapIntroduction;
