import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Paper, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RoadmapFullData, Step, User } from 'types';

type Props = {
  roadmap: RoadmapFullData;
  steps: Step[];
  user: User;
};

const RoadmapCard = ({ roadmap, steps, user }: Props) => {
  // ロードマップカードタイトルのリンク有無に使用
  const router = useRouter();

  const toProfile = () => {
    router.push(`/${user.sub}`);
  };

  return (
    <Paper sx={{ border: 0.5, p: 1, width: { xs: '100%', md: '520px' }, borderRadius: '16px' }}>
      <Grid container>
        {/* ロードマップ作成/編集ページの時はリンクにせず、それ以外の時はリンクにする */}
        {router.pathname === '/roadmap/new' || router.pathname === '/drafts/[id]/edit' ? (
          <Grid container alignItems='center'>
            <Grid item xs={3} md={1.5}>
              <IconButton>
                <Avatar alt='Remy Sharp' src={user.avatar} />
              </IconButton>
            </Grid>
            <Grid item xs={9} md={10.5}>
              <Typography
                variant='body1'
                sx={{ cursor: 'pointer' }}
                // color='text.secondary'
                component='a'
              >
                {user.name}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems='center'>
            <Grid item xs={3} md={1.5}>
              <IconButton onClick={toProfile}>
                <Avatar alt='Remy Sharp' src={user.avatar} />
              </IconButton>
            </Grid>
            <Grid item xs={9} md={7.5}>
              <Link href={`/${user.sub}`}>
                <Typography
                  variant='body1'
                  sx={{ cursor: 'pointer' }}
                  // color='text.secondary'
                  component='a'
                >
                  {user.name}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant='body2'>{roadmap.created_date}</Typography>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          {/* ロードマップ作成/編集ページの時はリンクにせず、それ以外の時はリンクにする */}
          {router.pathname === '/roadmap/new' || router.pathname === '/drafts/[id]/edit' ? (
            <Typography
              variant='h6'
              component='a'
              sx={{ mb: 0.5, textDecoration: 'underline', wordWrap: 'break-word' }}
              color='primary'
            >
              {roadmap.title.slice(0, 100)}
            </Typography>
          ) : (
            <Link href={`${user.sub}/roadmaps/${roadmap.id}`}>
              <Typography
                variant='h6'
                component='a'
                sx={{
                  mb: 0.5,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  wordWrap: 'break-word',
                }}
                color='primary'
              >
                {roadmap.title.slice(0, 100)}
              </Typography>
            </Link>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='body2'
            sx={{ mb: 1, wordWrap: 'break-word' }}
            color='text.secondary'
            lineHeight={1.5}
          >
            開始時スキル: {roadmap.start_skill.slice(0, 50)}
            <br />
            終了時スキル: {roadmap.end_skill.slice(0, 50)}
            <br />
            総ステップ数: {steps.length}
            <br />
            概要: {roadmap.introduction.slice(0, 100)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
            タグ:{' '}
            {roadmap.tags
              .map((tag) => tag.name)
              .join(',')
              .slice(0, 50)}
          </Typography>
        </Grid>
        <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
          <Grid item>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{ pr: 1 }}>
              <FavoriteIcon sx={{ pr: 1 }} />
              {roadmap.number_of_likes}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoadmapCard;
