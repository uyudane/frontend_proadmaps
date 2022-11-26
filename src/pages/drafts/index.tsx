import { withAuthenticationRequired } from '@auth0/auth0-react';
import FolderIcon from '@mui/icons-material/Folder';
import { Grid, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { NextPage } from 'next';
import Meta from 'component/Meta';
import RoadmapEditDeleteButton from 'component/RoadmapEditDeleteButton';
import { useMyUser } from 'services/users';

const DraftPage: NextPage = () => {
  const { user, isLoading, isError } = useMyUser();

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError) return <div>エラー</div>;
  // エラーにならない時点でuserが取得できている想定
  const draftRoadmaps = user!.roadmaps.filter((roadmap) => roadmap.is_published == false);
  return (
    <>
      <Meta pageTitle='下書き一覧' />
      <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', maxWidth: 'md' }}>
          <List>
            {draftRoadmaps.length > 0 ? (
              <>
                <Typography variant='h6'>下書きロードマップ一覧</Typography>
                <Box
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Typography color='red' variant='body2'>
                    ※下書き編集/削除機能はPCのみになります。
                  </Typography>
                </Box>
                <br />
                {draftRoadmaps.map((roadmap) => (
                  <ListItem sx={{ border: 0.1, borderColor: 'grey.500', p: 3 }} key={roadmap.id}>
                    <Grid container alignItems='center' justifyContent='center' direction='row'>
                      <Grid item xs={3} md={1}>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                      </Grid>
                      <Grid item xs={9} md={10}>
                        <ListItemText
                          primary={roadmap.title}
                          secondary={roadmap.introduction}
                          sx={{ wordWrap: 'break-word' }}
                        />
                      </Grid>
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'block' },
                        }}
                      >
                        <Grid item xs={0} md={1}>
                          <Grid
                            container
                            alignItems='center'
                            justifyContent='center'
                            direction='column'
                          >
                            <RoadmapEditDeleteButton roadmap={roadmap} />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </ListItem>
                ))}
              </>
            ) : (
              <Typography variant='body1'>下書きはありません。</Typography>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default withAuthenticationRequired(DraftPage, {
  onRedirecting: () => <div>このページを開くにはログインが必要です。</div>,
});
