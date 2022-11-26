import { Grid, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OgpCard from './OgpCard';
import { Step } from 'types';

type Props = {
  step: Step;
  index: string;
};

const StepCard = ({ step, index }: Props) => {
  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '80%' }, mb: 2, border: 2 }}>
        <Grid container sx={{ bgcolor: '#143F6B' }}>
          <Grid item xs={12}>
            <Typography variant='subtitle1' component='div' color='white'>
              {`ステップ${index}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link href={step.url} target='_blank' rel='noopener noreferrer' underline='hover'>
              <Typography
                variant='h6'
                component='div'
                color='white'
                sx={{ wordWrap: 'break-word' }}
              >
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
            <Typography
              variant='body1'
              component='div'
              sx={{ mb: 1, wordWrap: 'break-word' }}
              lineHeight={1.5}
            >
              {step.introduction}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={5}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <OgpCard url={step.url} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StepCard;
