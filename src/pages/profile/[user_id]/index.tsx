import { GetStaticPropsContext } from 'next';
import { getProfiles, getProfile } from 'services/profiles';
import type { Profile, Profiles } from 'types';

const ProfilePage = ({ profile }: any) => {
  console.log(profile);
  return (
    <>
      {profile.name}
      <br />
      {profile.github_account}
      <br />
      {profile.twitter_account}
    </>
  );
};

export const getStaticPaths = async () => {
  const result: Profiles = await getProfiles();
  if (!result) return;
  const paths = result.map((profile) => ({
    params: { user_id: `${profile.user_id}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined');
  }
  const result: Profile = await getProfile(Number(params.user_id));
  return { props: { profile: result } };
};

export default ProfilePage;
