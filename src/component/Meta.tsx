import Head from 'next/head';
import { useRouter } from 'next/router';
import siteImg from '../../public/logo_unit.png';
import { siteMeta } from 'lib/constants';

type Props = {
  pageTitle?: string;
  pageDesc?: string;
};

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta;

const Meta = ({ pageTitle, pageDesc }: Props) => {
  // ページタイトル
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

  // ページの説明
  const desc = pageDesc ?? siteDesc;

  // ページのURL
  const router = useRouter();
  const url = `${siteUrl}${router.asPath}`;

  // OGP画像
  const img = siteImg.src;
  const imgW = String(siteImg.width);
  const imgH = String(siteImg.height);
  const imgUrl = `${siteUrl}${img}`;

  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta name='description' content={desc} />
      <meta property='og:description' content={desc} />
      <link rel='canonical' href={url} />
      <meta property='og:url' content={url} />
      <meta property='og:site_name' content={siteTitle} />
      <meta property='og:type' content={siteType} />
      <meta property='og:locale' content={siteLocale} />
      <link rel='icon' href={siteIcon} />
      <link rel='apple-touch-icon' href={siteIcon} />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={imgW} />
      <meta property='og:image:height' content={imgH} />
      {/* <meta name='twitter:card' content='summary_large_image' /> */}
    </Head>
  );
};

export default Meta;
