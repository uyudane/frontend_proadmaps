import { useAuth0 } from '@auth0/auth0-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Meta } from 'component/meta';

const Home: NextPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Meta pageTitle='トップ' />
      <div>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
      </div>
    </>
  );
};

export default Home;
