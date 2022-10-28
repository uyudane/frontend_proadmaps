import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';
import { getUsers, getUser } from 'services/users';
import type { User, Users } from 'types';

const UserPage = ({ user }: any) => {
  const router = useRouter();
  const user_sub = useRecoilValue(userState); // RecoilのTokneを取得する
  // プロフィール画面にルーティング(もっとうまい方法がないかを検討する)
  const toProfileUpdate = () => {
    router.push(`/profile/${user_sub}/update`);
  };

  const message = router.query.message;
  console.log(user);

  return (
    <>
      {message && <Alert severity='success'>{message}</Alert>}
      {user.name}
      <br />
      {user.github_account}
      <br />
      {user.twitter_account}
      {user.sub == user_sub ? (
        <Button
          onClick={() => {
            toProfileUpdate();
          }}
        >
          編集する
        </Button>
      ) : (
        ''
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  const result: Users = await getUsers();
  if (!result) return { paths: [], fallback: false };
  const paths = result.map((user) => ({
    params: { sub: `${user.sub}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const result: User = await getUser(String(params.sub));
  return { props: { user: result } };
};

export default UserPage;
