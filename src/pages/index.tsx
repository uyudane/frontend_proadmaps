import { useAuth0 } from '@auth0/auth0-react';
import { getStepUtilityClass, Grid } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import userState from '../recoil/atoms/userState'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/Meta';
import RoadMapCard from 'component/RoadMapCard';
import { getRoadmaps } from 'services/roadmaps';
import { getMyUser } from 'services/users';
import type { User, Roadmap } from 'types';

const Home: NextPage = ({ roadmaps }: any) => {
  console.log(roadmaps);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

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

  return (
    <>
      <Meta pageTitle='トップ' />
      <div>記事一覧/検索画面</div>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Grid item>
          {roadmaps.map((roadmap: any, i: any) => (
            // <StepCard key={`step${i}`} step={step} index={String(i + 1)} />
            <RoadMapCard
              key={`roadmap${i}`}
              roadmap={roadmap}
              steps={roadmap.steps}
              user={roadmap.user}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticProps = async () => {
  const roadmaps = await getRoadmaps();

  return { props: { roadmaps: roadmaps } };
};

export default Home;
