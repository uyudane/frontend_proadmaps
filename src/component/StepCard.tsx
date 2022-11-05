import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Grid, Link } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import OgpCard from './OgpCard';
import { Step } from 'types';

const StepCard = ({ step, index }: { step: Step; index: string }) => {
  return (
    <>
      <Box sx={{ maxWidth: 'lg', m: 2, border: 2 }}>
        <Grid container alignItems='center' justifyContent='center'>
          <Grid container sx={{ bgcolor: '#143F6B' }}>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' color='white'>
                {`ステップ${index}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link href={step.url} target='_blank' rel='noopener noreferrer'>
                <Typography variant='h6' component='div' color='white'>
                  {step.title}
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                紹介文/コメント
              </Typography>
              <Typography variant='body1' component='div' sx={{ mb: 1 }} lineHeight={1.5}>
                {step.introduction}
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={5}>
            <Grid item xs={12}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                所要時間
              </Typography>
              <Typography variant='body1' sx={{ mb: 1 }} lineHeight={1.5}>
                {step.required_time}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                実施年月
              </Typography>
              <Typography variant='body1' component='div' sx={{ mb: 1 }} lineHeight={1.5}>
                {`${step.year}${step.month}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                タグ
              </Typography>
              <Typography variant='body1' component='div' sx={{ mb: 1 }} lineHeight={1.5}>
                dummy,dummy,dummy,dummy,dummy,dummy
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon fontSize='small' />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon fontSize='small' />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container xs={7}>
            <Grid item xs={12}>
              <OgpCard url={step.url} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StepCard;
