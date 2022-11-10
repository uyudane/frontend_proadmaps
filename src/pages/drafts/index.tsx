import { withAuthenticationRequired } from '@auth0/auth0-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import { Grid, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Meta from 'component/Meta';
import { useMyUser } from 'services/users';

const DraftPage = () => {
  const { user, isLoading, isError } = useMyUser();

  if (isLoading) return <div>ローディング</div>;
  if (isError) return <div>エラー</div>;
  const draftRoadmaps = user.roadmaps.filter((roadmap: any) => roadmap.is_published == false);
  console.log(draftRoadmaps);
  return (
    <>
      <Meta pageTitle='下書き一覧' />

      <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
        <Box sx={{ maxWidth: 'md' }}>
          <List>
            {draftRoadmaps.length > 0 ? (
              <>
                <Typography variant='h6'>下書きロードマップ一覧</Typography>
                <br />
                {draftRoadmaps.map((roadmap: any) => (
                  <ListItem
                    sx={{ border: 0.1, borderColor: 'grey.500', p: 3 }}
                    secondaryAction={
                      <>
                        <Grid
                          container
                          alignItems='center'
                          justifyContent='center'
                          direction='column'
                        >
                          <Grid item>
                            <IconButton edge='end' aria-label='delete'>
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton edge='end' aria-label='delete'>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </>
                    }
                    key={roadmap.id}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={roadmap.title} secondary={roadmap.introduction} />
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
