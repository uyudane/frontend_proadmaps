import Head from 'next/head';
import { siteMeta } from 'lib/constants';
import type { RoadmapFullData } from 'types';

const { siteTitle, siteDesc, siteUrl } = siteMeta;

type Props = {
  roadmap: RoadmapFullData;
};

const RoadmapTwitterCard = ({ roadmap }: Props) => {
  return (
    <Head>
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={`${roadmap.title} | ${siteTitle}`} />
      <meta name='twitter:description' content={siteDesc} />
      <meta name='twitter:image' content={`${siteUrl}/api/ogpImage?title=${roadmap.title}`} />
    </Head>
  );
};

export default RoadmapTwitterCard;
