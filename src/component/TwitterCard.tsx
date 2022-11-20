import Head from 'next/head';
import siteImg from '../../public/images/proad_icon.jpg';
import { siteMeta } from 'lib/constants';

const TwitterCard = () => {
  const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta;
  const img = siteImg.src;
  const imgUrl = `${siteUrl}${img}`;
  return (
    <Head>
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@uyudane' />
      <meta name='twitter:title' content='ページのタイトル' />
      <meta name='twitter:description' content='ページの説明文' />
      <meta name='twitter:image' content={imgUrl} />
    </Head>
  );
};

export default TwitterCard;
