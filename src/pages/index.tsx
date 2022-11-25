import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Box, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import userState from '../recoil/atoms/userState'; // Auth0の認証情報をグローバルステートに保存
import HomeTwitterCard from 'component/HomeTwitterCard';
import Meta from 'component/Meta';
import RoadmapCard from 'component/RoadmapCard';
import SearchModeTabs from 'component/SearchModeTabs';
import useSearchRoadmaps from 'hooks/useSearchRoadmaps';
import { getRoadmaps } from 'services/roadmaps';
import { getTags } from 'services/tags';
import { getMyUser } from 'services/users';
import { RoadmapFullData, Tag } from 'types';

type Props = {
  roadmaps: RoadmapFullData[];
  tags: Tag[];
};

const Home: NextPage<Props> = ({ roadmaps, tags }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const [searchTags, setSearchTags] = useState<Tag[] | undefined>(); // 検索タグを格納
  const [freeSearchWord, setFreeSearchWord] = useState<string | undefined>(); // 検索フリーワードを格納
  const [page, setPage] = useState(1); // ページネーションの値
  const [count, setCount] = useState(1); // ページネーションの最大値

  // 検索結果から出力するロードマップを抽出。
  const targetRoadmap = useSearchRoadmaps({ ...{ roadmaps, searchTags, freeSearchWord } });

  // ページネーションに合わせて、表示する範囲を変更
  const outputRoadmap = targetRoadmap.slice(6 * (page - 1), 6 * page);

  // ページネーションの最大値を設定
  useEffect(() => {
    setCount(Math.floor((targetRoadmap.length - 1) / 6) + 1);
    setPage(1);
  }, [searchTags, freeSearchWord]);

  // ページ変更時に一番上にスクロールするようにする
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ログイン時に認証情報をrecoilに登録
  useEffect(() => {
    const getToken = async () => {
      try {
        // ログイン完了後にトークンを取得しRecoilへ格納
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
        const user_data = await getMyUser(accessToken);
        // ログイン完了後に自身の情報をバックエンドから取得してrecoilへ格納
        // ユーザ登録の場合は、このタイミングでバックエンドに情報が追加される
        setUser({ sub: user_data.sub, name: user_data.name, avatar: user_data.avatar });
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };
    getToken();
  }, []);

  return (
    <>
      <Meta pageTitle='トップ' />
      <HomeTwitterCard />
      <SearchModeTabs {...{ setFreeSearchWord, setSearchTags, tags }} />
      <br />
      <Container maxWidth='lg'>
        <Grid container direction='row' spacing={4}>
          {outputRoadmap.map((roadmap: RoadmapFullData, i: number) => (
            <Grid item xs={12} md={6} key={`roadmap-card${i}`}>
              <Box display='flex' justifyContent='center'>
                <RoadmapCard roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{ mt: 8 }}>
          <Stack spacing={2}>
            <Pagination
              count={count}
              color='primary'
              onChange={(e, page) => {
                setPage(page);
                returnTop();
              }}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const roadmaps = await getRoadmaps();
  const tags = await getTags();

  return { props: { ...{ roadmaps, tags } }, revalidate: 1 };
};

export default Home;
