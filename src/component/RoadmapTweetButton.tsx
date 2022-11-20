import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Roadmap } from 'types';

type Props = {
  roadmap: Roadmap;
};

const RoadmapTweetButton = ({ roadmap }: Props) => {
  const router = useRouter();

  const tweet = () => {
    router.push('https://twitter.com/share?ref_src=twsrc%5Etfw');
  };

  return (
    <>
      <a
        href='https://twitter.com/share?ref_src=twsrc%5Etfw'
        target='_blank'
        rel='noopener noreferrer'
        className='twitter-share-button'
        data-text={`ProadMaps | ${roadmap.title}`}
        data-size='large'
        data-hashtags='ProadMaps'
        data-lang='ja'
        data-show-count='false'
      ></a>
      <script async src='https://platform.twitter.com/widgets.js'></script>
    </>
  );
};

export default RoadmapTweetButton;
