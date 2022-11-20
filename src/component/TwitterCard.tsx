import Head from 'next/head';
import type { RoadmapFullData } from 'types';

type Props = {
  roadmap: RoadmapFullData;
};

const TwitterCard = ({ roadmap }: Props) => {
  return (
    <Head>
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='ProadMaps' />
      <meta
        name='twitter:description'
        content='プログラミング学習のロードマップ/学習記録 共有サイトです。'
      />
      <meta
        name='twitter:image'
        content={`${process.env['NEXT_PUBLIC_BASE_URL']}/api/ogpImage?title=${roadmap.title}`}
      />
    </Head>
  );
};

export default TwitterCard;
