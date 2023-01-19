import Head from 'next/head';
import { useRouter } from 'next/router';
import siteImg from '../../public/logo_unit.png';
import { siteMeta } from 'lib/constants';

type Props = {
  pageTitle?: string;
  pageDesc?: string;
  roadmapTitle?: string; // ロードマップ詳細の時だけ渡ってきて、imgの作成に使用
};

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta;

const Meta = ({ pageTitle, pageDesc, roadmapTitle }: Props) => {
  // ページタイトル
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

  // ページの説明
  const desc = pageDesc ?? siteDesc;

  // ページのURL
  const router = useRouter();
  const url = `${siteUrl}${router.asPath}`;

  // OGP画像(ロードマップ詳細(roadmapTitleが渡っている時とそれ以外で書き分けている))
  const img = roadmapTitle ? '' : siteImg.src;
  const imgUrl = roadmapTitle
    ? `${siteUrl}/api/ogpImage?title=${roadmapTitle}`
    : `${siteUrl}${img}`;
  const imgW = roadmapTitle ? '1200' : String(siteImg.width);
  const imgH = roadmapTitle ? '630' : String(siteImg.height);

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
