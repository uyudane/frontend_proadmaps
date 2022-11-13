import { ConnectedTvOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import RoadmapCard from './RoadmapCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブの下側に表示される部分
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

const ProfilePageTabs = ({ user, usersRoadmaps, likedRoadmaps }: any) => {
  const [value, setValue] = useState(0);

  // 選択されたタブに合わせて、valueを変更
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* valueの値と一致したTabが表示される? */}
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label='投稿' />
            <Tab label='いいね' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {usersRoadmaps.length === 0 ? (
            '投稿したロードマップはありません'
          ) : (
            <Grid container direction='row' spacing={2}>
              {usersRoadmaps.map((roadmap: any, i: any) => (
                <Grid item xs={6} key={`roadmap-card${i}`}>
                  <Box display='flex' justifyContent='center'>
                    <RoadmapCard roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {likedRoadmaps.length === 0 ? (
            'いいねしたロードマップはありません'
          ) : (
            <Grid container direction='row' spacing={2}>
              {likedRoadmaps.map((roadmap: any, i: any) => (
                <Grid item xs={6} key={`roadmap-card${i}`}>
                  <Box display='flex' justifyContent='center'>
                    <RoadmapCard roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Box>
    </>
  );
};

export default ProfilePageTabs;
