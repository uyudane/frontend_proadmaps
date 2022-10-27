import { GetStaticPropsContext } from 'next';
import { getUsers, getUser } from 'services/users';
import type { User, Users } from 'types';

const UserPage = ({ user }: any) => {
  console.log(user);
  return (
    <>
      {user.name}
      <br />
      {user.github_account}
      <br />
      {user.twitter_account}
    </>
  );
};

export const getStaticPaths = async () => {
  const result: Users = await getUsers();
  if (!result) return;
  const paths = result.map((user) => ({
    params: { id: `${user.id}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const result: User = await getUser(Number(params.id));
  return { props: { user: result } };
};

export default UserPage;
