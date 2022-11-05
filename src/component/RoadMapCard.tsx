import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    <Box sx={{ maxWidth: 'sm' }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='body1' color='text.secondary'>
            {user.name}
          </Typography>
          <Typography variant='subtitle1' component='div' sx={{ mb: 0.5 }}>
            {roadmap.title}
          </Typography>
          <Typography variant='body2' sx={{ mb: 1 }} color='text.secondary' lineHeight={1.5}>
            開始時スキル: {roadmap.start_skill}
            <br />
            終了時スキル: {roadmap.end_skill}
            <br />
            総ステップ数: {steps.length}
            <br />
            概要: {roadmap.introduction.slice(0, 60)}...
          </Typography>
          <Typography variant='body2'>タグ: dummy,dummy,dummy,dummy,dummy,dummy</Typography>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon fontSize='small' />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon fontSize='small' />
          </IconButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoadMapCard;
