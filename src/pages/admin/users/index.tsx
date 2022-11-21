import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Box, Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/Meta';
import RoadmapCard from 'component/RoadmapCard';
import RoadmapEditDeleteButton from 'component/RoadmapEditDeleteButton';
import SearchModeTabs from 'component/SearchModeTabs';
import useSearchRoadmaps from 'hooks/useSearchRoadmaps';
import { useUsersAdmin } from 'services/admin';
import { getRoadmaps } from 'services/roadmaps';
import { getTags } from 'services/tags';
import { getMyUser } from 'services/users';
import { RoadmapFullData, Tag } from 'types';

const AdminUsersPage = () => {
  const { users, isLoading, isError } = useUsersAdmin();
  if (isLoading) return <div>ローディング</div>;
  if (isError) return <div>エラー</div>;
  return (
    <>
      <Meta pageTitle='Adminロードマップ一覧' />
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
              {/* <Grid container alignItems='center' justifyContent='center' direction='column'>
                <RoadmapEditDeleteButton roadmap={roadmap} />
              </Grid> */}
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </>
  );
};

export default AdminUsersPage;
