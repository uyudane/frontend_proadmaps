import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Box } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import userState from '../recoil/atoms/userState'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/Meta';
import RoadmapCard from 'component/RoadmapCard';
import SearchModeTabs from 'component/SearchModeTabs';
import { getRoadmaps } from 'services/roadmaps';
import { getTags } from 'services/tags';
import { getMyUser } from 'services/users';

const Home: NextPage = ({ roadmaps, tags }: any) => {
  const { getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const [freeSarchWord, setFreeSearchWord] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        // ログイン完了後にトークンを取得しRecoilへ格納
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
        const user_data = await getMyUser(accessToken);
        // ログイン完了後に自身の情報をバックエンドから取得してrecoilへ格納
        // ユーザ登録の場合は、このタイミングでバックエンドに情報が追加される
        setUser({ sub: user_data.sub, name: user_data.name });
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  const reg = new RegExp(freeSarchWord);
  const outputRoadmap = [...roadmaps].filter((roadmap) => roadmap.title.match(reg));

  return (
    <>
      <Meta pageTitle='トップ' />
      <div>記事一覧/検索画面</div>
      <SearchModeTabs setFreeSearchWord={setFreeSearchWord} />
      <br />
      <Grid container direction='row' spacing={2}>
        {outputRoadmap.map((roadmap: any, i: any) => (
          <Grid item xs={6} key={`roadmap-card${i}`}>
            <Box display='flex' justifyContent='center'>
              <RoadmapCard roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const getStaticProps = async () => {
  const roadmaps = await getRoadmaps();
  const tags = await getTags();

  return { props: { roadmaps: roadmaps, tags: tags }, revalidate: 5 };
};

export default Home;
