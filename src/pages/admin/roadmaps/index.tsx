import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AdminRoadmapDeleteButton from 'component/AdminRoadmapDeleteButton';
import Meta from 'component/Meta';
import useAuthAdminAndRedirect from 'hooks/useAuthAdminAndRedirect';
import { useRoadmapsAdmin } from 'services/admin';

const AdminRoadmapsPage = () => {
  useAuthAdminAndRedirect();
  const { roadmaps, isLoading, isError } = useRoadmapsAdmin();
  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError) return <div>エラー</div>;
  return (
    <>
      <Meta pageTitle='Adminロードマップ一覧' />
      {roadmaps!.map((roadmap) => (
        <ListItem sx={{ border: 0.1, borderColor: 'grey.500', p: 3 }} key={roadmap.id}>
          <Grid container alignItems='center' justifyContent='center' direction='row'>
            <Grid item xs={10}>
              <ListItemText
                primary={roadmap.title}
                secondary={roadmap.user.name}
                sx={{ wordWrap: 'break-word' }}
              />
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems='center' justifyContent='center' direction='column'>
                <AdminRoadmapDeleteButton roadmap={roadmap} />
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </>
  );
};

export default AdminRoadmapsPage;
