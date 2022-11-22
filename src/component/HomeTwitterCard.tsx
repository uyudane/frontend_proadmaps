import Head from 'next/head';
import siteImg from '../../public/logo_unit.png';
import { siteMeta } from 'lib/constants';

const { siteTitle, siteDesc, siteUrl } = siteMeta;

const HomeTwitterCard = () => {
  // OGP画像
  const img = siteImg.src;
  const imgUrl = `${siteUrl}${img}`;
  return (
    <Head>
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={siteDesc} />
      <meta name='twitter:image' content={imgUrl} />
    </Head>
  );
};

export default HomeTwitterCard;
