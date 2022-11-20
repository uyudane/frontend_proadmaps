import { useRouter } from 'next/router';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { Roadmap } from 'types';

type Props = {
  roadmap: Roadmap;
};

const RoadmapTweetButton = ({ roadmap }: Props) => {
  const router = useRouter();

  return (
    <>
      <TwitterShareButton
        url={`${process.env['NEXT_PUBLIC_BASE_URL']}${router.asPath}`}
        title={`${roadmap.title} | ProadMaps`}
      >
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>
    </>
  );
};

export default RoadmapTweetButton;
