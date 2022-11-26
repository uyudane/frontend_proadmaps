import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RoadmapLikeButton from './RoadmapLikeButton';
import RoadmapTweetButton from './RoadmapTweetButton';
import { RoadmapFullData, Step, UserState, Roadmap } from 'types';

type Props = {
  // 詳細時はRoadmapFullData、Roadmapは確認時に渡ってくる
  roadmap: RoadmapFullData | Roadmap;
  steps: Step[];
  user: UserState;
};

const RoadmapIntroduction = ({ roadmap, steps, user }: Props) => {
  const router = useRouter();
  const toProfile = () => {
    router.push(`/${user.sub}`);
  };
  return (
    <>
      <Box sx={{ width: '100%', m: 2 }}>
        <Grid container alignItems='center'>
          <Grid item xs={11}>
            {router.pathname === '/roadmap/new' || router.pathname === '/drafts/[id]/edit' ? (
              <Grid container alignItems='center' spacing='8'>
                <Grid item>
                  <IconButton>
                    <Avatar alt='Remy Sharp' src={user.avatar} sx={{ width: 56, height: 56 }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h6'
                    sx={{ cursor: 'pointer' }}
                    // color='text.secondary'
                    component='a'
                  >
                    {user.name}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container alignItems='center' spacing='8'>
                <Grid item>
                  <IconButton onClick={toProfile}>
                    <Avatar alt='Remy Sharp' src={user.avatar} sx={{ width: 56, height: 56 }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Link href={`/${user.sub}`}>
                    <Typography
                      variant='h6'
                      sx={{ cursor: 'pointer' }}
                      // color='text.secondary'
                      component='a'
                    >
                      {user.name}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant='h4' component='div' sx={{ mb: 0.5, wordWrap: 'break-word' }}>
                {roadmap.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                概要
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5, wordWrap: 'break-word' }}>
                {roadmap.introduction}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                タグ
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5, wordWrap: 'break-word' }} lineHeight={1.5}>
                {roadmap.tags.map((tag) => tag.name).join(',')}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                開始時スキル
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5, wordWrap: 'break-word' }} lineHeight={1.5}>
                {roadmap.start_skill}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                終了時スキル
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5, wordWrap: 'break-word' }} lineHeight={1.5}>
                {roadmap.end_skill}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ fontWeight: 'bold' }}>
                総ステップ数
              </Typography>
              <Typography variant='body1' sx={{ mb: 0.5 }} lineHeight={1.5}>
                {steps.length}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
              <Grid item>
                <RoadmapLikeButton roadmap={roadmap} />
              </Grid>
              <br />
              <Grid item>
                {router.pathname !== '/roadmap/new' && router.pathname !== '/drafts/[id]/edit' && (
                  <RoadmapTweetButton roadmap={roadmap} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RoadmapIntroduction;
