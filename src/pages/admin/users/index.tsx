import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AdminUserDeleteButton from 'component/AdminUserDeleteButton';
import Meta from 'component/Meta';
import useAuthAdminAndRedirect from 'hooks/useAuthAdminAndRedirect';
import { useUsersAdmin } from 'services/admin';

const AdminUsersPage = () => {
  useAuthAdminAndRedirect();
  const { users, isLoading, isError } = useUsersAdmin();
  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError) return <div>エラー</div>;
  return (
    <>
      <Meta pageTitle='Adminユーザ一覧' />
      {users!.map((user) => (
        <ListItem sx={{ border: 0.1, borderColor: 'grey.500', p: 3 }} key={user.sub}>
          <Grid container alignItems='center' justifyContent='center' direction='row'>
            <Grid item xs={10}>
              <ListItemText
                primary={user.name}
                secondary={user.sub}
                sx={{ wordWrap: 'break-word' }}
              />
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems='center' justifyContent='center' direction='column'>
                <AdminUserDeleteButton user={user} />
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </>
  );
};

export default AdminUsersPage;
