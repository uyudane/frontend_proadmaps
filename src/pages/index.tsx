import { useAuth0 } from '@auth0/auth0-react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Meta } from 'component/meta';

const Home: NextPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Meta pageTitle='トップ' />
      <div>記事一覧/検索画面</div>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </>
  );
};

export default Home;
